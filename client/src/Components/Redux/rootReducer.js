import { combineReducers } from "redux";
import citiesReducer from "./cities/citiesReducer";
import itinerariesReducer from "./itineraries/itinerariesReducer";
import activityReducer from "./activities/activityReducer";
import authReducer from "./auth/authReducer";
import errorReducer from "./error/errorReducer";
import loginFormReducer from "./loginForm/loginFormReducer";
import signupFormReducer from "./signupForm/signupFormReducer";
import userReducer from "./users/userReducer";
import favouriteReducer from "./favourites/favouriteReducer";

const rootReducer = combineReducers({
  cities: citiesReducer,
  itineraries: itinerariesReducer,
  activities: activityReducer,
  favourites: favouriteReducer,
  auth: authReducer,
  errors: errorReducer,
  loginForm: loginFormReducer,
  signupForm: signupFormReducer,
  users: userReducer,
});

export default rootReducer;
