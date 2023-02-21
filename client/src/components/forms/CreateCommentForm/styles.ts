import { Dialog } from '@mui/material'
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
  }
`

export const StyledDialog = styled(Dialog)`
  display: flex;
  justify-content: center;

  .title {
    padding: 1rem 0 0 0;
    text-align: center;
    font-size: 1.6rem;
  }

  .subtitle {
    padding: 0;
    text-align: center;
  }

  .ratingContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1rem;
  }

  .ratingLabel {
    text-align: center;
  }

  .rating {
    margin-top: 0.3rem;
    margin: 0 auto;
  }

  .input_field {
    margin: 0.5rem 0;
  }

  .text {
    margin-top: 1rem;
    text-align: center;
  }

  .btns {
    margin-botttom: 1rem;
  }
`
