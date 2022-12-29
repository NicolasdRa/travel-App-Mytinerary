import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  margin-left: 1rem;
  margin-right: 1rem;
  overflow-x: auto;
  position: relative;
  width: auto;

  .subtitle {
    display: flex;
    justify-self: start;
    margin-bottom: 0.25rem;
  }

  .divider {
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
`
