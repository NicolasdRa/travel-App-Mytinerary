import { styled } from '@mui/material/styles'
import { BottomNavigation } from '@mui/material'

export const StyledBottomNavigation = styled(BottomNavigation)`
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: ${(props) => props.theme.palette.background.paper};
  z-index: 1000;
  border-top: 1px solid ${(props) => props.theme.palette.divider};
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
`
