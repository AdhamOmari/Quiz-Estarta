export const SaveData = (questionData) => ({

    type: 'SAVE_DATA',
    payload: questionData
});

export const ClearData = () => ({
    type: 'CLEAR_DATA'
});