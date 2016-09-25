import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { todos, ui } from './reducers';
import { loadTodos, createTodo } from './actions';
import App from './App';


const store = createStore(combineReducers({todos, ui}), applyMiddleware(thunk));
const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
    return {
        onCreate: () => dispatch(createTodo('testdesc', true))
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
