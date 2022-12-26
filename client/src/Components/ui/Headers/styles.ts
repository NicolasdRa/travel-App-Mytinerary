import { styled } from '@mui/material/styles'

export const StyledListingHeaderContainer = styled('div')`
  width: 100%;
  height: 10rem;

  .img {
    width: 100%;
    height: 10rem;
    background-size: cover;
    background-position: center;
  }

  .skeleton {
    width: 100%;
    height: 10rem;
  }

  ${(props) => props.theme.breakpoints.up('sm')} {
    height: 15rem;
  }
  ${(props) => props.theme.breakpoints.up('lg')} {
    height: 30rem;
  }

  .textArea {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    color: ${(props) => props.theme.palette.primary.main};
    padding: 1rem 1.5rem;
  }
`

export const StyledImageHeaderContainer = styled('div')`
  width: 100%;
  height: 10rem;

  .img {
    width: 100%;
    height: 10rem;
    background-size: cover;
    background-position: center;
  }

  .skeleton {
    width: 100%;
    height: 10rem;
  }

  ${(props) => props.theme.breakpoints.up('sm')} {
    height: 15rem;
  }
  ${(props) => props.theme.breakpoints.up('lg')} {
    height: 30rem;
  }

  .textArea {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    color: ${(props) => props.theme.palette.primary.main};
    padding: 1rem 1.5rem;
  }
`
