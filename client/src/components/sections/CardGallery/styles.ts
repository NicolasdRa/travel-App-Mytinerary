import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  width: 100%;
  flex: 1;
  justify-items: start;

  ${(props) => props.theme.breakpoints.up('md')} {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    padding: 1rem 0;
    justify-content: start;
    /* Cards aligned to the left */
    justify-items: start;
    width: 100%;
    max-width: none;
  }

  ${(props) => props.theme.breakpoints.up('lg')} {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    justify-items: start;
  }

  ${(props) => props.theme.breakpoints.up('xl')} {
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
    justify-items: start;
  }

  .message {
    grid-column: 1 / -1;
    text-align: center;
    margin: 2rem 0;
    font-size: 1.1rem;
    color: ${(props) => props.theme.palette.text.secondary};
  }
`
