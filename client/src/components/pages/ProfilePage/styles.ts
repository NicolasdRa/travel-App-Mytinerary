import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  width: 100%;
  margin: 0;
  overflow-x: hidden;

  ${(props) => props.theme.breakpoints.down('md')} {
    /* Mobile layout: full viewport with fixed header */
    height: 100vh;
    display: flex;
    flex-direction: column;
    
    .header-area {
      flex-shrink: 0;
      z-index: 1100;
    }
    
    .content-area {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      
      /* Account for bottom nav */
      padding-bottom: 60px;
    }
    
    .bottom-nav-area {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }
  }

  ${(props) => props.theme.breakpoints.up('md')} {
    /* Desktop layout: similar to mobile but with wider content */
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .header-area {
      width: 100%;
      flex-shrink: 0;
      z-index: 1100;
    }
    
    .content-area {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      width: 80vw;
      max-width: 80vw;
      display: flex;
      flex-direction: column;
    }
  }
`
