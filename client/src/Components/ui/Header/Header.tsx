import { Link } from 'react-router-dom'

import { AppBar, Box, Button, Hidden, Toolbar } from '@mui/material'

import { MenuMobile } from '../MenuMobile/MenuMobile'
import { MenuDesk } from '../MenuDesk/MenuDesk'

import { Logo } from '../Logo/Logo'

import { StyledContainer } from './styles'
import { theme } from '../../Styles/Theme'

export const Header = () => {
  return (
    <StyledContainer>
      <AppBar position="fixed" className="appBar">
        <Toolbar className="toolbar">
          <Button component={Link} to="/">
            <Box className="logo">
              <Logo color={theme.palette.common.chalk} viewBox={'0 0 184 65'} />
            </Box>
          </Button>
          <Hidden mdUp>
            <MenuMobile />
          </Hidden>
          <Hidden mdDown>
            <MenuDesk />
          </Hidden>
        </Toolbar>
      </AppBar>
    </StyledContainer>
  )
}