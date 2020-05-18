import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Box, Typography } from '@material-ui/core'
// import './Header.css'
import logo from '../../Images/myLogo.png'

const useStyles = makeStyles(theme => ({
  img: {
    width: '12rem',
    margin: '3rem 0 1rem 0',
    padding: '1rem',
    /* object-fit: contain; */
    overflow: 'hidden'
  },

  legend: {
    marginTop: '1rem',
    fontSize: '1.2rem'
  }
}))

const Header = () => {
  const classes = useStyles()

  return (
    <Container>
      <Box maxWidth='sm={4}'>
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
