import { FILTER_CITIES, SET_LOADING, LOADING_ERROR } from './types';


// gets cities from server/DB
export const filterCities = () => {
    
    dispatch({
        type: FILTER_CITIES,
        payload: string
    });

};

// Sets Loading to true
export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};