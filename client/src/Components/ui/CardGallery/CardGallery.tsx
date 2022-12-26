import { Typography } from '@mui/material'

import { CustomCard } from '../CustomCard/CustomCard'
import { StyledContainer } from './styles'

interface CardGalleryProps {
  data: any
  type: 'cities' | 'itineraries' | 'activities'
}

export const CardGallery: React.FC<CardGalleryProps> = ({ data, type }) => {
  return (
    <StyledContainer>
      {data.length > 0 ? (
        data.map((item: any) => (
          <CustomCard data={item} type={type} key={item._id} />
        ))
      ) : (
        <Typography className="message">No {type} found.</Typography>
      )}
    </StyledContainer>
  )
}
