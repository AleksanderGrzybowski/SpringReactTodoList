import React, { Component } from 'react';
import TodoItem from './TodoItem';
import NewTodoForm from './NewTodoForm';

export default class App extends Component {
    render() {
        if (this.props.ui.serverError) {
            return (
                <p className="error">
                    Server error occured, please refresh the page.
                </p>
            )
        }
        
        const items = this.props.todos.map(item =>
            <TodoItem
                description={item.description}
                important={item.important}
                onDelete={this.props.onDelete.bind(this, item.id)}
                key={item.id}
            />
        );

        const requestInProgressClass = (this.props.ui.requestInProgress ? 'in-progress' : '');

        return (
            <div className={requestInProgressClass}>
                {items}
                <NewTodoForm onCreate={this.props.onCreate}/>
            </div>
        );
    }
}
