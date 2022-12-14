import { Paper } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledPaper = styled(Paper)`
  .main {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 64px);
    max-width: 444px;
  }

  .container {
    padding: 1.5rem;
  }

  .title {
    margin: 1.5rem 0 1rem 0;
    padding: 0;
    text-align: center;
  }

  .subtitle {
    margin: 1rem 0 0.5rem 0;
    padding: 0;
    text-align: center;
    font-size: 0.8rem;
  }

  .paragraph {
    margin: 1rem 0 0 0;
    padding: 0;
    font-size: 0.8rem;
  }

  .form {
    margin: 0 auto;
    padding: 8px;
  }

  .input_field {
    margin: 0.8rem auto;
  }

  .text {
    margin-top: 1rem;
    font-size: 0.8rem;
  }

  .btns {
    flex: 0 0 auto;
    display: flex;
    padding: 8px;
    margin: 1rem auto 0 auto;
  }

  .btn {
    margin: 0 auto;
    border-radius: 8px;

    ${(props) => props.theme.breakpoints.up('lg')} {
      padding: 0.5rem 0;
    }
  }

  .loader {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
  }

  .ringLoader {
    margin: 0 1.5rem;
    paddingbottom: 1.7rem;
  }
`
