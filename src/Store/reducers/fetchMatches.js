import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    result: {},
    error: false
};

const fetchMatches = (state, action) => {
    return updateObject(state, {
        result: action.data,
        error: false
    });
};

const fetchMatchesFailed = (state, action) => {
    return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
    if (actionTypes.FETCH_MATCHES) {
         return fetchMatches(state, action);
    }
    if (actionTypes.FETCH_MATCHES_FAILED) {
        return fetchMatchesFailed(state, action);
    }
    return state;
}

export default reducer;