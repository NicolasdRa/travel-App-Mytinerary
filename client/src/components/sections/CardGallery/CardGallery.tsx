import { Typography } from '@mui/material'

import { CustomCard } from '../../ui/CustomCard/CustomCard'
import { Activity, City, Itinerary } from '../../../@types/types'

import { StyledContainer } from './styles'

interface CardGalleryProps {
  items: Activity[] | Itinerary[] | City[]
  source: 'itineraries' | 'cities' | 'activities'
}

export const CardGallery: React.FC<CardGalleryProps> = ({ items, source }) => {
  return (
    <StyledContainer>
      {items.length > 0 ? (
        items.map((item: Activity | Itinerary | City) => {
          const { _id, ...rest } = item

          return <CustomCard source={source} key={_id} {...rest} />
        })
      ) : (
        <Typography className="message">No {source} found.</Typography>
      )}
    </StyledContainer>
  )
}
