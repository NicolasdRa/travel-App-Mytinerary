import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  display: flex;
  align-items: center;

  .likes_btn {
    padding: 0 0.2rem 0 0;
    
    &.MuiIconButton-colorSecondary {
      color: ${(props) => props.theme.palette.secondary.main};
    }
  }

  .likes_icon {
    height: 1.5rem;
    width: 1.5rem;
  }

  .text {
    font-size: 0.9rem;
  }
`
