import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledGrid = styled(Grid)`
  .container {
    padding-bottom: 3rem;
  }

  .searchbarContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${(props) => props.theme.palette.common.beigeLight};
    padding: 1rem 1rem;
    margin: -0.5rem 0 0 0;
  }

  .searchBarTitle {
    color: ${(props) => props.theme.palette.primary.main};
    font-size: 0.9rem;
    font-weight: 500;
    text-align: left;
    margin: 0 0 0.5rem 0.5rem;
  }

  .searchBar {
    width: 100%;
    background-color: white;
    border-radius: 5px;
  }

  .subtitle {
    margin: 2rem auto 0.5rem 1.5rem;
    text-align: start;
  }
`

export const StyledLoaderGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  margin: 5rem 5rem;
`
