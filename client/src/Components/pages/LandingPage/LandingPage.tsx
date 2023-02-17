import { useSelector } from 'react-redux'

import { Typography } from '@mui/material'

import { HeroSection } from '../../sections/HeroSection/HeroSection'
import { CardGallery } from '../../sections/CardGallery/CardGallery'

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
      <div className="galleryContainer">
        <Typography className="galleryTitle">
          Most Popular Mytineraries
        </Typography>
        <CardGallery items={itineraries} source="itineraries" />
      </div>
      <BottomNav sx={{ display: { xs: 'flex', lg: 'none' } }} />
      <Footer sx={{ display: { xs: 'none', md: 'flex' } }} />
    </StyledContainer>
  )
}
