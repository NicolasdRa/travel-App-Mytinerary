import moment from 'moment'
import { Link } from 'react-router-dom'

import { Button, Grid } from '@mui/material'

import logo from '../../../assets/images/Logo.svg'
import { StyledFooter } from './styles'

export const Footer = () => {
  const date = moment(new Date()).format('YYYY')

  return (
    <StyledFooter>
      <Grid container direction="row" justifyContent="center">
        <Grid
          item
          md={4}
          xl={3}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item component={Link} to="/" className="link">
            Home
          </Grid>
          <Grid item component={Link} to="/listing" className="link">
            Browse
          </Grid>
          <Grid item component={Link} to="/profile" className="link">
            Profile
          </Grid>
          <Grid item component={Link} to="/about" className="link">
            About
          </Grid>
        </Grid>

        <Grid
          item
          container
          md={4}
          xl={3}
          direction="column"
          justifyContent="center"
          alignItems="center"
          className="text"
        >
          <Button disableRipple component={Link} to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Button>
          <p className="text">
            © 2019 - {date} by Nicolás di Rago. All rights reserved.
          </p>
        </Grid>

        <Grid
          item
          container
          md={4}
          xl={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="link"
        >
          <p className="text">
            * Mytinerary is not a travel agency, charges no fees and holds no
            responsibility for the content created by users.
          </p>
        </Grid>
      </Grid>
    </StyledFooter>
  )
}