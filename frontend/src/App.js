import React, { Component } from 'react';

class NewTodoForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            textInput: 'elo',
            checkbox: false
        }
    }

    onTextInputChange = (event) => {
        this.setState({textInput: event.target.value});
    };
    
    onCheckboxChange = (event) => {
        this.setState({checkbox: event.target.checked});
    };

    render() {
        const onCreate = this.props.onCreate.bind(this, this.state.textInput, this.state.checkbox);
        return (
            <div>
                <input type="text" value={this.state.textInput} onChange={this.onTextInputChange}/>
                <input type="checkbox" checked={this.state.checkbox} onChange={this.onCheckboxChange}/>
                <button onClick={onCreate}>Click</button>
            </div>
        )
    }

}

const TodoItem = ({description, important, onDelete}) => {
    const className = important ? 'todo-important' : '';
    
    return (
        <div className={className}>
            {description} {important}
            <span className="remove-todo" onClick={onDelete}>Remove</span>
        </div>
    )
};

export default class App extends Component {
    render() {
        const items = this.props.todos.map( item => 
            <TodoItem
                description={item.description}
                important={item.important}
                onDelete={this.props.onDelete.bind(this, item.id)}
                key={item.id}
            />
        );
        
        return (
            <div>
                {items}
                <NewTodoForm
                    onCreate={this.props.onCreate}
                />
            </div>
        );
    }
}
