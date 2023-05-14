import { Card } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
  min-width: 14rem;
  overflow: visible;
  border-radius: 10px;
  min-width: 320px;

  ${(props) => props.theme.breakpoints.up('md')} {
    width: 370px;

    :hover {
      box-shadow: 0 1px 1px rgb(0 0 0 / 5%), 0 2px 2px rgb(0 0 0 / 5%),
        0 4px 4px rgb(0 0 0 / 5%), 0 6px 8px rgb(0 0 0 / 5%),
        0 8px 16px rgb(0 0 0 / 5%);
      transform: translateY(-0.8%);
      transition: transform 0.13s ease-in-out;
    }
  }

  .cardImg {
    min-height: 200px;
    height: 8rem;
    border-radius: 10px 10px 0 0;
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

  .likesBtn {
    margin-top: 0.3rem;
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

  .bottom-content {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
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
    justify-content: center;
    align-items: center;
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
    justify-content: flex-end;
    margin: 0;
    padding: 0 0 0.5rem 0.2rem;
  }

  .textBtn {
    margin: 0 0.5rem;
    font-weight: 400;
  }
`
