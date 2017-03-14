package todolist.service;

import org.junit.Before;
import org.junit.Test;
import todolist.dao.TodoRepository;
import todolist.model.Todo;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@SuppressWarnings("unchecked")
public class TodoServiceTest {
    
    TodoService service;
    TodoRepository repository;
    
    Todo sampleTodo;
    
    @Before
    public void setup() {
        repository = mock(TodoRepository.class);
        service = new TodoService(repository);
        sampleTodo = new Todo("description", true);
    }
    
    @Test
    public void should_list_all_todos() {
        when(repository.findAll()).thenReturn(Collections.singletonList(sampleTodo));
        
        Collection<Todo> result = service.findAll();
        
        assertThat(result).hasSize(1);
        assertThat(result).contains(sampleTodo);
        verify(repository, atLeastOnce()).findAll();
    }
    
    @Test
    public void should_list_todo_by_existing_id() {
        sampleTodo.setId(10);
        when(repository.findById(10)).thenReturn(Optional.of(sampleTodo));
        
        Optional<Todo> result = service.findById(10);
        
        assertThat(result).isEqualTo(Optional.of(sampleTodo));
        verify(repository, atLeastOnce()).findById(10);
    }
    
    @Test
    public void should_create_new_todo() {
        service.create("description", true);
        
        verify(repository, times(1)).save(new Todo("description", true));
    }
    
    @Test
    public void should_delete_existing_todo() {
        when(repository.findById(10)).thenReturn(Optional.of(sampleTodo));
        
        service.delete(10);
        
        verify(repository, times(1)).delete(sampleTodo);
    }
    
    @Test(expected = TodoNotFoundException.class)
    public void should_throw_if_trying_to_delete_nonexistent_todo() {
        when(repository.findById(10)).thenThrow(TodoNotFoundException.class);
        
        service.delete(10);
    }
    
    @Test(expected = TodoNotFoundException.class)
    public void should_throw_if_trying_to_update_nonexistent_todo() {
        when(repository.findById(10)).thenThrow(TodoNotFoundException.class);
        
        service.update(10, "description", true);
    }
    
    @Test
    public void should_update_todo() {
        when(repository.findById(10)).thenReturn(Optional.of(sampleTodo));
        
        service.update(10, "new description", false);
        
        verify(repository, atLeastOnce()).save(sampleTodo);
    }
    
    @Test
    public void should_update_only_importance_if_new_description_is_not_given() {
        when(repository.findById(10)).thenReturn(Optional.of(sampleTodo));
        
        service.update(10, null, false);
        
        verify(repository, atLeastOnce()).save(new Todo("description", false));
    }
    
}