import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  align-items: space-between;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  padding: 0 0.8rem;
  width: 100vw;

  ${(props) => props.theme.breakpoints.up('md')} {
    padding: 0.5rem 0 0 0;
    width: 80vw;
  }

  ${(props) => props.theme.breakpoints.up('lg')} {
    width: 70vw;
  }

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
