import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: (props) => "url(" + props.data.img + ")",
    backgroundPosition: "center",
    width: "100%",
    height: "16vh",
    backgroundSize: "cover",
    borderRadius: "5px",

    [theme.breakpoints.up("sm")]: {
      height: "15rem",
    },
    [theme.breakpoints.up("lg")]: {
      height: "30rem",
    },
  },

  textArea: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    color: "white",
    padding: "1rem 1.5rem",
  },
}));

// image header for listing tabs: cities, itineraries, activities
const ListingHeader = (props) => {
  const classes = useStyles(props);
  const { data } = props;
  const { name, title, city } = data;

  return (
    <Box sm={12} className={classes.image}>
      <Box className={classes.textArea}>
        <Typography variant='h6'>{name ? name : title}</Typography>
        <Typography variant='body2'>{title ? city.name : name}</Typography>
      </Box>
    </Box>
  );
};

export default ListingHeader;
