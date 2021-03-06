import React, { Component } from 'react';
import { ListGroupItem, FormGroup, FormControl, Button, InputGroup } from 'react-bootstrap';

export default class NewTodoForm extends Component {
    constructor(props) {
        super(props);

        this.state = {textInput: ''};
    }

    onTextInputChange = (event) => {
        this.setState({textInput: event.target.value});
    };

    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.submitForm();
        }
    };

    isTextInputValid = () => this.state.textInput.length !== 0;

    submitForm = () => {
        if (!this.isTextInputValid()) {
            return;
        }
        this.setState({textInput: ''});
        this.props.onCreate(this.state.textInput, false);
    };

    render() {
        return (
            <ListGroupItem>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="New item..."
                            value={this.state.textInput}
                            onChange={this.onTextInputChange}
                            onKeyPress={this.onKeyPress}
                        />
                        <InputGroup.Button>
                            <Button
                                bsStyle="primary"
                                disabled={!this.isTextInputValid()}
                                onClick={this.submitForm}
                            >
                                Add
                            </Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </ListGroupItem>
        )
    }
}
