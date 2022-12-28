import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  display: flex;
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

  .info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
  }

  .overline {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 1rem;
    padding: 0 0 0 1rem;
  }

  .city_title {
    display: flex;
    flex: 0 0 auto;
    flex-direction: row;
    justify-content: flex-start;
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
    height: '2.5rem';
    width: '2.5rem';
  }

  .extra_info {
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
  }

  .user_info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
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
    display: 'flex';
    align-items: 'center';
  }

  .price {
    display: 'flex';
    align-items: 'center';
    margin-left: '1rem';
  }

  .info_icon {
    align-items: 'center';
    fill: 'grey';
  }

  .divider {
    margin: '1rem';
  }

  .text {
    display: 'flex';
    flex-direction: 'column';
    flex: '0 0 auto';
    textalign: 'left';
    margin: '1rem';
  }

  .gallery {
    display: 'flex';
    flex-direction: 'column';
    flex: '0 0 auto';
  }

  .comment_btns {
    display: 'flex';
    flex-direction: 'row';
    justify-content: 'space-between';
    align-items: 'center';
    padding: '.5rem 1.5rem';
  }

  .view_btn {
    align-items: 'center';
  }

  .text_btn {
    align-items: 'center';
  }

  .write_btn {
    display: 'flex';
    color: 'grey';
    padding-left: '.5rem';
    align-items: 'center';
  }

  .write_icon {
    align-items: 'center';
  }
`
