import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import ActivityCardSmall from "./ActivityCardSmall";

const useStyles = makeStyles(() => ({
  activity_gallery: {
    position: "relative",
    display: "flex",
    flex: "0 1 auto",
    width: "auto",
    overflowX: "auto",
  },
}));

const ActivityGallerySmall = (props) => {
  const { activities } = props;
  // const { activities } = itinerary
  const classes = useStyles();

  return (
    <Box className={classes.activity_gallery}>
      {activities.map((activity) => (
        <ActivityCardSmall activity={activity} key={activity._id} />
      ))}
    </Box>
  );
};

export default ActivityGallerySmall;
