import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  margin-right: 1rem;
  margin-left: 1rem;

  .overline {
    display: flex;
    flex-direction: row;
    font-size: 0.7rem;
    justify-content: flex-start;
    margin-top: 0.8rem;
  }

  .info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .title {
    display: flex;
    flex: 0 0 auto;
    flex-direction: row;
    justify-content: flex-start;
  }

  .likes {
    height: 1.5rem;
  }

  .rating-container {
    display: flex;
    flex-direction: row;
    margin-left: -1rem;
  }

  .rating-number {
    margin-left: 0.5rem;
  }

  .extra-info {
    display: flex;
    justify-content: space-between;
  }

  .user-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .avatar {
    height: 1.5rem;
    width: 1.5rem;
    margin-right: 0.5rem;
  }

  .price-time {
    display: flex;
    margin-left: auto;
    align-items: center;
    padding: 0;
  }

  .icons {
    font-size: 1rem;
    margin-right: 0.2rem;
    color: grey;
  }

  .duration {
    display: flex;
    align-items: center;
  }

  .price {
    display: flex;
    align-items: center;
    margin-left: 1rem;
  }

  .info_icon {
    align-items: center;
    fill: grey;
  }

  .divider {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .decription {
    text-align: left;
  }
`
