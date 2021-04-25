import React from 'react'
import { useSelector } from 'react-redux'

import { Box, Grid, Hidden, Paper, Typography } from '@material-ui/core'

import { HeroSection } from '../../ui/HeroSection/HeroSection'
import { CardGallery } from '../../ui/CardGallery/CardGallery'

import Footer from '../../ui/Footer/Footer'

import { selectAllItineraries } from '../../Redux/itinerariesSlice'

import { useStyles } from './styles'

export const LandingPage = () => {
  const classes = useStyles()

  const itineraries = useSelector(selectAllItineraries)

  return (
    <Box className={classes.container}>
      <HeroSection />
      <Grid container direction="column" justify="center" alignItems="center">
        <Hidden smDown>
          <Grid item md={10} className={classes.content}>
            <Paper className={classes.galleryContainer}>
              <Typography className={classes.galleryTitle}>
                Most Popular Mytineraries
              </Typography>
              <CardGallery data={itineraries} type="itineraries" />
            </Paper>
          </Grid>
        </Hidden>
      </Grid>

      <Hidden lgDown>
        <Footer />
      </Hidden>
    </Box>
  )
}
