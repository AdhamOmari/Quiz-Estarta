// initial state
const initialState = {
    score: 0
};

const scoreReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT_SCORE':
            return {
                ...state,
                score: state.score + 1
            };
        case 'REMOVE_DATA':
            return {
                ...state,
                score: 0
            };
        default:
            return state;
    }
};

export default scoreReducer;