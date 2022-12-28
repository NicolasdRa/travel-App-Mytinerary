import { Dialog } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledMainContainer = styled('div')`
  .add_btn {
    position: fixed;
    bottom: 4rem;
    right: 1.5rem;
    z-index: 1000;
  }
`

export const StyledDialog = styled(Dialog)`
  .title {
    margin: 1.5rem 0 0 0;
    padding: 0;
    text-align: center;
  }

  .content {
    padding-top: 0.5rem;
  }

  .subtitle {
    margin: 0.5rem 0 1rem 0;
  }

  .input_field {
    margin: 0.4rem 0;
  }

  .text {
    margin-top: 1rem;
    text-align: center;
  }

  .formControl {
    width: 100%;
  }

  .select {
    min-width: 4rem;
    margin: 0.4rem 0 0.2rem 0;
  }

  .btnContainer {
    display: flex;
    justify-content: center;
  }

  .submit_button {
    display: flex;
    margin: 1rem 0;
    padding: 0.8rem;
  }

  .btns {
    padding-left: 1rem;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .previewImgContainer {
    display: flex;
    max-height: 10em;
  }

  .previewImg {
    object-fit: cover;
    overflow: hidden;
    max-width: 100%;
    max-height: 100%;
    border-radius: 1rem;
  }

  .clearButton {
    align-self: flex-end;
  }
`
