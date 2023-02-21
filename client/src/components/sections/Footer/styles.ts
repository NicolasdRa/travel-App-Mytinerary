import { styled } from '@mui/material/styles'

export const StyledFooter = styled('footer')`
  background-color: transparent;
  margin: 0 auto;
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vw;

  ${(props) => props.theme.breakpoints.up('xl')} {
    width: 70vw;
  }

  .divider {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    margin: 0 auto;
    width: 80vw;

    ${(props) => props.theme.breakpoints.up('xl')} {
      width: 70vw;
    }
  }

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
    color: ${(props) => props.theme.palette.primary.light};
    opacity: 0.5;
  }

  .text {
    color: ${(props) => props.theme.palette.primary.light};
    opacity: 0.7;
    font-family: 'Roboto';
    font-size: 0.75rem;
    line-height: 1.8;
    text-decoration: none;
    margin: 0 2rem;
  }
`
