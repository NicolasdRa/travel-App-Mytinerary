import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  .appBar {
    align-items: center;
    background-color: ${(props) => props.theme.palette.primary.main};
    border-radius: 0px;
    border: 0;
    box-shadow: 0 4px 18px 0px rgba(0 0 0 0.12),
      0 7px 10px -5px rgba(0 0 0 0.15);
    color: ${(props) => props.theme.palette.common.grey};
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    padding: 0.2rem 0;
    position: relative;
    transition: all 150ms ease 0s;
    width: 100vw;

    ${(props) => props.theme.breakpoints.up('md')} {
      background-color: transparent;
      color: ${(props) => props.theme.palette.primary.main};
      box-shadow: none;
    }
  }

  .toolbar {
    justify-content: space-between;
    width: 100vw;

    ${(props) => props.theme.breakpoints.up('md')} {
      width: 70vw;
    }
  }

  .title {
    flex-grow: 1;
  }

  .logo {
    display: flex;
    padding-top: 0.5rem;
    width: 6.5rem;
    fill: ${(props) => props.theme.palette.common.chalk};
    opacity: 0.8;

    ${(props) => props.theme.breakpoints.up('md')} {
      width: 7rem;
    }
    ${(props) => props.theme.breakpoints.up('lg')} {
      width: 6rem;
    }
    ${(props) => props.theme.breakpoints.up('xl')} {
      width: 8rem;
    }
  }
`
