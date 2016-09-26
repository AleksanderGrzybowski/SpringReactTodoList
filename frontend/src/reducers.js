export const todos = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_TODOS':
            return action.todos;
        default:
            return state;
    }
};

const initialUiState = {
    serverError: false,
    requestInProgress: false
};

export const ui = (state = initialUiState, action) => {
    switch (action.type) {
        case 'REQUEST_START':
            return Object.assign({}, state, {
                requestInProgress: true
            });
        case 'REQUEST_FINISH':
            return Object.assign({}, state, {
                requestInProgress: false
            });
        case 'SERVER_ERROR':
            return Object.assign({}, state, {
                serverError: true
            });
        default:
            return state;
    }
};
