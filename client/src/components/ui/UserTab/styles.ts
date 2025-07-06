import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  ${(props) => props.theme.breakpoints.down('md')} {
    padding-bottom: 0.5rem;
  }

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
      margin-top: 1rem;
      margin-bottom: 0.25rem;
    }

    &:first-of-type {
      ${(props) => props.theme.breakpoints.down('md')} {
        margin-top: 0.75rem;
      }
    }
  }

  .text {
    align-self: flex-start;
    justify-self: flex-start;
    margin-top: 0.2rem;
  }
`
