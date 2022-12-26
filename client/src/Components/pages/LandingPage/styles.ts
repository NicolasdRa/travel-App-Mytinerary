import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  margin: 0;
  width: 100%;
  /* padding: 2rem 0; */

  .galleryContainer {
    border-radius: 8px 8px 0 0;
    box-shadow: 0 16px 24px 2px rgb(0 0 0 / 14%),
      0 6px 30px 5px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%);
    padding: 3rem 5rem;
    z-index: 500;
  }

  .galleryTitle {
    color: ${(props) => props.theme.palette.common.grey};
    font-size: 1.2rem;
    font-weight: 400;
    margin: 1rem 0.5rem;
  }
`
