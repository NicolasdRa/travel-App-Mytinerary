import {FETCH_CITIES, SET_LOADING, LOADING_ERROR} from '../actions/types';

const initialState = {
    cities: null,
    current: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {

    switch (action.type) {

        case FETCH_CITIES:
            // console.log("fetched cities")
            return {
            ...state,
            cities: action.payload,
            loading: false
        };

        case SET_LOADING:
            return {
            ...state,
            loading: true
        };
        
        case LOADING_ERROR:
            console.log(action.payload)
            return {
            ...state,
            error: action.payload
        };

        default: 
        return state;    
    }   
};