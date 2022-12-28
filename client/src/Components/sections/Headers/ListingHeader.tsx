import { Box, Skeleton, Typography } from '@mui/material'
import { StyledListingHeaderContainer } from './styles'

interface ListingHeaderProps {
  name?: string
  title?: string
  cityName?: string
  img?: string
}

// image header for listing tabs: cities, itineraries, activities
export const ListingHeader: React.FC<ListingHeaderProps> = ({
  name,
  title,
  cityName,
  img,
}) => {
  return (
    <StyledListingHeaderContainer sx={{ backgroundImage: img }}>
      {img ? (
        <Box sx={{ backgroundImage: `url(${img})` }} className="img">
          <div className="textArea">
            <Typography variant="h6">{name ? name : title}</Typography>
            <Typography variant="body2">{title ? cityName : name}</Typography>
          </div>
        </Box>
      ) : (
        <Skeleton variant="rectangular" animation="wave" className="skeleton" />
      )}
    </StyledListingHeaderContainer>
  )
}
