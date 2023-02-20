import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  align-items: space-between;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  padding: 0 0.8rem;
  width: 100vw;

  ${(props) => props.theme.breakpoints.up('md')} {
    padding: 1.5rem 0 0 0;
    width: 80vw;
  }

  ${(props) => props.theme.breakpoints.up('lg')} {
    width: 70vw;
  }

  .avatar {
    border: 2px solid white;
    display: flex;
    height: 6rem;
    margin: -3.5rem auto 0 auto;
    width: 6rem;

    ${(props) => props.theme.breakpoints.up('md')} {
      border: 3px solid white;
      /* box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px; */
      height: 10rem;
      margin: -9rem auto 1rem auto;
      width: 10rem;
    }
  }

  .info {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: -4rem;

    ${(props) => props.theme.breakpoints.down('sm')} {
      margin-top: -3rem;
    }
  }

  .edit_btn {
    align-items: center;
    display: flex;
    margin-top: 1rem;
    padding-top: 0.5rem;
    margin-left: -0.5rem;
  }

  .likes-btn {
    align-items: center;
    display: flex;
    flex-direction: row;
  }

  .user_info {
    align-items: center;
    display: flex;
    flex-direction: column;

    ${(props) => props.theme.breakpoints.down('md')} {
      margin-bottom: 0.5rem;
    }
  }

  .username {
    align-self: center;
    font-size: 1rem;
    font-weight: 500;
  }

  .description-container {
  }

  .description-title {
    font-size: 1.2rem;
    font-weight: 500;

    ${(props) => props.theme.breakpoints.down('md')} {
      font-size: 1rem;
    }
  }

  .description {
    margin: 0.3rem 0;
  }

  .divider {
    margin: 1rem 0;
  }
`
