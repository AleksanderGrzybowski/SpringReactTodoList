import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const removeLinkStyle = {
    float: 'right',
    fontSize: 16,
    cursor: 'pointer'
};

const importantStyle = {
    fontWeight: 'bold'
};

const TodoItem = ({description, important, onDelete}) => (
    <ListGroupItem>
        <span style={important ? importantStyle : {}}>{description}</span>
        <span style={removeLinkStyle} onClick={onDelete}>&times;</span>
    </ListGroupItem>
);

export default TodoItem;
