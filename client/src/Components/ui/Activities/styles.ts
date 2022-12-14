import { styled } from '@mui/material/styles'
import { Card, Grid } from '@mui/material'

export const StyledGrid = styled(Grid)`
  padding-bottom: 3rem;

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

export const StyledGalleryContainer = styled('div')`
  position: relative;
  display: flex;
  flex: 0 1 auto;
  width: auto;
  overflow-x: auto;
`

export const StyledCard = styled(Card)`
  .root {
    flex: 0 0 auto;
    margin: 0.3rem;
    min-width: 8rem;
    max-width: 8rem;
    padding: 0;
  }

  .media {
    height: 6rem;
    object-fit: cover;
    min-width: 4rem;
    border-radius: 3;
  }

  .card_underlineNone {
    text-decoration: none;
  }

  .card_title {
    padding: 0 0.15rem;
    color: black;
    text-decoration: none;
    font-weight: 400;
  }
`
