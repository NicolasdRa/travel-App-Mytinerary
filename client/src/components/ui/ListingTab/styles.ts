import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0;
  padding: 0 0 3rem 0;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  flex: 1;

  ${(props) => props.theme.breakpoints.up('md')} {
    padding: 1.5rem 0 3rem 0;
    width: 100%;
    max-width: 100%;
    /* Content inherits the 70vw from parent content-area */
  }

  .page-subtitle {
    margin: 1.5rem auto 0.5rem 1rem;
    align-self: flex-start;
    width: 100%;
    
    ${(props) => props.theme.breakpoints.down('md')} {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
    
    ${(props) => props.theme.breakpoints.up('md')} {
      margin-left: 0;
      margin-right: 0;
    }
  }

  .gallery-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    max-width: 100%;
    padding: 0 0.5rem;
    flex: 1;

    ${(props) => props.theme.breakpoints.up('md')} {
      width: 100%;
      max-width: 100%;
      padding: 0;
      /* Grid will be full width of the 70vw container */
    }
  }
`
