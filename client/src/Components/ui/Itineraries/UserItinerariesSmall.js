import React from "react";
import PropTypes from "prop-types";

import ItineraryCardSmall from "../Itineraries/ItineraryCardSmall";

import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "typeface-roboto";

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
    overflowX: "auto",
  },
}));

const UserItinerariesSmall = ({ itineraries }) => {
  const classes = useStyles();

  if (itineraries.length > 0) {
    return (
      <Box>
        <Typography variant="body2" className={classes.text}>
          My itineraries
        </Typography>
        <Box className={classes.gallery}>
          {itineraries.map((itinerary) => (
            <ItineraryCardSmall itinerary={itinerary} key={itinerary._id} />
          ))}
        </Box>
      </Box>
    );
  } else {
    return (
      <Typography variant="body1" className={classes.text}>
        No contributions found. Create your itineraries and help the community
        grow.
      </Typography>
    );
  }
};

UserItinerariesSmall.propTypes = {
  itineraries: PropTypes.array.isRequired,
};

export default UserItinerariesSmall;
