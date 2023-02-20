import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  margin-left: 1rem;
  margin-right: 1rem;
  align-items: space-between;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  padding: 0 0.8rem;
  width: 100vw;

  ${(props) => props.theme.breakpoints.up('md')} {
    width: 80vw;
  }

  ${(props) => props.theme.breakpoints.up('lg')} {
    width: 70vw;
  }
`
