import { Link } from 'react-router-dom'

import { AppBar, Box, Button, Toolbar } from '@mui/material'

import { MenuMobile } from '../../ui/MenuMobile/MenuMobile'
import { MenuDesk } from '../../ui/MenuDesk/MenuDesk'
import { Logo } from '../../ui/Logo/Logo'

import { StyledContainer } from './styles'
import { theme } from '../../../theme/Theme'

export const Header = () => {
  return (
    <StyledContainer>
      <AppBar position="fixed" className="appBar">
        <Toolbar className="toolbar">
          <Button component={Link} to="/">
            <Box className="logo">
              <Logo color={theme.palette.common.chalk} viewBox={'0 0 184 50'} />
            </Box>
          </Button>
          <MenuMobile sx={{ display: { xs: 'flex', lg: 'none' } }} />
          <MenuDesk sx={{ display: { xs: 'none', md: 'flex' } }} />
        </Toolbar>
      </AppBar>
    </StyledContainer>
  )
}
