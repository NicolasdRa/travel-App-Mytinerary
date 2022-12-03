import { Typography } from '@mui/material'

import { CustomCard } from '../CustomCard/CustomCard'
import { StyledContainer } from './styles'

interface CardGalleryProps {
  data: any
  type: 'cities' | 'itineraries' | 'activities'
}

export const CardGallery: React.FC<CardGalleryProps> = ({ data, type }) => {
  if (data.length > 0) {
    return (
      <StyledContainer>
        {
          // TODO: improve typing item
          data.map((item: any) => (
            <CustomCard data={item} type={type} key={item._id} />
          ))
        }
      </StyledContainer>
    )
  } else {
    return (
      <Typography style={{ margin: '1rem 0 .5rem 1rem', textAlign: 'center' }}>
        No {type} found.
      </Typography>
    )
  }
}
