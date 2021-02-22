import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import PuffLoader from "react-spinners/PuffLoader";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import TopNav from "../Components/ui/TopNav/TopNav";
import BottomNav from "../Components/ui/BottomNav/BottomNav";
import Footer from "../Components/ui/footer/Footer";
import LandingPage from "../Components/pages/LandingPage/LandingPage";
import ProfilePage from "../Components/pages/ProfilePage/ProfilePage";
import ListingPage from "../Components/pages/ListingPage/ListingPage";
import CityPage from "../Components/pages/CityPage/CityPage";
import ItineraryPage from "../Components/pages/ItineraryPage/ItineraryPage";
import ActivityPage from "../Components/pages/ActivityPage/ActivityPage";
import { PasswordResetForm } from "../Components/ui/PasswordResetForm/PasswordResetForm";

import { Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../Components/theme/Theme";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { fetchCities } from "../Components/Redux/citiesSlice";
import { fetchItineraries } from "../Components/Redux/itinerariesSlice";
import { fetchActivities } from "../Components/Redux/activitiesSlice";
import { loadCurrentUser } from "../Components/Redux/usersSlice";
import { isLoggedIn } from "../Components/Redux/authSlice";

const useStyles = makeStyles((theme) => ({
  topNav: {
    position: "fixed",
    bottom: 0,
  },

  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  loader: {
    display: "flex",
    margin: "35vh auto",
  },

  bottomNav: {
    position: "fixed",
    top: 0,
  },
}));

export const AppRouter = () => {
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    dispatch(loadCurrentUser());
  }, [isAuthenticated, dispatch]);

  //logs in user if GoogleAuth
  const user = useSelector((state) => state.users.currentUser);
  useEffect(() => {
    if (user) dispatch(isLoggedIn(user));
  }, [user, dispatch]);

  // fetches data from DB
  useEffect(() => {
    dispatch(fetchCities());
    dispatch(fetchItineraries());
    dispatch(fetchActivities());
  }, [dispatch]);

  // TODO add general loader
  // TODO redirect when itinerary name is not found in route

  // if (isLoading) {
  //   return (
  //     <div className={classes.loader}>
  //       <PuffLoader color="red" loading={true} size={80} />
  //     </div>
  //   );
  // }

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <TopNav className={classes.topNav} />
        <Grid className={classes.main}>
          <Switch>
            <PublicRoute
              exact
              path="/"
              isAuthenticated={true}
              component={LandingPage}
            />
            <PublicRoute
              exact
              path="/listing"
              isAuthenticated={true}
              component={ListingPage}
            />
            <PublicRoute
              exact
              path="/citypage/:city_name"
              isAuthenticated={true}
              component={CityPage}
            />
            <PublicRoute
              exact
              path="/itinerarypage/:title"
              isAuthenticated={true}
              component={ItineraryPage}
            />
            <PublicRoute
              exact
              path="/activitypage/:title"
              isAuthenticated={true}
              component={ActivityPage}
            />
            <PrivateRoute
              exact
              path="/user/:userName"
              isAuthenticated={true}
              component={ProfilePage}
            />
            <PublicRoute
              exact
              path="/resetPassword/:resetToken"
              isAuthenticated={false}
              component={PasswordResetForm}
            />
            <Redirect to="/" />
          </Switch>
        </Grid>
        {matches ? <BottomNav className={classes.bottomNav} /> : <Footer />}
      </ThemeProvider>
    </Router>
  );
};
