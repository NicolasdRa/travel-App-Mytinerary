import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  .reactEasyCrop_Container {
    border-radius: 0.4rem !important;
  }

  .cropContainer {
    margin: 0.5rem 0 0 0;
    position: relative;
    width: 100%;
    height: 200px;
    border-radius: 1rem;
    background: ${(props) => props.theme.palette.background.paper};

    ${(props) => props.theme.breakpoints.up('sm')} {
      height: 400;
    }
  }

  .cropButton {
    flex-shrink: 0;
    margin-left: 16px;
  }

  .controls {
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    ${(props) => props.theme.breakpoints.up('sm')} {
      flex-direction: row;
      align-items: center;
    }
  }

  .sliderContainer {
    display: flex;
    flex: 1;
    align-items: center;
  }

  .sliderLabel {
    margin-right: 1rem;

    ${(props) => props.theme.breakpoints.up('xs')} {
      min-width: 45px;
    }
  }

  .slider {
    padding: 22px 0px;

    ${(props) => props.theme.breakpoints.up('sm')} {
      flex-direction: row;
      align-items: center;
      margin: 0 16px;
    }
  }
`

export const StyledPhotoIconContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;

  .photo_icon {
    height: 5rem;
    width: 5rem;
  }
`
