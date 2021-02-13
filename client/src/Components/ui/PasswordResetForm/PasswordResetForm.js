import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { openLogInForm } from "../../Redux/formsSlice";
import { resetPassword } from "../../Redux/authSlice";
import { useForm } from "../../../hooks/useForm";

import { useStyles } from "./styles";

export const PasswordResetForm = ({ match, history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [formValues, handleInputChange] = useForm({
    password: "",
    passwordConfirm: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { ...formValues, resetToken: match.params.resetToken };

    dispatch(resetPassword(data));
    setOpenSnackBar(true);
    setTimeout(() => {
      handleClose();
      setOpenSnackBar(false);
      openLogInForm();
      history.push(`/`);
    }, 3000);
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

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <form>
          <DialogTitle
            id="form-dialog-title"
            disableTypography
            className={classes.title}>
            <Typography variant="h6">Reset your password</Typography>
          </DialogTitle>
          <DialogTitle
            id="form-dialog-subtitle"
            disableTypography
            className={classes.subtitle}>
            <Typography variant="body2">
              Enter a new password, confirm and submit. You will be re-directed
              to the log in page shortly afterwards.
            </Typography>
          </DialogTitle>
          <DialogContent>
            <TextField
              required
              autoFocus
              margin="dense"
              name="password"
              label="New Password"
              type="password"
              autoComplete="current-password"
              onChange={handleInputChange}
              fullWidth
              className={classes.input_field}
            />
            <TextField
              required
              autoFocus
              minLength="6"
              margin="dense"
              name="passwordConfirm"
              label="Confirm New Password"
              type="password"
              autoComplete="current-password-confirm"
              onChange={handleInputChange}
              fullWidth
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
              message="Your password has been reset, please log in with your new password"
            />
            <Typography variant="body2" className={classes.text}>
              By proceeding you agree to Mytinerary’s Privacy Policy, User
              Agreement and T&Cs.
            </Typography>
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
