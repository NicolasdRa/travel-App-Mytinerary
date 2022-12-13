import { StyledImageHeaderContainer } from './styles'

interface ImageHeaderProps {
  img: string
}
// image header for profile, itinerary, activity pages
export const ImageHeader: React.FC<ImageHeaderProps> = ({ img }) => {
  return <StyledImageHeaderContainer sx={{ backgroundImage: img }} />
}
