import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  width: 100%;

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
    width: 100%;
    left: 0;
    right: 0;

    ${(props) => props.theme.breakpoints.up('md')} {
      background-color: transparent;
      color: ${(props) => props.theme.palette.primary.main};
      box-shadow: none;
      transition: background-color 300ms ease, box-shadow 300ms ease;
    }
  }

  .toolbar {
    justify-content: space-between;
    width: 100%;
    max-width: 100%;
    padding: 0 1rem;

    ${(props) => props.theme.breakpoints.down('md')} {
      padding: 0 0.5rem;
      min-height: 56px;
    }

    ${(props) => props.theme.breakpoints.up('md')} {
      width: 80vw;
      max-width: 80vw;
      margin: 0 auto;
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
