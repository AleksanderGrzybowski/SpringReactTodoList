import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { todos, ui } from './logic/reducers';
import { loadTodos, createTodo, updateTodoImportant, deleteTodo } from './logic/actions';
import App from './components/App';
import createLogger from 'redux-logger';
import './css/bootswatch-united.css';
import 'font-awesome-webpack';

const logger = createLogger();
const store = createStore(combineReducers({todos, ui}), applyMiddleware(thunk, logger));
const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
    onCreate: (description, important) => dispatch(createTodo(description, important)),
    onDelete: (id) => dispatch(deleteTodo(id)),
    onUpdateImportant: (id, important) => dispatch(updateTodoImportant(id, important))

});


const LiveApp = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
    <Provider store={store}>
        <LiveApp/>
    </Provider>,
    document.getElementById('root')
);

const loadingSpinner = document.getElementsByClassName('loading')[0];
loadingSpinner.remove();

setTimeout(() => store.dispatch(loadTodos()), 100);
