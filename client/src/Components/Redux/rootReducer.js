import { combineReducers } from "redux";

import citiesSlice from "./citiesSlice";
import itinerariesSlice from "./itinerariesSlice";
import activitiesSlice from "./activitiesSlice";
import favouritesSlice from "./favouritesSlice";
import commentsSlice from "./commentsSlice";
import authSlice from "./authSlice";
import usersSlice from "./usersSlice";
import errorsSlice from "./errorsSlice";
import formsSlice from "./formsSlice";

const rootReducer = combineReducers({
  cities: citiesSlice,
  itineraries: itinerariesSlice,
  activities: activitiesSlice,
  favourites: favouritesSlice,
  comments: commentsSlice,
  auth: authSlice,
  users: usersSlice,
  errors: errorsSlice,
  forms: formsSlice,
});

export default rootReducer;
