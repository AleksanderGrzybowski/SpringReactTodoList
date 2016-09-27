import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { todos, ui } from './logic/reducers';
import { loadTodos, createTodo, deleteTodo } from './logic/actions';
import App from './components/App';
import createLogger from 'redux-logger';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
//noinspection ES6UnusedImports
import * as _ from 'font-awesome-webpack';

const logger = createLogger();
const store = createStore(combineReducers({todos, ui}), applyMiddleware(thunk, logger));
const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
    return {
        onCreate: (description, important) => dispatch(createTodo(description, important)),
        onDelete: (id) => dispatch(deleteTodo(id))
    }
};


const LiveApp = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
    <Provider store={store}>
        <LiveApp/>
    </Provider>,
    document.getElementById('root')
);

setTimeout(() => store.dispatch(loadTodos()), 100);
