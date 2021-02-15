import React from "react";
import PropTypes from "prop-types";

import Avatar from "@material-ui/core/Avatar";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(0.4),
      backgroundColor: "orangered",
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const AvatarPicture = ({ user }) => {
  const classes = useStyles();

  const { userName, img } = user;

  let initials;
  userName ? (initials = userName.charAt(0).toUpperCase()) : (initials = "U");

  return (
    <div className={classes.root}>
      <Avatar src={img} className={classes.small} alt={userName}>
        {initials}
      </Avatar>
    </div>
  );
};

AvatarPicture.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AvatarPicture;
