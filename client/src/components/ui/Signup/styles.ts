import { styled } from '@mui/material/styles'
import { Paper } from '@mui/material'

export const StyledPaper = styled(Paper)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 64px);
  max-width: 444px;

  .container {
    padding: 1.5rem;
  }

  .title {
    margin: 1.5rem 0 0 0;
    padding: 0;
    text-align: center;
  }

  .google_button {
    display: flex;
    margin: 1rem 0.5rem;
    padding: 0.8rem;
  }

  .subtitle {
    margin: 1rem 0 0 0;
    padding: 0;
    text-align: center;
  }

  .form {
    margin: 0 auto;
    padding: 8px;
  }

  .input_field {
    margin: 0.8rem auto;
  }

  .btns {
    flex: 0 0 auto;
    display: flex;
    padding: 8px;
    align-items: center;
  }

  .loginBtn {
    width: 100%;
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
    padding-bottom: 1.7rem;
  }

  .bottomLink {
    margin: 0.8rem 0 1rem 0;
  }
`
