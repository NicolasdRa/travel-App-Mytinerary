import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { selectAllItineraries } from "../../Redux/itinerariesSlice";

import {
  Grid,
  CircularProgress,
  TextField,
  Typography,
  Paper,
} from "@material-ui/core";

import ItineraryGallery from "../ItineraryGallery/ItineraryGallery";
import ListingHeader from "../Headers/ListingHeader";

import { randomNumberGenerator } from "../../utils/utils";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: "3rem",
  },

  searchbarContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: theme.palette.common.beigeLight,
    padding: "1rem 1rem",
    margin: "-.5rem 0 0 0",
  },

  searchBarTitle: {
    color: theme.palette.primary.main,
    fontSize: ".9rem",
    fontWeight: "500",
    textAlign: "left",
    margin: "0 0 .5rem .5rem",
  },

  searchBar: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: "5px",
  },

  subtitle: {
    margin: "2rem auto .5rem 1.5rem",
    textAlign: "start",
  },

  loader: {
    display: "flex",
    flexDirection: "column",
    margin: "5rem 5rem",
  },
}));

const Itineraries = () => {
  const classes = useStyles();

  const itineraries = useSelector(selectAllItineraries);

  const [string, setString] = useState("");
  const [headerItinerary, setHeaderItinerary] = useState(null);
  const [filteredItineraries, setFilteredItineraries] = useState(null);

  useEffect(() => {
    // random cover image
    const randomNumber = randomNumberGenerator(0, itineraries.length - 1);

    filteredItineraries === null
      ? setHeaderItinerary(itineraries[randomNumber])
      : setHeaderItinerary(filteredItineraries[0]);
  }, [itineraries, filteredItineraries]);

  useEffect(() => {
    // itinerary filter
    if (string !== "") {
      const filtered = itineraries.filter((itinerary) =>
        itinerary.city.toLowerCase().startsWith(string),
      );
      setFilteredItineraries(filtered);
    }
    // clean up: when string is empty
    return () => {
      setFilteredItineraries(null);
    };
  }, [itineraries, string]);

  const handleChange = (e) => {
    // updates string in state
    setString(e.target.value.toLowerCase());
  };

  if (!itineraries) {
    return (
      <Grid
        container
        className={classes.loader}
        direction="column"
        justify="center"
        alignjustify="center">
        <Typography>Loading itineraries...</Typography>
        <CircularProgress color="secondary" />
      </Grid>
    );
  }

  return (
    <Grid
      container
      direction="column"
      // justify='center'
      alignItems="center"
      className={classes.container}>
      <Grid item xs={12} container direction="column" justify="center">
        {headerItinerary ? (
          <ListingHeader data={headerItinerary} className={classes.header} />
        ) : null}
        <Paper
          elevation={2}
          variant="outlined"
          className={classes.searchbarContainer}>
          <Typography className={classes.searchBarTitle}>
            Choose your route
          </Typography>
          <TextField
            id="outlined-helperText"
            label="Search Itineraries for City.."
            defaultValue=""
            variant="outlined"
            onChange={handleChange}
            color="primary"
            className={classes.searchBar}
          />
        </Paper>
      </Grid>
      <Grid container item xs={12}>
        <Typography variant="subtitle2" className={classes.subtitle}>
          {string === "" ? "Most popular Itineraries" : "Search results"}
        </Typography>
        <ItineraryGallery
          string={string}
          itineraries={filteredItineraries ? filteredItineraries : itineraries}
        />
      </Grid>
    </Grid>
  );
};

export default Itineraries;
