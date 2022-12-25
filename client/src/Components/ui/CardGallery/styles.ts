import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  display: flex;
  flex: 0 1 auto;
  height: auto;
  max-width: 96vw;
  overflow-x: auto;
  position: relative;
  width: auto;

  ${(props) => props.theme.breakpoints.up('md')} {
    max-width: 60vw;
  }
`
