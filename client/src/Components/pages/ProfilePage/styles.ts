import { styled } from '@mui/material/styles'

export const StyledLoader = styled('div')`
  display: flex;
  margin: 35vh auto;
`
export const StyledContainer = styled('div')`
  display: 'flex';
  flex-direction: column;
  flex: 0 0 auto;
  width: 100%;

  .header {
    height: 20rem;
    width: 100%;
  }

  .content {
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
  }

  .userImg {
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

  .likes {
    align-items: center;
    display: flex;
    flex-direction: row;
  }

  .likes_btn {
    display: flex;
    flex-direction: row;
    flex: 0 0 auto;
    padding: 0;
    text-align: left;
  }

  .likes_icon {
    height: 2.5rem;
    width: 2.5rem;
  }

  .extra_info {
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
  }

  .user_info {
    align-self: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1rem 0;
  }

  .userName {
    align-self: center;
  }

  .avatar {
    height: 2rem;
    margin-right: 0.5rem;
    width: 2rem;
  }

  .price_time {
    align-items: center;
    display: flex;
    margin-left: auto;
    padding: 1rem 0;
  }

  .duration {
    align-items: center;
    display: flex;
  }

  .price {
    align-items: center;
    display: flex;
    margin-left: 1rem;
  }

  .info_icon {
    align-items: center;
    fill: grey;
  }

  .divider {
    margin: 1rem 0;
  }

  .details {
    align-self: center;
    display: flex;
    flex-direction: row;
    flex: 0 0 auto;
    margin-bottom: 0.8rem;
    text-align: center;
  }

  .tabs {
    margin-bottom: 0.8rem;
  }

  .gallery {
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
  }

  .write_btn {
    align-items: center;
    color: grey;
    display: flex;
    padding-left: 0.5rem;
  }

  .write_icon {
    align-items: center;
    height: 1.2rem;
    padding-bottom: 0.3rem;
    width: 1.2rem;
  }

  .alt_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .alt_container_legend {
    display: flex;
    margin: 3rem;
    text-align: center;
  }

  .alt_container_btns {
    display: flex;
    justify-content: space-around;
    margin: 0.5rem 5rem;
  }
`
