import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import "./TopNav.css"


export default function TopNav() {
 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const  handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
     <div className="topnav">
        <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                className="account"
                >
            <AccountCircle />
        </IconButton>          
        <IconButton edge="start" color="inherit" aria-label="menu">
           <MenuIcon className="menu"/>
        </IconButton>
        <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
             >
                <MenuItem onClick={handleClose}>
                  <Link to="/signup">Create account</Link> 
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/login">Log in</Link> 
                </MenuItem>
            </Menu>
        </div>
  );
}