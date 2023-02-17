import { TextField, Typography } from '@mui/material'
import { StyledContainer } from './styles'

interface SearchBarProps {
  handleChange?: (e: any) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ handleChange }) => {
  return (
    <StyledContainer>
      <Typography className="searchbar-title">
        Choose your destination.. Want to have fun?
      </Typography>
      <TextField
        id="outlined-helperText"
        label="Search City....Search Itineraries for City.. Search activities by City Name.."
        defaultValue=""
        variant="outlined"
        onChange={handleChange}
        className="searchbar"
      />
    </StyledContainer>
  )
}
