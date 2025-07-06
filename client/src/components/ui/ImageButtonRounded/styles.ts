import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  min-width: 5rem;
  max-width: 50%;

  .image {
    position: relative;
    margin-top: -2rem;
    min-height: 8rem;
    width: 8rem;

    ${(props) => props.theme.breakpoints.down('xs')} {
      /* Overrides inline-style */
      width: 5rem !important;
      height: 5rem;
    }

    &:hover, &.focusVisible {
      z-index: 1;
      & .imageBackdrop {
        opacity: 0.15;
      }
      & .imageMarked {
        opacity: 0;
      }
      & .imageTitle {
        border: 3px solid currentColor;
      }
    }
  }

  .focusVisible {
  }

  .imageButton {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.palette.common.white};
  }

  .imageSrc {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-size: cover;
    background-position: 50% 50%;
    border-radius: 50%;
  }

  .imageBackdrop {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.palette.common.black};
    opacity: 0.4;
    transition: ${(props) => props.theme.transitions.create('opacity')};
    border-radius: 50%;
    border: 2px solid white;
  }

  .imageTitle {
    position: relative;
    padding: ${(props) => props.theme.spacing(2)}px
      ${(props) => props.theme.spacing(2)}px
      ${(props) => props.theme.spacing(1)}px;
  }

  .imageMarked {
    height: 3px;
    width: 18px;
    background-color: ${(props) => props.theme.palette.common.white};
    position: absolute;
    bottom: -2px;
    left: calc(50% - 9px);
    transition: ${(props) => props.theme.transitions.create('opacity')};
    border-radius: 0.5rem;
  }
`
