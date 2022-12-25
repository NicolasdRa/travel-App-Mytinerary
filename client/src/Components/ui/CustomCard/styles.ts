import { Card } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  margin: 0.3rem;
  min-width: 14rem;
  overflow: visible;

  ${(props) => props.theme.breakpoints.up('md')} {
    max-width: 16rem;
  }

  .cardImg {
    min-height: 160px;
    height: 8rem;
    /* border-radius: 2, */
  }

  .cardContent {
    text-align: start;
    padding: 8px 16px;
  }

  .firstLine {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .title {
    font-weight: 500;
    text-transform: capitalize;
    line-height: 1;
  }

  .subheader {
    text-align: left;
    font-size: 0.8rem;
  }

  .avatar {
    background-color: ${(props) => props.theme.palette.secondary.main};
    height: 1rem;
    width: 1rem;
    align-self: flex-start;
  }

  .authorInfo {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .authorName {
    margin: 0 0 0 5px;
    font-size: 0.8rem;
  }

  .additionalInfo {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 0.5rem;
  }

  .duration {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    margin-right: 1rem;
  }

  .price {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    font-size: 0.8rem;
  }

  .icons {
    height: 0.8rem;
    width: 0.8rem;
    fill: grey;
    margin-right: 3px;
  }

  .infoText {
    font-size: 0.8rem;
  }

  .cardActions {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 0 0 0.5rem 0.2rem;
  }

  .textBtn {
    margin: 0 0.5rem;
    font-weight: 400;
  }
`
