import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import ImageHeader from "../../ui/Headers/ImageHeader";
import CreateIitineraryForm from "../../ui/CreateItineraryForm/CreateItineraryForm";
import ActivityGallerySmall from "../../ui/Activities/ActivityGallerySmall";
import Favourite from "../../ui/Favourite/Favourite";

import { Avatar, Box, Button, Divider, Typography } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import EuroIcon from "@material-ui/icons/Euro";
import CreateIcon from "@material-ui/icons/Create";

import { fetchFavourites } from "../../Redux/favourites/favouriteActions";

import { useStyles } from "./styles";

const ItineraryPage = ({ match }) => {
  const classes = useStyles();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const favouriteCount = useSelector((state) => state.favourites.results);

  const dispatch = useDispatch();

  // takes params to choose itinerary to display
  const { title } = match.params;

  const itinerary = useSelector((state) =>
    state.itineraries.itineraries.data.filter(
      (itinerary) => itinerary.title === title,
    ),
  );
  const [count, setCount] = useState(0);

  //fetches favourites from DB
  useEffect(() => {
    dispatch(fetchFavourites(itinerary[0].id));
  }, [itinerary, dispatch]);

  // updates count
  useEffect(() => {
    return () => setCount(favouriteCount);
  }, [favouriteCount]);

  // variables for ui
  const {
    city,
    category,
    duration,
    pricing,
    img,
    activities,
    details,
  } = itinerary[0];

  return (
    <Box className={classes.container}>
      <ImageHeader img={img} className={classes.header} />
      <Box className={classes.content}>
        <Typography className={classes.overline} variant='overline'>
          {city.name} - {category}
        </Typography>
        <Box className={classes.info}>
          <Box className={classes.city_title}>
            <Typography variant='h5'>{title}</Typography>
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
              variant='body2'
              color='textSecondary'
              component='p'
              className={classes.author_name}>
              {/* ..still to develop this variable */}
              by John Doe
            </Typography>
          </Box>
          <Box className={classes.price_time}>
            <Box className={classes.duration}>
              <AccessTimeIcon className={classes.icons} />
              <Typography variant='body2' color='textSecondary' component='p'>
                {duration}hs
              </Typography>
            </Box>
            <Box className={classes.price}>
              <EuroIcon className={classes.icons} />
              <Typography variant='body2' color='textSecondary' component='p'>
                {pricing.price}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider className={classes.divider} />
        <Box className={classes.gallery}>
          <Typography variant='body2' className={classes.text}>
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
              size='small'
              color='secondary'
              component={Link}
              to={"/activitypage/" + title}
              className={classes.view_btn}>
              View Reviews (54)
            </Button>
            <Box className={classes.write_btn}>
              <Button
                size='small'
                color='secondary'
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

ItineraryPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  }),
};

export default ItineraryPage;
