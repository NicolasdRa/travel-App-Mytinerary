import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  .subtitles {
    align-self: flex-start;
    justify-self: flex-start;
    font-size: 1rem;
    margin-top: 1.5rem;
    margin-bottom: 0.8rem;
    margin-left: 1rem;
    font-weight: 500;

    ${(props) => props.theme.breakpoints.down('sm')} {
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
  }

  .text {
    align-self: flex-start;
    justify-self: flex-start;
    margin-top: 0.2rem;
  }
`
