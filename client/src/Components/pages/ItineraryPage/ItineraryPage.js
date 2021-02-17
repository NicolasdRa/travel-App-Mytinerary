import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { selectItineraryByTitle } from "../../Redux/itinerariesSlice";
import { selectActivitiesForItinerary } from "../../Redux/activitiesSlice";

import ImageHeader from "../../ui/Headers/ImageHeader";
import CreateIitineraryForm from "../../ui/CreateItineraryForm/CreateItineraryForm";
import ActivityGallerySmall from "../../ui/Activities/ActivityGallerySmall";
import Favourite from "../../ui/Favourite/Favourite";

import { Avatar, Box, Button, Divider, Typography } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import EuroIcon from "@material-ui/icons/Euro";
import CreateIcon from "@material-ui/icons/Create";

import { fetchFavourites } from "../../Redux/favouritesSlice";

import { useStyles } from "./styles";

const ItineraryPage = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const favouriteCount = useSelector((state) => state.favourites.results);

  // takes params & chooses itinerary to display
  const { title } = useParams();

  const [itinerary] = useSelector((state) =>
    selectItineraryByTitle(state, title),
  );

  // variables for ui
  const { _id, city, category, duration, price, img, details } = itinerary;

  const activities = useSelector((state) =>
    selectActivitiesForItinerary(state, _id),
  );

  //fetches favourites from DB
  useEffect(() => {
    dispatch(fetchFavourites(itinerary.id));
  }, [itinerary, dispatch]);

  // updates count
  const [count, setCount] = useState(0);
  useEffect(() => {
    return () => setCount(favouriteCount);
  }, [favouriteCount]);

  return (
    <Box className={classes.container}>
      <ImageHeader img={img} className={classes.header} />
      <Box className={classes.content}>
        <Typography className={classes.overline} variant="overline">
          {city} - {category}
        </Typography>
        <Box className={classes.info}>
          <Box className={classes.city_title}>
            <Typography variant="h5">{title}</Typography>
          </Box>
          <Box className={classes.likes}>
            <Favourite data={count} />
          </Box>
        </Box>
        <Box className={classes.extra_info}>
          <Box className={classes.user_info}>
            <Avatar
              // aria-label='recipe'
              // variant='rounded'
              className={classes.avatar}>
              {/* (get from author_id) */}
              Author Name
            </Avatar>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.author_name}>
              {/* ..still to develop this variable */}
              by John Doe
            </Typography>
          </Box>
          <Box className={classes.price_time}>
            <Box className={classes.duration}>
              <AccessTimeIcon className={classes.icons} />
              <Typography variant="body2" color="textSecondary" component="p">
                {duration}hs
              </Typography>
            </Box>
            <Box className={classes.price}>
              <EuroIcon className={classes.icons} />
              <Typography variant="body2" color="textSecondary" component="p">
                {price}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider className={classes.divider} />
        <Box className={classes.gallery}>
          <Typography variant="body2" className={classes.text}>
            {details}
          </Typography>
          <Divider className={classes.divider} />
          <Box className={classes.gallery}>
            {activities.length > 0 && (
              <Typography className={classes.subtitle}>
                Available activities for {title}
              </Typography>
            )}
            <ActivityGallerySmall activities={activities} />
          </Box>

          <Divider className={classes.divider} />
          <Box className={classes.comment_btns}>
            <Button
              size="small"
              color="secondary"
              component={Link}
              to={"/activitypage/" + title}
              className={classes.view_btn}>
              View Reviews (54)
            </Button>
            <Box className={classes.write_btn}>
              <Button
                size="small"
                color="secondary"
                component={Link}
                to={"/activitypage/" + title}
                className={classes.text_btn}>
                Leave your comment
              </Button>
              <CreateIcon className={classes.write_icon} />
            </Box>
          </Box>
          <Divider className={classes.divider} />
        </Box>
        {isAuthenticated ? <CreateIitineraryForm /> : null}
      </Box>
    </Box>
  );
};

export default ItineraryPage;
