import { styled } from '@mui/material/styles'

export const StyledListingHeaderContainer = styled('div')`
  background-position: center;
  width: 100%;
  height: 16vh;
  background-size: cover;
  border-radius: 5px;

  ${(props) => props.theme.breakpoints.up('sm')} {
    height: 15rem;
  }
  ${(props) => props.theme.breakpoints.up('lg')} {
    height: 30rem;
  }

  .textArea {
    display: flex;
    flexdirection: column;
    justifycontent: flex-start;
    alignitems: flex-start;
    color: white;
    padding: 1rem 1.5rem;
  }
`

export const StyledImageHeaderContainer = styled('div')`
  background-position: center;
  width: 100%;
  height: 10rem;
  background-size: cover;

  ${(props) => props.theme.breakpoints.up('sm')} {
    height: 15rem;
  }
  ${(props) => props.theme.breakpoints.up('lg')} {
    height: 30rem;
  }

  .textArea {
    display: flex;
    flexdirection: column;
    justifycontent: flex-start;
    alignitems: flex-start;
    color: white;
    padding: 1rem 1.5rem;
  }
`
