const initialState = {
    questionData: []
};

const SubjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_DATA':
            return {
                ...state,
                questionData: [...state.questionData, action.payload]
            };
        case 'CLEAR_DATA':
            return initialState;
        default:
            return state;
    }
};

export default SubjectReducer;