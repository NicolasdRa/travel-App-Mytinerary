import { Box, Skeleton, Typography } from '@mui/material'
import { StyledContainer } from './styles'
import { SearchBar } from '../../ui/SearchBar/SearchBar'

interface HeroProps {
  title?: string
  subtitle?: string
  img?: string
  handleChange?: (e: any) => void
  searchBar?: boolean
  searchBarTitle?: string
  searchBarLabel?: string
  size?: 'small' | 'medium' | 'large'
}

// image header for listing tabs: cities, itineraries, activities
export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  img,
  handleChange,
  searchBarTitle,
  searchBarLabel,
  searchBar = false,
  size = 'large',
}) => {
  console.log(img)

  return (
    <StyledContainer sx={{ backgroundImage: img }}>
      {img ? (
        <div className={size === 'medium' ? 'mediumContainer' : 'container'}>
          <Box sx={{ backgroundImage: `url(${img})` }} className="img" />
          <div className="textArea">
            <Typography color="white" variant="h6" className="title">
              {title}
            </Typography>
            <Typography color="white" variant="body2" className="subtitle">
              {subtitle}
            </Typography>
          </div>
          {searchBar && (
            <div className="searchbar-container">
              <SearchBar
                handleChange={handleChange}
                title={searchBarTitle}
                label={searchBarLabel}
              />
            </div>
          )}
        </div>
      ) : (
        <Skeleton variant="rectangular" animation="wave" className="skeleton" />
      )}
    </StyledContainer>
  )
}
