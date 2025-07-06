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
    /* Desktop layout: consistent with landing/listing pages */
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
      /* Add padding to prevent scroll thumb overlap on desktop */
      padding-right: 8px;
      margin-right: -8px;
    }
  }

  /* Profile-specific content sections */
  .profile-hero-section {
    position: relative;
    margin-bottom: 0.5rem;
    
    ${(props) => props.theme.breakpoints.down('md')} {
      margin-bottom: 0.25rem;
    }
  }

  .profile-content-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem;
    flex: 1;
    
    ${(props) => props.theme.breakpoints.up('md')} {
      padding: 0 2rem;
      gap: 1.5rem;
    }
  }

`
