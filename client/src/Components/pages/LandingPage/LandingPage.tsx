import { useSelector } from 'react-redux'

import { Grid, Paper, Typography } from '@mui/material'

import { HeroSection } from '../../sections/HeroSection/HeroSection'
import { CardGallery } from '../../ui/CardGallery/CardGallery'

import { Footer } from '../../sections/Footer/Footer'

import { selectAllItineraries } from '../../../redux/itinerariesSlice'
import { StyledContainer } from './styles'
import { BottomNav } from '../../sections/BottomNav/BottomNav'
import { Header } from '../../sections/Header/Header'

export const LandingPage = () => {
  const itineraries = useSelector(selectAllItineraries)

  return (
    <StyledContainer>
      <Header />
      <HeroSection />
      <Grid
        sx={{ display: { xs: 'none', md: 'flex' } }} // Hide on mobile
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item md={10}>
          <Paper className="galleryContainer">
            <Typography className="galleryTitle">
              Most Popular Mytineraries
            </Typography>
            <CardGallery data={itineraries} type="itineraries" />
          </Paper>
        </Grid>
      </Grid>
      <BottomNav sx={{ display: { xs: 'flex', lg: 'none' } }} />
      <Footer sx={{ display: { xs: 'none', md: 'flex' } }} />
    </StyledContainer>
  )
}
