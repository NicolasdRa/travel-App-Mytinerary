import { styled } from '@mui/material/styles'
import { Grid } from '@mui/material'

export const StyledGrid = styled(Grid)`
  .alert {
    margin-top: 4rem;
  }

  .main {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 35vh auto;
  }

  .loadermessage {
    margin: 1.5rem 0 0 1rem;
  }

  .bottomnav {
    position: 'fixed';
    top: 0;
  }
`
