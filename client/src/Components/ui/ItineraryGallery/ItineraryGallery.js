import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import ItineraryCard from "../ItineraryCard/ItineraryCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  gallery: {
    postion: "relative",
    display: "flex",
    flex: "0 1 auto",
    flexDirection: "row",
    width: "auto",
    overflowX: "auto",
  },
}));

const ItineraryGallery = ({ itineraries, string }) => {
  const classes = useStyles();

  if (itineraries.length > 0) {
    return (
      <div className={classes.gallery}>
        {itineraries.map((itinerary) => (
          <ItineraryCard {...itinerary} key={itinerary._id} />
        ))}
      </div>
    );
  } else {
    return (
      <Typography style={{ margin: "1rem 0 .5rem 1rem", textAlign: "center" }}>
        No itineraries found for {string}
      </Typography>
    );
  }
};

ItineraryGallery.propTypes = {
  itineraries: PropTypes.array.isRequired,
  string: PropTypes.string,
};

export default ItineraryGallery;
