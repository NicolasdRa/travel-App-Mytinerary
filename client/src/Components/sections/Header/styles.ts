import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  .appBar {
    display: flex;
    border: 0;
    border-radius: 0px;
    padding: 0.2rem 0;
    /* margin-bottom: '20px'; */
    color: ${(props) => props.theme.palette.common.grey};
    width: 100%;
    background-color: ${(props) => props.theme.palette.primary.main};
    box-shadow: 0 4px 18px 0px rgba(0 0 0 0.12),
      0 7px 10px -5px rgba(0 0 0 0.15);
    transition: all 150ms ease 0s;
    align-items: center;
    flex-flow: row nowrap;
    justify-content: flex-start;
    position: relative;
  }

  .toolbar {
    justify-content: space-between;
    width: 100%;

    ${(props) => props.theme.breakpoints.up('xl')} {
      justify-content: space-around;
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
