import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AvatarPicture from "../AvatarPicture/AvatarPicture";

import Signup from "../Signup/Signup";
import Login from "../Login/Login";

import { logOutUser } from "../../Redux/authSlice";

import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({}));

export const MenuMobile = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  // log out functionality
  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logOutUser());
    history.push("/");
  };

  // menu functionality
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // media query
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        // aria-label='menu'
        aria-controls="mobile-menu"
        aria-haspopup="true"
        onClick={handleMenu}>
        {matches ? (
          <MenuIcon />
        ) : user !== null ? (
          <AvatarPicture />
        ) : (
          <AccountCircle />
        )}
      </IconButton>

      <Menu
        id="mobile-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}>
        {isAuthenticated ? (
          <MenuItem onClick={handleClose}>
            <Link to="/profile">Your Profile</Link>
          </MenuItem>
        ) : (
          <MenuItem onClick={handleClose}>
            <Login />
            {/* <Link to='/login'>Log in</Link> */}
          </MenuItem>
        )}
        {isAuthenticated ? (
          <div>
            <MenuItem onClick={handleLogOut}>
              <Link to="/">Log out</Link>
            </MenuItem>
          </div>
        ) : (
          <MenuItem onClick={handleClose}>
            <Signup />
            {/* <Link to='/signup'>Create account</Link> */}
          </MenuItem>
        )}
        {/* <MenuItem onClick={handleClose}>
          <Link to='/listing'>Browse</Link>
        </MenuItem> */}
      </Menu>
    </div>
  );
};

export default MenuMobile;
