package todolist.service;

import todolist.dao.TodoRepository;
import todolist.model.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

@Component
public class TodoService {
    
    private TodoRepository repository;
    
    @Autowired
    public TodoService(TodoRepository repository) {
        this.repository = repository;
    }
    
    public Collection<Todo> findAll() {
        return repository.findAll();
    }
    
    public Optional<Todo> findById(int id) {
        return repository.findById(id);
    }
    
    public Todo create(String description, Boolean important) {
        return repository.save(new Todo(description, important));
    }
    
    public Todo update(int id, String description, Boolean importance) {
        Todo item = findOrThrow(id);
        
        if (description != null) {
            item.setDescription(description);
        }
        
        if (importance != null) {
            item.setImportant(importance);
        }
        
        return repository.save(item);
    }
    
    public void delete(int id) {
        repository.delete(findOrThrow(id));
    }
    
    private Todo findOrThrow(int id) {
        return repository.findById(id).orElseThrow(TodoNotFoundException::new);
    }
}
