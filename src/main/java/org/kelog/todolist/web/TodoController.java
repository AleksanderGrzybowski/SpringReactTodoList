package org.kelog.todolist.web;

import org.kelog.todolist.model.Todo;
import org.kelog.todolist.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.Optional;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
public class TodoController {
    
    private final String ROOT = "/todoitems";
    private TodoService service;
    
    @Autowired
    public TodoController(TodoService service) {
        this.service = service;
    }
    
    @RequestMapping(value = ROOT, method = GET)
    public Collection<Todo> list() {
        return service.findAll();
    }
    
    @RequestMapping(value = ROOT + "/{id}", method = GET)
    public ResponseEntity<Todo> list(@PathVariable int id) {
        Optional<Todo> todo = service.findById(id);
        
        if (todo.isPresent()) {
            return new ResponseEntity<>(todo.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(value = ROOT, method = RequestMethod.POST)
    public ResponseEntity<Todo> create(@RequestBody @Valid TodoItemCreateDto dto, BindingResult result) {
        if (!result.hasErrors()) {
            return new ResponseEntity<>(
                    service.create(dto.description, dto.important),
                    HttpStatus.CREATED
            );
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    @RequestMapping(value = ROOT + "/{id}", method = RequestMethod.PATCH)
    public ResponseEntity<Todo> update(@PathVariable int id, @RequestBody @Valid TodoItemUpdateDto dto,
                                       BindingResult result) {
        if (!result.hasErrors()) {
            return new ResponseEntity<>(service.update(id, dto.description, dto.important), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    @RequestMapping(value = ROOT + "/{id}", method = DELETE)
    public ResponseEntity<Todo> delete(@PathVariable int id) {
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    // handle CORS
    @RequestMapping(value = ROOT + "/**", method = RequestMethod.OPTIONS)
    public ResponseEntity handle() {
        return new ResponseEntity(HttpStatus.OK);
    }
    
    @SuppressWarnings("WeakerAccess")
    private static class TodoItemUpdateDto {
        public String description;
        
        public Boolean important;
    }
    
    private static class TodoItemCreateDto {
        @NotNull
        public String description;
        
        @NotNull
        public Boolean important;
    }
}

