import { TextField, Typography } from '@mui/material'
import { StyledContainer } from './styles'

interface SearchBarProps {
  handleChange?: (e: any) => void
  title?: string
  label?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({
  handleChange,
  title = 'Want to have fun? Choose your destination',
  label = 'Search City, Itineraries for City or Activities by City Name...',
}) => {
  return (
    <StyledContainer>
      <Typography className="searchbar-title">{title}</Typography>
      <TextField
        id="outlined-helperText"
        label={label}
        defaultValue=""
        variant="outlined"
        onChange={handleChange}
        className="searchbar"
      />
    </StyledContainer>
  )
}
