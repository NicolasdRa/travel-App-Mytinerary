import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { Button, Grid } from '@material-ui/core'

import logo from '../../../assets/images/Logo.svg'

import { useStyles } from './styles'

const Footer = () => {
  const classes = useStyles()

  const date = moment(new Date()).format('YYYY')

  return (
    <footer className={classes.main}>
      <Grid container direction="row" justify="center">
        <Grid
          item
          md={4}
          xl={3}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item component={Link} to="/" className={classes.link}>
            Home
          </Grid>
          <Grid item component={Link} to="/listing" className={classes.link}>
            Browse
          </Grid>
          <Grid item component={Link} to="/profile" className={classes.link}>
            Profile
          </Grid>
          <Grid item component={Link} to="/about" className={classes.link}>
            About
          </Grid>
        </Grid>

        <Grid
          item
          container
          md={4}
          xl={3}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Button disableRipple component={Link} to="/">
            <img src={logo} alt="Logo" className={classes.logo} />
          </Button>
          <p className={classes.text}>
            {`© 2019 - ${date} by Nicolás di Rago. All rights reserved.`}
          </p>
        </Grid>

        <Grid
          item
          container
          md={4}
          xl={3}
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.link}
        >
          <p className={classes.text}>
            * Mytinerary is not a travel agency, charges no fees and holds no
            responsibility for the content created by users.
          </p>
        </Grid>
      </Grid>
    </footer>
  )
}

export default Footer
