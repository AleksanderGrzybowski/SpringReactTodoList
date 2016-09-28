import axios from 'axios';

const baseUrl = 'http://localhost:8080/todoitems';

const requestStart = () => ({type: 'REQUEST_START'});
const requestFinish = () => ({type: 'REQUEST_FINISH'});
const serverError = () => ({type: 'SERVER_ERROR'});

export const loadTodos = () => (dispatch, getState) => {
    if (getState().ui.requestInProgress) return;
    dispatch(requestStart());

    axios.get(baseUrl)
        .then(
            (response) => {
                dispatch(requestFinish());
                dispatch({type: 'LOAD_TODOS', todos: response.data});
            },
            () => dispatch(serverError())
        );
};

export const createTodo = (description, important) => (dispatch, getState) => {
    if (getState().ui.requestInProgress) return;
    dispatch(requestStart());

    axios.post(baseUrl, {
        description: description, important: important
    })
        .then(() => {
                dispatch(requestFinish());
                dispatch(loadTodos());
            },
            () => dispatch(serverError())
        );
};

export const updateTodoImportant = (id, important) => (dispatch, getState) => {
    if (getState().ui.requestInProgress) return;
    dispatch(requestStart());

    axios.patch(`${baseUrl}/${id}`, {
        important: important
    })
        .then(() => {
                dispatch(requestFinish());
                dispatch(loadTodos());
            },
            () => dispatch(serverError())
        );
};

export const deleteTodo = (id) => (dispatch, getState) => {
    if (getState().ui.requestInProgress) return;
    dispatch(requestStart());
    
    axios.delete(`${baseUrl}/${id}`)
        .then(() => {
                dispatch(requestFinish());
                dispatch(loadTodos());
            },
            () => dispatch(serverError())
        );
};
