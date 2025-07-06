import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  height: 100vh;
  justify-content: center;
  width: 100%;
  min-height: 500px; /* Reserve minimum height to prevent layout shift */

  .message {
    margin-top: 1rem;
  }
`
