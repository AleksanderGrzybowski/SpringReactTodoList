import React, { Component } from 'react';
import TodoItem from './TodoItem';
import NewTodoForm from './NewTodoForm';
import { Grid, Row, Col, ListGroup} from 'react-bootstrap';
import ErrorPage from './ErrorPage';

export default class App extends Component {
    render() {
        if (this.props.ui.serverError) {
            return <ErrorPage/>
        }

        const items = this.props.todos.map(item =>
            <TodoItem
                description={item.description}
                important={item.important}
                onDelete={this.props.onDelete.bind(this, item.id)}
                onUpdateImportant={this.props.onUpdateImportant.bind(this, item.id, !item.important)}
                key={item.id}
            />
        );

        const spinnerStyle = {
            float: 'right',
            position: 'absolute',
            right: '20px'
        };
        const spinner = this.props.ui.requestInProgress ? (
            <i className="fa fa-spin fa-spinner" style={spinnerStyle}></i>
        ) : null;

        const todosCount = this.props.todos.length;

        return (
            <Grid>
                <Row>
                    <Col md={6} sm={12} mdOffset={3}>
                        <h1 className="text-center">
                            Todo list ({todosCount}) {spinner}
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} sm={12} mdOffset={3}>
                        <ListGroup>
                            {items}
                            <NewTodoForm onCreate={this.props.onCreate}/>
                        </ListGroup>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
