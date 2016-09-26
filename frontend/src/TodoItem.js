import React from 'react';

const TodoItem = ({description, important, onDelete}) => (
    <div className={important ? 'todo-important' : ''}>
        <span>{description}</span>
        <span className="remove-todo" onClick={onDelete}>&times;</span>
    </div>
);

export default TodoItem;
