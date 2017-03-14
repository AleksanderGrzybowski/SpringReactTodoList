package org.kelog.todolist.web;

import org.junit.Before;
import org.junit.Test;
import org.kelog.todolist.model.Todo;
import org.kelog.todolist.service.TodoNotFoundException;
import org.kelog.todolist.service.TodoService;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

public class TodoControllerTest {
    
    private MockMvc mockMvc;
    private TodoService service;
    
    @Before
    public void setup() {
        service = mock(TodoService.class);
        this.mockMvc = standaloneSetup(new TodoController(service)).build();
    }
    
    @Test
    public void should_list_all_todos() throws Exception {
        when(service.findAll()).thenReturn(Arrays.asList(
                new Todo("todo1", true),
                new Todo("todo2", false)
        ));
        
        mockMvc.perform(get("/todoitems"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].description", is("todo1")))
                .andExpect(jsonPath("$[0].important", is(true)))
                .andExpect(jsonPath("$[1].description", is("todo2")))
                .andExpect(jsonPath("$[1].important", is(false)));
        
        verify(service, atLeastOnce()).findAll();
    }
    
    @Test
    public void should_list_existing_todo_by_id() throws Exception {
        when(service.findById(10)).thenReturn(Optional.of(new Todo("todo1", true)));
        
        mockMvc.perform(get("/todoitems/10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.description", is("todo1")))
                .andExpect(jsonPath("$.important", is(true)));
        
        verify(service, atLeastOnce()).findById(10);
    }
    
    @Test
    public void should_404_if_listed_todo_item_doesnt_exist() throws Exception {
        when(service.findById(10)).thenReturn(Optional.empty());
        
        mockMvc.perform(get("/todoitems/10"))
                .andExpect(status().isNotFound());
        
        verify(service, atLeastOnce()).findById(10);
    }
    
    @Test
    public void should_create_todo_if_valid() throws Exception {
        Todo created = new Todo("todo1", true);
        created.setId(10);
        when(service.create("todo1", true)).thenReturn(created);
        
        mockMvc.perform(
                post("/todoitems")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"description\": \"todo1\", \"important\": true}")
        )
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(10)))
                .andExpect(jsonPath("$.description", is("todo1")))
                .andExpect(jsonPath("$.important", is(true)));
        
        verify(service, times(1)).create("todo1", true);
    }
    
    @Test
    public void should_not_create_todo_if_given_invalid_body() throws Exception {
        mockMvc.perform(
                post("/todoitems")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"important\": 123}")
        )
                .andExpect(status().isBadRequest());
    }
    
    @Test
    public void should_update_todo_if_valid() throws Exception {
        Todo before = new Todo("todo1", true);
        Todo after = new Todo("todo1_changed", false);
        before.setId(10);
        after.setId(10);
        when(service.update(10, "todo1_changed", false)).thenReturn(after);
        
        mockMvc.perform(
                patch("/todoitems/10")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"description\": \"todo1_changed\", \"important\": false}")
        )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(10)))
                .andExpect(jsonPath("$.description", is("todo1_changed")))
                .andExpect(jsonPath("$.important", is(false)));
        
        verify(service, times(1)).update(10, "todo1_changed", false);
    }
    
    @Test
    public void should_delete_todo_if_exists() throws Exception {
        mockMvc.perform(delete("/todoitems/10"))
                .andExpect(status().isOk());
        
        verify(service, times(1)).delete(10);
    }
    
    @Test
    public void should_not_delete_nonexistent_todo() throws Exception {
        doThrow(new TodoNotFoundException()).when(service).delete(10);
        
        mockMvc.perform(delete("/todoitems/10"))
                .andExpect(status().isNotFound());
        
        verify(service, times(1)).delete(10);
    }
}