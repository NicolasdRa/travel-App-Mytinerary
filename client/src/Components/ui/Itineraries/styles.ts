import { Card, Grid } from '@mui/material'
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

export const StyledLoader = styled(Grid)`
  display: flex;
  flex-direction: column;
  margin: 5rem 5rem;
`

export const StyledCard = styled(Card)`
  flex: 0 0 auto;
  margin: 0.3rem;
  min-width: 8rem;
  max-width: 8rem;
  /* padding: 0.6rem; */
  padding: 0;

  .media {
    height: 6rem;
    object-fit: cover;
    min-width: 4rem;
    /* // maxWidth: 100%; */
    border-radius: 3;
    /* // boxShadow: 0 2px 6px 0 #c1c9d7, 0 -2px 6px 0 #cce1e9;
    // rounded centered image
    // paddingTop: 65%;
    // borderRadius: 50%;
    // margin: '1.5rem 1.5rem 0 1.5rem' */
  }

  .card_underlineNone {
    text-decoration: none;
  }

  .card_title {
    padding: 0 0.5rem;
    color: black;
    text-decoration: none;
    font-weight: 400;
  }
`
export const StyledItinerariesContainer = styled('div')`
  align-items: start;
  display: flex;
  flex-direction: column;
  justify-content: start;

  .text {
    margin: 0.5rem;
    text-align: left;
  }

  .gallery {
    display: flex;
    flex-direction: row;
    flex: 0 1 auto;
    overflow-x: auto;
    position: relative;
    width: 94vw;
  }
`
