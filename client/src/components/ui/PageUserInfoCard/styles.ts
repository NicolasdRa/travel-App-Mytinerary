import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.95) 50%,
    rgba(255, 255, 255, 1) 100%
  );
  border-radius: 0 0 24px 24px;
  padding: 4rem 1rem 1rem 1rem; /* Add top padding for avatar space */
  margin-top: 0;
  z-index: 10;

  ${(props) => props.theme.breakpoints.up('md')} {
    padding: 6rem 2rem 2rem 2rem; /* Add top padding for larger avatar */
    border-radius: 0 0 32px 32px;
  }

  .avatar {
    border: 4px solid white;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    height: 8rem;
    width: 8rem;
    margin-bottom: 0.5rem;
    position: absolute;
    top: -4rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 20;

    ${(props) => props.theme.breakpoints.up('md')} {
      border: 6px solid white;
      height: 12rem;
      width: 12rem;
      margin-bottom: 1rem;
      top: -6rem;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
    }
  }


  .user_info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.5rem;

    ${(props) => props.theme.breakpoints.up('md')} {
      align-items: center;
      margin-top: 1rem;
    }

    .name {
      margin-bottom: 0.25rem;
      font-weight: 600;
      text-align: center;
    }

    .username {
      color: ${(props) => props.theme.palette.text.secondary};
      font-size: 1rem;
      font-weight: 500;
      text-align: center;
    }
  }

  .edit_btn {
    position: absolute;
    top: 1vh;
    left: calc(50% + 4rem + 1rem); /* Avatar center + avatar radius + spacing */
    right: 1rem; /* Maintain margin from page edge */
    display: flex;
    align-items: center;
    justify-content: flex-start;
    z-index: 21;

    ${(props) => props.theme.breakpoints.up('md')} {
      top: calc(35vh + 1.5rem); /* 1.5rem below hero image on desktop */
      left: calc(50% + 6rem + 1.5rem); /* Avatar center + avatar radius + spacing */
      right: 2rem; /* Maintain margin from page edge */
    }

    /* Reduce font size on mobile */
    ${(props) => props.theme.breakpoints.down('md')} {
      font-size: 0.8rem;
      
      button {
        font-size: 0.8rem;
        padding: 0.4rem 0.8rem;
      }
    }
  }

  .description-container {
    width: 100%;
    max-width: 600px;
    text-align: center;
    margin-top: 0.75rem;

    ${(props) => props.theme.breakpoints.up('md')} {
      text-align: left;
      margin-top: 1rem;
    }

    .description-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: ${(props) => props.theme.palette.text.primary};
      margin-bottom: 0.75rem;

      ${(props) => props.theme.breakpoints.up('md')} {
        font-size: 1.25rem;
        margin-bottom: 1rem;
      }
    }

    .description {
      font-size: 0.95rem;
      line-height: 1.6;
      color: ${(props) => props.theme.palette.text.secondary};
      margin-bottom: 0;

      ${(props) => props.theme.breakpoints.up('md')} {
        font-size: 1rem;
        line-height: 1.7;
        margin-bottom: 0;
      }
    }
  }

  .divider {
    width: 100%;
    max-width: 400px;
    margin: 0.5rem auto 0 auto;
    opacity: 0.3;

    ${(props) => props.theme.breakpoints.up('md')} {
      max-width: 600px;
      margin: 1rem auto 0 auto;
    }
  }
`
