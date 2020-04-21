import React from 'react'
import { Container, Box, Typography } from '@material-ui/core'
import './Header.css'
import logo from '../../Images/myLogo.png'

const Header = () => {
  return (
    <Container>
      <Box maxWidth='sm={4}'>
        <img src={logo} alt='Logo' className='img' />
      </Box>
      <Box>
        <Typography variant='subtitle2' className='legend'>
          Find the perfect trip, designed by insiders who know and love their
          cities.
        </Typography>
      </Box>
    </Container>
  )
}

export default Header
