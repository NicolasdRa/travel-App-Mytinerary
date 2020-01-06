import { FETCH_CITIES, SET_LOADING, LOADING_ERROR } from './types';

// gets cities from server/DB
export const fetchCities = () => async dispatch => {
    setLoading();
    
    try {
    const res = await fetch('http://localhost:5000/cities/all');
    const cities = await res.json();
    dispatch({
        type: FETCH_CITIES,
        payload: cities
    });
        
    } catch (error) {
        dispatch({
          type: LOADING_ERROR,
          payload: error.res.data
        });
    };
};

// Sets Loading to true
export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};



// // fetches cities from DB option 1 for this section
// export const fetchCities = () => {
//     return async (dispatch, getState) => {
//         setLoading();
//         const res = await fetch ('http://localhost:5000/cities/all');
//         const cities = await res.json();
//         dispatch({
//             type: FETCH_CITIES,
//             payload: cities
//         })
//     }
// }




//   // fetches cities from DB from the cities component *working perfectly
//   componentDidMount() {
//     axios.get('http://localhost:5000/cities/all')
//       .then(res => { 
//         this.setState({
//           cities: res.data
//         })
//       })  
//     }