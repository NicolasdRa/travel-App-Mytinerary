import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  display: flex;
  font-style: lowercase;

  .btn {
    text-transform: none;
    font-weight: 400;
    font-size: 0.8rem;
    margin-left: -0.5rem;
  }

  .title {
    margin: 1rem 0 0 0;
    padding: 0;
    text-align: center;
  }

  .subtitle {
    margin: 1.5rem 1.5rem 0 1.5rem;
    padding: 0;
    text-align: left;
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
