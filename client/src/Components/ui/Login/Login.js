import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import GoogleSVGIcon from "../Icons/GoogleSVGIcon";

import { logInUser } from "../../Redux/authSlice";
import { openLogInForm, closeLogInForm } from "../../Redux/formsSlice";

import ForgotPasswordForm from "../ForgotPasswordForm/ForgotPasswordForm";

import { useStyles } from "./styles";
import { useForm } from "../../../hooks/useForm";

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // Open form state
  const open = useSelector((state) => state.forms.openLogInForm);

  const handleOpenForm = () => dispatch(openLogInForm());
  const handleCloseForm = () => dispatch(closeLogInForm());

  // useForm hook
  const [formValues, handleInputChange, reset] = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logInUser(formValues));
    reset();
    handleCloseForm();
  };

  return (
    <div>
      <Button color="secondary" onClick={handleOpenForm}>
        LOGIN
      </Button>
      <Dialog
        open={open}
        onClose={handleCloseForm}
        aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit}>
          <DialogTitle
            id="form-dialog-title"
            disableTypography
            className={classes.title}>
            <Typography variant="body2">Easy Login</Typography>
          </DialogTitle>
          <DialogContent>
            <Button
              className={classes.google_button}
              variant="outlined"
              //   color='secondary'
              // component={Link}
              // to='api/auth/google'
              href="http://localhost:5000/api/v1/auth/google"
              startIcon={<GoogleSVGIcon />}>
              Log in with Google
            </Button>

            <DialogTitle
              id="form-dialog-title"
              disableTypography
              className={classes.subtitle}>
              <Typography variant="body2">
                Login with email & password
              </Typography>
            </DialogTitle>

            <TextField
              required
              autoFocus
              fullWidth
              margin="dense"
              name="email"
              label="Email Address"
              type="email"
              autoComplete="current-email"
              onChange={handleInputChange}
              className={classes.input_field}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={handleInputChange}
              fullWidth
              className={classes.input_field}
            />
            <ForgotPasswordForm className={classes.forgotPassword} />
            <Typography variant="body2" className={classes.text}>
              By proceeding you agree to Mytinerary’s Privacy Policy, User
              Agreement and T&Cs.
            </Typography>
          </DialogContent>
          <DialogActions className={classes.btns}>
            <Button onClick={handleCloseForm} color="primary">
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

export default Login;
