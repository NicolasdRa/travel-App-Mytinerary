import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  display: 'flex';
  border-radius: 50%;
  margin: ${(props) => props.theme.spacing(0.4)};
  /* background-color: ${(props) => props.theme.palette.secondary.main}; */
  box-shadow: 0 5px 15px -8px rgb(0 0 0 / 24%), 0 8px 10px -5px rgb(0 0 0 / 20%);

  .small {
    width: ${(props) => props.theme.spacing(3)};
    height: ${(props) => props.theme.spacing(3)};
  }
`
