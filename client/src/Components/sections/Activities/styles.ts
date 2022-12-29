import { styled } from '@mui/material/styles'
import { Grid } from '@mui/material'

export const StyledGrid = styled(Grid)`
  padding-bottom: 3rem;

  .searchbarContainer {
    background-color: ${(props) => props.theme.palette.common.beigeLight};
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 0 0 0;
    padding: 1rem 1rem;
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
    margin: 1.5rem auto 0.5rem 1.5rem;
    text-align: start;
  }
`
