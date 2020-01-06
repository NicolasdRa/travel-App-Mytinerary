import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import cityFilterReducer from "./citiesReducer";


const rootReducer = combineReducers({
    cities: citiesReducer,
    string: cityFilterReducer
});

export default rootReducer;