import React from "react";
import "typeface-roboto";
import { makeStyles } from "@material-ui/core/styles";

import ActivityCard from "../ActivityCard/ActivityCard";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  gallery: {
    position: "relative",
    display: "flex",
    flex: "0 1 auto",
    width: "auto",
    height: "auto",
    overflowX: "auto",
  },
}));

const ActivityGallery = (props) => {
  const classes = useStyles();
  const { activities, string } = props;

  if (activities.length > 0) {
    return (
      <div className={classes.gallery}>
        {activities.map((activity) => (
          <ActivityCard activity={activity} key={activity._id} />
        ))}
      </div>
    );
  } else {
    return (
      <Typography style={{ margin: "1rem 0 .5rem 1rem", textAlign: "center" }}>
        No activities found for {string}
      </Typography>
    );
  }
};

export default ActivityGallery;
