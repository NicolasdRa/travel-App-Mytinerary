import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  margin-left: 1rem;
  margin-right: 1rem;

  .user-img {
    border: 2px solid white;
    display: flex;
    height: 6rem;
    margin: -1.5rem auto 0 auto;
    width: 6rem;
  }

  .info {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: -3rem;
    padding: 0 1rem 0 0;
  }

  .edit_btn {
    align-items: center;
    color: grey;
    display: flex;
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
    margin-bottom: 0.8rem;
    margin-top: 1rem;
  }

  .username {
    align-self: center;
  }

  .description {
    justify-self: center;
    margin-bottom: 0.8rem;
    text-align: center;
  }

  .divider {
    margin: 1rem 0;
  }
`
