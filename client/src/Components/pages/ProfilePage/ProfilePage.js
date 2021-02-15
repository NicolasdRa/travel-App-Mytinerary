import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Avatar, Box, Divider, Typography } from "@material-ui/core";

import CreateItineraryForm from "../../ui/CreateItineraryForm/CreateItineraryForm";
import ImageHeader from "../../ui/Headers/ImageHeader";
import UserItinerariesSmall from "../../ui/Itineraries/UserItinerariesSmall";
import UpdateProfileForm from "../../ui/UpdateProfileForm/UpdateProfileForm";
import Favourite from "../../ui/Favourite/Favourite";

import { useStyles } from "./styles";
import { selectItinerariesByUser } from "../../Redux/itinerariesSlice";

const Profile = ({ match }) => {
  const classes = useStyles();

  const user = useSelector((state) => state.users.currentUser);
  const { userName, firstName, lastName, details, img, coverImg } = user;

  const userItineraries = useSelector((state) =>
    selectItinerariesByUser(state, user._id),
  );

  const [data, setData] = useState(null);

  useEffect(() => {
    setData(userItineraries);
  }, [userItineraries]);

  return (
    <Box className={classes.container}>
      <ImageHeader img={coverImg} className={classes.header} />
      <Box className={classes.content}>
        <Avatar
          alt={firstName + "" + lastName}
          src={img}
          className={classes.userImg}
        />
        <Box className={classes.info}>
          <Box className={classes.edit_btn}>
            <UpdateProfileForm />
          </Box>
          <Box className={classes.likes}>
            <Favourite data={23} />
          </Box>
        </Box>
        <Box className={classes.user_info}>
          <Typography variant="h5" className={classes.user_fullName}>
            {firstName} {lastName}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.userName}>
            {userName}
          </Typography>
        </Box>
        <Box className={classes.gallery}>
          <Typography variant="body2" className={classes.text}>
            {details}
          </Typography>
          <Divider className={classes.divider} />
          <UserItinerariesSmall itineraries={data} />
          <Divider className={classes.divider} />
        </Box>
        <CreateItineraryForm />
      </Box>
    </Box>
  );
};

export default Profile;
