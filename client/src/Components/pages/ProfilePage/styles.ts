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
    display: flex;
    margin: -1.5rem auto 0 auto;
    height: 6rem;
    width: 6rem;
    border: 2px solid white;
  }

  .info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: -3rem;
    padding: 0 1rem 0 0;
  }

  .edit_btn {
    display: flex;
    color: grey;
    align-items: center;
  }

  .likes {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .likes_btn {
    display: flex;
    flex-direction: row;
    flex: 0 0 auto;
    text-align: left;
    padding: 0;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1rem 0;
  }

  .avatar {
    height: 2rem;
    width: 2rem;
    margin-right: 0.5rem;
  }

  .price_time {
    display: flex;
    margin-left: auto;
    align-items: center;
    padding: 1rem 0;
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
    margin: 1rem 0;
  }

  .text {
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    text-align: center;
    margin: 0.5rem;
  }

  .gallery {
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
  }

  .write_btn {
    display: flex;
    color: grey;
    padding-left: 0.5rem;
    align-items: center;
  }

  .write_icon {
    align-items: center;
    width: 1.2rem;
    height: 1.2rem;
    padding-bottom: 0.3rem;
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
