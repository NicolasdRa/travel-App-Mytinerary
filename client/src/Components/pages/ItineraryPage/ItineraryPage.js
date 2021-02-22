import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import PuffLoader from "react-spinners/PuffLoader";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchItineraryByTitle,
  fetchItineraryById,
  selectItineraryByTitle,
  selectCurrentItinerary,
} from "../../Redux/itinerariesSlice";

import ImageHeader from "../../ui/Headers/ImageHeader";
import CreateIitineraryForm from "../../ui/CreateItineraryForm/CreateItineraryForm";
import ActivityGallerySmall from "../../ui/Activities/ActivityGallerySmall";
import Favourite from "../../ui/Favourite/Favourite";

import { Avatar, Box, Button, Divider, Typography } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import EuroIcon from "@material-ui/icons/Euro";

import { fetchFavourites } from "../../Redux/favouritesSlice";
import { fetchCommentsForItinerary } from "../../Redux/commentsSlice";

import { useStyles } from "./styles";
import CreateCommentForm from "../../ui/CreateCommentForm/CreateCommentForm";
import { selectCurrentUser } from "../../Redux/usersSlice";
import { CommentCard } from "../../ui/CommentCard/CommentCard";

// TODO load comments in the bottom div
// TODO continue brushing up DB
// TODO fix cover img not loading
// TODO edit itinerary functionality
// TODO add view reviews
// TODO add delete itinerary btn and functionality

const ItineraryPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector(selectCurrentUser);

  // takes params & chooses itinerary to display
  const { title: itineraryTitle } = useParams();

  // fetches data from DB
  useEffect(() => {
    dispatch(fetchItineraryByTitle(itineraryTitle));
  }, []);

  const itinerary = useSelector(selectCurrentItinerary);

  // //fetches favourites from DB
  // useEffect(() => {
  //   dispatch(fetchFavourites(itinerary.id));
  // }, [itinerary, dispatch]);

  // // updates count
  // const [count, setCount] = useState(0);
  // useEffect(() => {
  //   return () => setCount(favouriteCount);
  // }, [favouriteCount]);

  if (!itinerary) {
    return (
      <div className={classes.loader}>
        <PuffLoader color="red" loading={true} size={80} />
      </div>
    );
  }

  // variables for ui
  const {
    _id,
    title,
    city,
    category,
    duration,
    price,
    img,
    details,
    activities,
    author: { userName: authorName } = "",
    author: { img: authorImg } = "",
  } = itinerary;

  // variable to pass in create comment form
  const userId = currentUser._id;

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
            {/* <Favourite data={count} /> */}
          </Box>
        </Box>
        <Box className={classes.extra_info}>
          <Box className={classes.user_info}>
            <Avatar
              // aria-label='recipe'
              // variant='rounded'
              alt={authorName}
              src={authorImg}
              className={classes.avatar}
            />
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.author_name}>
              {authorName ? `by ${authorName}` : "by anonymous"}
            </Typography>
          </Box>
          <Box className={classes.price_time}>
            <Box className={classes.duration}>
              <AccessTimeIcon className={classes.icons} />
              <Typography variant="body2" color="textSecondary" component="p">
                {duration}
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
          <CreateCommentForm userId={userId} itineraryId={_id} />
          <Divider className={classes.divider} />
          <Box className={classes.gallery}>
            <Typography variant="body2" className={classes.subtitle}>
              {activities.length > 0
                ? "Available activities"
                : "No activities found"}{" "}
              for {title}
            </Typography>

            <ActivityGallerySmall activities={activities} />
          </Box>

          <Divider className={classes.divider} />
          <Box className={classes.comment_btns}>
            {/* <Button
              size="small"
              color="secondary"
              component={Link}
              to={"/activitypage/" + title}
              className={classes.view_btn}>
              View Reviews (54)
            </Button> */}
            {itinerary.comments.map((comment) => (
              <CommentCard key={comment._id} comment={comment} />
            ))}
          </Box>
          <Divider className={classes.divider} />
        </Box>
        {isAuthenticated && <CreateIitineraryForm />}
      </Box>
    </Box>
  );
};

export default ItineraryPage;
