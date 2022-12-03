import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  width: 100%;
  margin: 0;
  /* padding: 2rem 0; */

  .galleryContainer {
    border-radius: 8px 8px 0 0;
    padding: 3rem 5rem;
    box-shadow: 0 16px 24px 2px rgb(0 0 0 / 14%),
      0 6px 30px 5px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%);
    z-index: 500;
  }

  .galleryTitle {
    margin: 1rem 0.5rem;
    font-size: 1.2rem;
    color: grey;
    font-weight: 400;
  }
`
