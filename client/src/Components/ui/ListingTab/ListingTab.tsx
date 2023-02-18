import { Typography } from '@mui/material'

import { Activity, City, Itinerary } from '../../../@types/types'
import { StyledContainer } from './styles'
import { CustomLoader } from '../../ui/CustomLoader/CustomLoader'
import { Hero } from '../../sections/Hero/Hero'
import { CardGallery } from '../../sections/CardGallery/CardGallery'

interface ListingTabProps {
  data: City[] | Itinerary[] | Activity[] | null
  img?: string
  headerTitle?: string
  headerSubtitle: string
  galleryTitle: string
  searchBarTitle?: string
  searchBarLabel?: string
  source: 'cities' | 'itineraries' | 'activities'
  handleChange: (e: any) => void
}

export const ListingTab: React.FC<ListingTabProps> = ({
  source,
  data,
  img,
  headerTitle,
  headerSubtitle,
  galleryTitle,
  searchBarTitle = 'Want to go somewhere?',
  searchBarLabel = 'Search...',
  handleChange,
}) => {
  if (!data) {
    return <CustomLoader loading={true} message="loading data..." />
  }

  return (
    <StyledContainer>
      <Hero
        img={img}
        title={headerTitle}
        subtitle={headerSubtitle}
        handleChange={handleChange}
        searchBar
        searchBarTitle={searchBarTitle}
        searchBarLabel={searchBarLabel}
      />
      <Typography variant="subtitle2" className="page-subtitle">
        {galleryTitle}
      </Typography>
      <div className="gallery-container">
        <CardGallery items={data} source={source} />
      </div>
    </StyledContainer>
  )
}
