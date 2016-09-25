import request from 'request';

export const loadTodos = () => dispatch => {
    request({
        url: 'http://localhost:8080/todoitems',
        method: 'GET',
        json: true
    }, (err, response, body) => {
        if (!err) {
            dispatch({type: 'LOAD_TODOS', todos: body})
        } else {
            dispatch({type: 'SERVER_ERROR'});
        }
    })
};

export const createTodo = (description, important) => dispatch => {
    request({
            url: 'http://localhost:8080/todoitems',
            method: 'POST',
            json: true,
            body: {description: description, important: important}
        },
        (err) => {
            if (!err) {
                dispatch(loadTodos())
            } else {
                dispatch({type: 'SERVER_ERROR'});
            }
        }
    )
};

export const deleteTodo = (id) => dispatch => {
    request({
            url: `http://localhost:8080/todoitems/${id}`,
            method: 'DELETE',
            json: true
        },
        (err) => {
            if (!err) {
                dispatch(loadTodos())
            } else {
                dispatch({type: 'SERVER_ERROR'});
            }
        }
    )
};
