import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

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
    margin: 0 0 0.5rem 0.5rem;
    text-align: left;
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

export const StyledLoader = styled(Grid)`
  display: flex;
  flex-direction: column;
  margin: 5rem 5rem;
`
