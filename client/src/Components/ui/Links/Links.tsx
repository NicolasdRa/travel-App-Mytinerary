import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { StyledContainer } from './styles'

const Links = () => {
  return (
    <StyledContainer>
      <Button component={Link} to="/signup" color="secondary">
        SIGNUP
      </Button>
      <Button color="secondary" component={Link} to="/login">
        LOGIN
      </Button>
    </StyledContainer>
  )
}

export default Links
