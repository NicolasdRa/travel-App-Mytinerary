import { Dialog } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledDialog = styled(Dialog)`
  .title {
    margin: 1.5rem 0 0 0;
    padding: 0 1.5rem;
    text-align: center;
  }

  .subtitle {
    margin: 2.5rem 0 0 0;
    padding: 0;
    text-align: center;
  }

  .input_field {
    margin: 0.8rem 0;
  }

  .photoIconContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }

  .photo_icon {
    height: 3rem;
    width: 3rem;
  }

  .previewContainer {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .btns {
    padding-left: 1rem;
  }

  /* cropper here below */
  .cropContainer {
    margin: 0.5rem 0 0 0;
    position: relative;
    width: 100%;
    height: 200;
    border-radius: 1rem;
    background: #333;

    ${(props) => props.theme.breakpoints.up('sm')} {
      height: 400;
    }
  }

  .cropButton {
    flex-shrink: 0;
    margin-left: 16;
  }

  .controls {
    padding: 16;
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
    ${(props) => props.theme.breakpoints.down('xs')} {
      min-width: 65;
    }
  }

  .slider {
    padding: 22px 0px;
    margin-left: 16;

    ${(props) => props.theme.breakpoints.up('sm')} {
      flex-direction: row;
      align-items: center;
      margin: 0 16px;
    }
  }
`
