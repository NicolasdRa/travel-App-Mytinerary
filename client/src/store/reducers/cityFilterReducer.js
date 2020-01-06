import {FILTER_CITIES, LOADING_ERROR } from '../actions/types';

const initialState = {
    string: ""
}

export default (state = initialState, action) => {

    switch (action.type) {

        case FILTER_CITIES:
            return {
            ...state,
            string: action.payload,
        };
        
        default: 
        return state;    
    }   
};