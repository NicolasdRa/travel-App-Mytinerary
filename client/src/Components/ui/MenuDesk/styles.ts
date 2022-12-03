import { List } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledList = styled(List)`
  display: flex;
  font-size: 14px;
  margin: 0 2rem;

  [${(props) => props.theme.breakpoints.up('xl')}]: {
    align-items: center;
  }

  .listItem {
    color: inherit;
    width: auto;
    margin: 0;
    padding: 0;
  }

  .listItemText {
    padding: 0 !important;
  }

  .navLink {
    color: ${(props) => props.theme.palette.common.chalk};
    opacity: 0.8;
    padding: 0.5rem 1rem;
    font-weight: 400;
    font-size: 0.8rem;
    text-transform: uppercase;
    border-radius: 4px;
    border-color: ${(props) => props.theme.palette.common.chalk};
    lineheight: 20px;
    text-decoration: none;
    margin: 0px;
    display: inline-flex;

    &:hover,
    &:focus {
      opacity: 1;
      background: rgba(200, 200, 200, 0.2);
    }

    [${(props) => props.theme.breakpoints.up('sm')}]: {
      width: calc(100% - 30px);
      margin-left: 15px;
      margin-bottom: 8px;
      margin-top: 8px;
      text-align: left;
      & > span:first-of-type {
        justify-content: flex-start;
      }
    }

    [${(props) => props.theme.breakpoints.up('xl')}]: {
      font-size: 0.9rem;
    }
  }

  .menu-button {
    margin-left: 0.3rem;
  }

  .expandOpen {
    transform: rotate(180deg);
  }

  .expand {
    transform: rotate(0deg);
    transition: ${(props) =>
      props.theme.transitions.create('transform', {
        duration: props.theme.transitions.duration.shortest,
      })};
  }
`
