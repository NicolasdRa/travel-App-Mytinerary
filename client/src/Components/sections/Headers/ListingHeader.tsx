import { Box, Skeleton, Typography } from '@mui/material'
import { StyledListingHeaderContainer } from './styles'
import { SearchBar } from '../../ui/SearchBar/SearchBar'

interface ListingHeaderProps {
  title?: string
  subtitle?: string
  img?: string
  handleChange?: (e: any) => void
}

// image header for listing tabs: cities, itineraries, activities
export const ListingHeader: React.FC<ListingHeaderProps> = ({
  title,
  subtitle,
  img,
  handleChange,
}) => {
  return (
    <StyledListingHeaderContainer sx={{ backgroundImage: img }}>
      {img ? (
        <div className="container">
          <Box sx={{ backgroundImage: `url(${img})` }} className="img" />
          <div className="textArea">
            <Typography color="white" variant="h6" className="title">
              {title}
            </Typography>
            <Typography color="white" variant="body2" className="subtitle">
              {subtitle}
            </Typography>
          </div>
          <div className="searchbar-container">
            <SearchBar handleChange={handleChange} />
          </div>
        </div>
      ) : (
        <Skeleton variant="rectangular" animation="wave" className="skeleton" />
      )}
    </StyledListingHeaderContainer>
  )
}
