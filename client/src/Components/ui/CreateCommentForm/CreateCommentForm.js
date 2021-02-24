import React, { useState } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import CreateIcon from "@material-ui/icons/Create";
import { forgotPassword } from "../../Redux/authSlice";

import { useStyles } from "./styles";
import { useForm } from "../../../hooks/useForm";
import { selectCurrentUser } from "../../Redux/usersSlice";
import { addComment } from "../../Redux/commentsSlice";
import { updateItineraryComments } from "../../Redux/itinerariesSlice";

const CreateCommentForm = ({ userId, itineraryId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [formValues, handleInputChange] = useForm({
    rating: "",
    summary: "",
    description: "",
    author: userId,
    itinerary: itineraryId,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("comment created", formValues);

    dispatch(addComment(formValues));
    dispatch(updateItineraryComments(formValues));

    setOpenSnackBar(true);
    setTimeout(() => {
      setOpenSnackBar(false);
      handleClose();
    }, 2500);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.btnContainer}>
      <Button
        className={classes.btn}
        color="secondary"
        onClick={handleClickOpen}>
        Leave your Comment
        <CreateIcon color="secondary" className={classes.createIcon} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.modal}>
        <form>
          <DialogTitle
            id="form-dialog-title"
            disableTypography
            className={classes.title}>
            <Typography variant="h6">Share your experience</Typography>
          </DialogTitle>
          <DialogTitle
            id="form-dialog-subtitle"
            disableTypography
            className={classes.subtitle}>
            <Typography variant="body2">
              Help the community with your review
            </Typography>
          </DialogTitle>

          <DialogContent>
            <Box className={classes.ratingContainer}>
              <Typography variant="body2" className={classes.ratingLabel}>
                Rate your experience
              </Typography>
              <Rating
                size="large"
                precision={0.5}
                defaultValue={2}
                name="rating"
                onChange={handleInputChange}
                className={classes.rating}
              />
            </Box>
            <TextField
              required
              autoFocus
              fullWidth
              margin="dense"
              name="summary"
              label="summary"
              type="text"
              autoComplete="current-summary"
              onChange={handleInputChange}
              className={classes.input_field}
            />
            <TextField
              required
              autoFocus
              fullWidth
              multiline
              rows={3}
              margin="dense"
              name="description"
              label="full review"
              type="text"
              autoComplete="current-description"
              onChange={handleInputChange}
              className={classes.input_field}
            />
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={openSnackBar}
              autoHideDuration={4000}
              onClose={handleCloseSnackBar}
              message="Your comment has been submitted, thanks!!."
            />
          </DialogContent>
          <DialogActions className={classes.btns}>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="secondary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

CreateCommentForm.propTypes = {
  userId: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  itinerary: PropTypes.string.isRequired,
};

export default CreateCommentForm;
