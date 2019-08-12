import * as actionTypes from './actionTypes';
import axios from '../../axios-matches';


export const fetchMatches = ( response ) => {
    return {
        type: actionTypes.FETCH_MATCHES,
        data: response
    };
};

export const fetchMatchesFailed = () => {
    return {
        type: actionTypes.FETCH_MATCHES_FAILED
    };
};

export const initMatches = () => {
    let obj = {
        "apikey": "tTzabHsmnIPgA6CNdPwKGRCpduW2"
    }
    return dispatch => {
        axios.post( 'matchCalendar/' , obj )
            .then( response => {
               dispatch(fetchMatches(response));
            } )
            .catch( error => {
                dispatch(fetchMatchesFailed());
            } );
    };
};