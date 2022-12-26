import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  display: flex;
  height: auto;
  max-width: 100vw;
  overflow-x: auto;
  position: relative;
  width: auto;

  ${(props) => props.theme.breakpoints.up('md')} {
    max-width: 60vw;
  }

  .message {
    margin-top: 1rem;
    margin-left: 1.5rem;
  }
`
