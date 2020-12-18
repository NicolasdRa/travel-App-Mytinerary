import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuMobile from "../MenuMobile/MenuMobile";
import { Link } from "react-router-dom";
import logo from "../../ui/Images/LogoSmallSimpleGrey.png";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
// import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: "space-between",
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    height: "1.3rem",
    padding: ".5rem .3rem",

    [theme.breakpoints.up("md")]: {
      height: "1.6rem",
    },
    [theme.breakpoints.up("lg")]: {
      height: "1.8rem",
    },
    [theme.breakpoints.up("xl")]: {
      height: "2.5rem",
    },
  },
}));

export default function TopNav() {
  const classes = useStyles();

  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.down('md'))

  // sets value to pass DeskMenu for tabs at homePage onClik
  const [value, setValue] = useState(0);
  // const handleChange = (event, value) => {
  //   setValue(value)
  // }

  // This below needs to be fixed --- find another way to push to start page if NO USER
  // if (user === null) {
  //   history.push('/')
  // }

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar className={classes.toolbar}>
          <Button
            disableRipple
            component={Link}
            to='/'
            onClick={() => setValue(0)}>
            <img src={logo} alt='Logo' className={classes.logo} />
          </Button>
          <MenuMobile />
          {/* {matches ? <MenuMobile /> : <MenuDesk valueLogo={value} />} */}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}
