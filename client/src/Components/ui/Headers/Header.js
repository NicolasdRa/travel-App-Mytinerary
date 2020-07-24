import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Typography } from '@material-ui/core'
// import './Header.css'
import logo from '../../ui/Images/myLogo.png'

const useStyles = makeStyles(theme => ({
  img: {
    //logo landing page
    width: '15em',
    margin: '1rem 0',
    padding: '1rem',

    [theme.breakpoints.up('sm')]: {
      width: '18em'
    },

    [theme.breakpoints.up('md')]: {
      width: '20em'
    },

    [theme.breakpoints.up('lg')]: {
      width: '30em'
    }
  },

  legend: {
    marginTop: '1rem',
    fontSize: '1rem',

    [theme.breakpoints.up('sm')]: {
      fontSize: '1.4rem'
    },

    [theme.breakpoints.up('md')]: {
      fontSize: '1.4rem'
    },

    [theme.breakpoints.up('lg')]: {
      fontSize: '2rem'
    }
  }
}))

const Header = () => {
  const classes = useStyles()

  return (
    <Container>
      <Grid>
        <img src={logo} alt='Logo' className={classes.img} />
      </Grid>
      <Grid container direction='row' justify='center' alignItems='center'>
        <Grid item xs={11} sm={8} lg={10}>
          <Typography variant='subtitle2' className={classes.legend}>
            Find the perfect trip, designed by insiders who know and love their
            cities.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Header
