import React, { Component } from 'react';

export default class NewTodoForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textInput: '',
            checkbox: false
        }
    }

    onTextInputChange = (event) => {
        this.setState({textInput: event.target.value});
    };

    onCheckboxChange = (event) => {
        this.setState({checkbox: event.target.checked});
    };
    
    submitForm = () => {
        this.setState({textInput: ''});
        this.props.onCreate(this.state.textInput, this.state.checkbox);
    };

    render() {
        return (
            <div>
                <input type="text" value={this.state.textInput} onChange={this.onTextInputChange}/>
                <input type="checkbox" checked={this.state.checkbox} onChange={this.onCheckboxChange}/>
                <button onClick={this.submitForm}>Add</button>
            </div>
        )
    }
}
