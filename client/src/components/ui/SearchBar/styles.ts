import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  .searchbar-title {
    font-size: 1rem;
    color: ${(props) => props.theme.palette.common.chalk};
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    margin-left: 1rem;
    font-weight: 500;

    ${(props) => props.theme.breakpoints.up('md')} {
      font-size: 1.5rem;
    }
  }

  .searchbar {
    align-self: flex-start;
    justify-self: flex-start;
    margin-top: 0.2rem;
    color: ${(props) => props.theme.palette.common.chalk};
    background-color: ${(props) => props.theme.palette.common.chalk};
    box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
    border-radius: 10px;

    ${(props) => props.theme.breakpoints.up('md')} {
      width: 30rem;
    }
  }
`
