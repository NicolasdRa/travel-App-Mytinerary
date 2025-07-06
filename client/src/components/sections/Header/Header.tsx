import { Link } from 'react-router-dom'

import { AppBar, Box, Button, Toolbar } from '@mui/material'

import { MenuMobile } from '../../ui/MenuMobile/MenuMobile'
import { MenuDesk } from '../../ui/MenuDesk/MenuDesk'
import { Logo } from '../../ui/Logo/Logo'

import { StyledContainer } from './styles'
import { theme } from '../../../theme/Theme'
import { useNavigationBreakpoints } from '../../../utils/breakpoints'

export const Header = () => {
  const { showMobileMenu, showDesktopMenu } = useNavigationBreakpoints()

  return (
    <StyledContainer>
      <AppBar className="appBar">
        <Toolbar className="toolbar">
          <Button component={Link} to="/">
            <Box className="logo">
              <Logo
                color={
                  showDesktopMenu
                    ? theme.palette.primary.main
                    : theme.palette.common.chalk
                }
                viewBox={'0 0 184 50'}
              />
            </Box>
          </Button>
          <MenuMobile sx={{ display: { xs: 'flex', md: 'none' } }} />
          <MenuDesk sx={{ display: { xs: 'none', md: 'flex' } }} />
        </Toolbar>
      </AppBar>
    </StyledContainer>
  )
}
