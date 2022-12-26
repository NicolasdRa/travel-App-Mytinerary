import { Box, Skeleton } from '@mui/material'
import { StyledImageHeaderContainer } from './styles'

interface ImageHeaderProps {
  img: string
}
// image header for profile, itinerary, activity pages
export const ImageHeader: React.FC<ImageHeaderProps> = ({ img }) => {
  console.log(img)

  return (
    <StyledImageHeaderContainer>
      {img ? (
        <Box sx={{ backgroundImage: `url(${img})` }} className="img" />
      ) : (
        <Skeleton variant="rectangular" animation="wave" className="skeleton" />
      )}
    </StyledImageHeaderContainer>
  )
}
