import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { AppBar, Box, Button, Hidden, Toolbar } from '@material-ui/core'

import { MenuMobile } from '../MenuMobile/MenuMobile'
import { MenuDesk } from '../MenuDesk/MenuDesk'

import { useStyles } from './styles'
import { Logo } from '../Logo/Logo'

// import useMediaQuery from "@material-ui/core/useMediaQuery";
// import { useTheme } from "@material-ui/core/styles";

export const Header = () => {
  const classes = useStyles()

  console.log(classes.logo.opacity)

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Button component={Link} to="/">
            <Box className={classes.logo}>
              <Logo />
            </Box>
          </Button>
          <Hidden mdUp>
            <MenuMobile />
          </Hidden>
          <Hidden mdDown>
            <MenuDesk />
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  )
}
