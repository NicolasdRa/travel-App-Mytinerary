import { Skeleton, Typography } from '@mui/material'
import { StyledContainer, StyledImage } from './styles'
import { SearchBar } from '../../ui/SearchBar/SearchBar'

interface HeroProps {
  title?: string
  subtitle?: string
  img?: string
  handleChange?: (e: any) => void
  searchBar?: boolean
  searchBarTitle?: string
  searchBarLabel?: string
  size: 'small' | 'medium' | 'large'
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
  size = 'medium',
}) => {
  return (
    <StyledContainer>
      {img ? (
        <div
          className={`${
            size === 'large' ? 'large' : size === 'medium' ? 'medium' : 'small'
          } container`}
        >
          <StyledImage
            sx={{ backgroundImage: `url(${img})` }}
            className={
              size === 'large'
                ? 'large'
                : size === 'medium'
                ? 'medium'
                : 'small'
            }
          />
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