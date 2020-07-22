import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Box, Typography } from '@material-ui/core'
// import './Header.css'
import logo from '../../Images/myLogo.png'

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
      fontSize: '1.2rem'
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
      <Box>
        <img src={logo} alt='Logo' className={classes.img} />
      </Box>
      <Box>
        <Typography variant='subtitle2' className={classes.legend}>
          Find the perfect trip, designed by insiders who know and love their
          cities.
        </Typography>
      </Box>
    </Container>
  )
}

export default Header
