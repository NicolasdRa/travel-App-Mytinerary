import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  width: 100%;

  .galleryContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1.5rem auto;
    width: 80vw;
    /* z-index: 500; */

    ${(props) => props.theme.breakpoints.down('md')} {
      display: none;
    }

    ${(props) => props.theme.breakpoints.up('lg')} {
      width: 70vw;
    }
  }

  .galleryTitle {
    color: ${(props) => props.theme.palette.common.grey};
    font-size: 1.1rem;
    font-weight: normal;
    margin: 1rem 0.5rem;
  }
`
