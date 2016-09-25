import axios from 'axios';

const baseUrl = 'http://localhost:8080/todoitems';

export const loadTodos = () => (dispatch) => {
    axios.get(baseUrl)
        .then(
            (response) => dispatch({type: 'LOAD_TODOS', todos: response.data}),
            () => dispatch({type: 'SERVER_ERROR'})
        );
};

export const createTodo = (description, important) => (dispatch) => {
    axios.post(baseUrl, {
        description: description, important: important
    })
        .then(() => dispatch(loadTodos()), () => dispatch({type: 'SERVER_ERROR'}));
};

export const deleteTodo = (id) => dispatch => {
    axios.delete(`${baseUrl}/${id}`)
        .then(() => dispatch(loadTodos()), () => dispatch({type: 'SERVER_ERROR'}));
};
