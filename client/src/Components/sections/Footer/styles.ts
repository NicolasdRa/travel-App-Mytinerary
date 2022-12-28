import { styled } from '@mui/material/styles'

export const StyledFooter = styled('footer')`
  background-color: transparent;
  margin: 0 auto;
  padding: 2rem 4rem;

  .link {
    color: ${(props) => props.theme.palette.primary.light};
    font-family: 'Roboto';
    opacity: 0.7;
    font-size: 0.9rem;
    margin: 0.2rem 1rem;
    text-decoration: none;
  }

  .logo {
    height: 2.5rem;
    margin: 0.5rem;
    color: ${(props) => props.theme.palette.primary.light};
    opacity: 0.5;
  }

  .text {
    color: ${(props) => props.theme.palette.primary.light};
    opacity: 0.7;
    font-family: 'Roboto';
    font-size: 0.75rem;
    line-height: 1.8;
    margin: 0.5rem 0;
    padding: 0 3rem;
    text-decoration: none;
  }
`
