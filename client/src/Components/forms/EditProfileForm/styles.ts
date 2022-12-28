import { Dialog } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  .trigger-btn {
    text-transform: capitalize;
  }

  .edit-icon {
    margin-top: -0.3rem;
    margin-left: -0.2rem;
  }
`
export const StyledDialog = styled(Dialog)`
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .cover-image {
    width: 100%;
    background-size: 'cover';
  }

  .title {
    margin-top: 1rem;
    margin-bottom: -1rem;
    font-size: 1.5rem;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .subtitle {
    font-size: 0.8rem;
    margin: 0rem 0 3rem 0;
    padding: 0;
    text-align: center;
  }

  .input_field {
    margin: 0.5rem 0;
  }

  .text {
    margin-top: 1rem;
    text-align: center;
  }

  .formControl {
    display: flex;
    justify-self: space-between;
    min-width: 30%;
  }

  .submit_button {
    display: flex;
    margin: 1rem 0;
    padding: 0.8rem;
  }

  .btns {
    padding: 0 1rem 1rem 1rem;
  }

  .photo_icon {
    height: 3rem;
    width: 3rem;
  }

  .add_btn {
    position: fixed;
    bottom: 4rem;
    right: 1.5rem;
    z-index: 1000;
  }
`
