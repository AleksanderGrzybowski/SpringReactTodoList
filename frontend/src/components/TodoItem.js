import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const TodoItem = ({description, important, onDelete, onUpdateImportant}) => {
    const removeLinkStyle = {
        float: 'right',
        fontSize: 16,
        cursor: 'pointer'
    };

    const importantTextStyle = important ? {
        fontWeight: 'bold'
    } : {};
    
    const iconStyle = {
        marginLeft: '10px',
        fontSize: 16,
        color: important ? 'black' : 'lightgray'
    };
    
    return (
        <ListGroupItem>
            <span style={importantTextStyle}>
                {description}
            </span>
            <i
                className="fa fa-exclamation-circle"
                style={iconStyle}
                onClick={onUpdateImportant}
            />
            <span style={removeLinkStyle} onClick={onDelete}>&times;</span>
        </ListGroupItem>
    );
};

export default TodoItem;
