import { styled } from '@mui/material/styles'

export const StyledGalleryContainer = styled('div')`
  position: relative;
  display: flex;
  flex: 0 1 auto;
  width: auto;
  overflow-x: auto;

  .MuiCard-root {
    &:nth-of-type(1) {
      margin-left: 0;
    }
  }
`
