import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  width: 100%;
  background: ${(props) => props.theme.palette.background.paper};
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin: 0 auto;

  ${(props) => props.theme.breakpoints.up('md')} {
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`
