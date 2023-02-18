import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  margin-left: 1rem;
  margin-right: 1rem;
  align-items: space-between;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  padding: 0 0 3rem 0;
  width: 94vw;

  /* margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */

  ${(props) => props.theme.breakpoints.up('md')} {
    padding: 0 0 3rem 0;
    width: 80vw;
  }

  ${(props) => props.theme.breakpoints.up('lg')} {
    width: 70vw;
  }
`
