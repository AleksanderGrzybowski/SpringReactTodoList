package todolist.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Objects;

@Entity
@SuppressWarnings("unused")
public class Todo {
    
    private String description;
    private Boolean important;
    
    @Id
    @GeneratedValue
    private int id;
    
    public Todo() { // JPA
    }
    
    public Todo(String description, Boolean important) {
        this.description = Objects.requireNonNull(description);
        this.important = Objects.requireNonNull(important);
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public Boolean getImportant() {
        return important;
    }
    
    public void setImportant(Boolean important) {
        this.important = important;
    }
    
    public int getId() {
        return id;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        Todo todo = (Todo) o;
        
        return id == todo.id && (description != null ? description.equals(todo.description) : todo.description == null && important == todo.important);
    }
    
    @Override
    public int hashCode() {
        int result = description != null ? description.hashCode() : 0;
        result = 31 * result + (important != null ? important.hashCode() : 0);
        result = 31 * result + id;
        return result;
    }
}
