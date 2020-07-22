import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import logo from '../../Images/LogoSmallSimpleGrey.png'

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.primary.light,
    height: '100%',
    margin: '0 auto',
    padding: '2rem 0'
  },

  link: {
    color: 'white',
    fontFamily: 'Roboto',
    opacity: '.5rem',
    fontSize: ' 1rem',
    margin: '.2rem 1rem',
    textDecoration: 'none'
  },

  logo: {
    height: '2.5rem',
    margin: '.5rem'
  },

  text: {
    color: 'white',
    opacity: '.5',
    fontFamily: 'Roboto',
    fontSize: ' .8rem',
    margin: '.5rem 0',
    textDecoration: 'none'
  }
}))

const Footer = () => {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Grid container direction='row' justify='center'>
        <Grid
          item
          container
          lg
          direction='row'
          justify='center'
          alignItems='flex-end'
          className={classes.link}
        >
          {/* <p className={classes.text}>
            * Mytinerary is not a travel agency and does not charge any fees for
            using the website.
          </p> */}
          <p className={classes.text}>
            * Mytinerary is not responsible for the content of external websites
            or created by users.
          </p>
        </Grid>
        <Grid
          item
          container
          lg
          direction='column'
          justify='center'
          alignItems='center'
        >
          <Button
            disableRipple
            component={Link}
            to='/'
            // onClick={() => setValue(0)}
          >
            <img src={logo} alt='Logo' className={classes.logo} />
          </Button>
          <p className={classes.text}>
            © 2020 Mytinerary GmbH. All rights reserved.
          </p>
        </Grid>
        <Grid
          item
          lg
          container
          direction='row'
          justify='center'
          alignItems='flex-end'
        >
          <Grid item component={Link} to='/' className={classes.link}>
            Home
          </Grid>
          <Grid item component={Link} to='/listing' className={classes.link}>
            Browse
          </Grid>
          <Grid item component={Link} to='/profile' className={classes.link}>
            Profile
          </Grid>
          <Grid item component={Link} to='/about' className={classes.link}>
            About
          </Grid>
        </Grid>
      </Grid>
    </footer>
  )
}

export default Footer
