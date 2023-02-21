import { PuffLoader } from 'react-spinners'
import { StyledContainer } from './styles'
import { Typography } from '@mui/material'

interface CustomLoaderProps {
  loading: boolean
  size?: number
  message?: string
}

export const CustomLoader: React.FC<CustomLoaderProps> = ({
  loading,
  size,
  message,
}) => {
  return (
    <StyledContainer>
      <PuffLoader color="red" loading={loading} size={size || 80} />
      <Typography variant="body1" color="secondary" className="message">
        {message} is loading...
      </Typography>
    </StyledContainer>
  )
}
