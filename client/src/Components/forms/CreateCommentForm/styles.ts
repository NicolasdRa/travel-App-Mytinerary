import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  display: flex;
  justify-content: center;

  .createIcon {
    font-size: 1.1rem;
    margin-left: 0.5rem;
    margin-bottom: 0.2rem;
  }

  .btn {
    display: flex;
    text-transform: none;
    align-content: flex-end;
    margin-left: -8px;
    padding: 0 1rem;
  }

  .modal {
    display: flex;
    justify-content: center;
  }

  .title {
    padding: 1.5rem 0 0.5rem 0;
    text-align: center;
  }

  .subtitle {
    margin: 0 1rem;
    padding: 0 0 0.5rem 0;
    text-align: center;
  }

  .ratingContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0.5rem 0;
  }

  .ratingLabel {
    text-align: center;
  }

  .rating {
    margin-top: 0.3rem;
    margin: 0 auto;
  }

  .input_field {
    margin: 0.8rem 0;
  }

  .text {
    margin-top: 1rem;
    text-align: center;
  }

  .btns {
    padding-left: 1rem;
  }
`
