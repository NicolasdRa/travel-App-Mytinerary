import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  .cover-image {
    width: 100%;
    /* background-size: 'cover' */
  }

  .title {
    margin: 2rem 0 1rem 0;
    padding: 0;
    text-align: center;
  }

  .subtitle {
    font-size: 0.8rem;
    margin: 1rem 0 1.5rem 0;
    padding: 0;
    text-align: center;
  }

  .input_field {
    margin: 0.8rem 0;
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
    padding-left: 1rem;
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
