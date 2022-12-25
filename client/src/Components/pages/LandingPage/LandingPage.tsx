import { useSelector } from 'react-redux'

import { Grid, Hidden, Paper, Typography } from '@mui/material'

import { HeroSection } from '../../ui/HeroSection/HeroSection'
import { CardGallery } from '../../ui/CardGallery/CardGallery'

import { Footer } from '../../ui/Footer/Footer'

import { selectAllItineraries } from '../../Redux/itinerariesSlice'
import { StyledContainer } from './styles'
import BottomNav from '../../ui/BottomNav/BottomNav'
import { Header } from '../../ui/Header/Header'

export const LandingPage = () => {
  const itineraries = useSelector(selectAllItineraries)

  return (
    <StyledContainer>
      <Header />
      <HeroSection />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Hidden smDown>
          <Grid item md={10} className="content">
            <Paper className="galleryContainer">
              <Typography className="galleryTitle">
                Most Popular Mytineraries
              </Typography>
              <CardGallery data={itineraries} type="itineraries" />
            </Paper>
          </Grid>
        </Hidden>
      </Grid>
      <Hidden mdUp>
        <BottomNav />
      </Hidden>
      <Hidden lgDown>
        <Footer />
      </Hidden>
    </StyledContainer>
  )
}
