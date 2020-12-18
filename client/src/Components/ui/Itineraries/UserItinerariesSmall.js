import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "typeface-roboto";
import { Box, Typography } from "@material-ui/core";
import ItineraryCardSmall from "../Itineraries/ItineraryCardSmall";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  text: {
    margin: ".5rem",
    textAlign: "left",
  },

  gallery: {
    position: "relative",
    display: "flex",
    flex: "0 1 auto",
    flexDirection: "row",
    width: "auto",
    /* height: fit-content; */
    /* z-index: 5; */
    overflowX: "auto",
  },
}));

const UserItinerariesSmall = () => {
  const classes = useStyles();
  const itineraries = useSelector(
    (state) => state.itineraries.itineraries.data,
  );

  // const { _id } = user
  // const filteredItineraries = itineraries.filter(
  //   itineraries => itineraries.user._id === user._id
  // )

  if (itineraries != null) {
    return (
      <Box>
        <Typography variant='body2' className={classes.text}>
          My contributions
        </Typography>
        <Box className={classes.gallery}>
          {/* {filteredItineraries.map(itinerary => ( */}
          {itineraries.map((itinerary) => (
            <ItineraryCardSmall itinerary={itinerary} key={itinerary._id} />
          ))}
        </Box>
      </Box>
    );
  } else {
    return (
      <Typography variant='body1' className={classes.text}>
        No contributions found. Create your itineraries and help the community
        grow.
      </Typography>
    );
  }
};

export default UserItinerariesSmall;
