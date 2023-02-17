import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  padding: 0 0 3rem 0;
  width: 100vw;

  ${(props) => props.theme.breakpoints.up('md')} {
    padding: 1.5rem 0 3rem 0;
    width: 70vw;
  }

  .page-subtitle {
    margin: 1.5rem auto 0.5rem 0.5rem;
    align-self: flex-start;
  }

  .gallery-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100vw;

    ${(props) => props.theme.breakpoints.up('md')} {
      width: 70vw;
    }
  }
`
