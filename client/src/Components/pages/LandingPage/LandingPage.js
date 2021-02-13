import React from "react";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import Header from "../../ui/Headers/Header";
import { Button, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { openLogInForm, openSignUpForm } from "../../Redux/formsSlice";

import Grid from "@material-ui/core/Grid";
import Image from "../../ui/Images/Shanghai.png";

import { useStyles } from "./styles";

const LandingPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // console.log('Landing Page rendered')

  return (
    <Grid
      container
      item
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.container}>
      <Grid item className={classes.header}>
        <Header />
      </Grid>
      <Grid item>
        <Typography variant="subtitle1" className={classes.question}>
          Want to build your own MYtinerary?
        </Typography>
        {!isAuthenticated ? (
          <Box className={classes.btnsContainer}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => dispatch(openLogInForm())}
              className={classes.modal_btn}>
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => dispatch(openSignUpForm())}
              className={classes.modal_btn}>
              Signup
            </Button>
          </Box>
        ) : null}
      </Grid>
      <Grid
        item
        container
        direction="column"
        justify="center"
        alignItems="center">
        {!isAuthenticated ? (
          <Typography variant="subtitle1" className={classes.textGuest}>
            View itineraries as a guest
          </Typography>
        ) : null}
        <Button
          className={classes.startBtn}
          variant={!isAuthenticated ? "outlined" : "contained"}
          color="secondary"
          component={Link}
          to="/listing">
          {!isAuthenticated ? "Start as guest" : "Start"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
