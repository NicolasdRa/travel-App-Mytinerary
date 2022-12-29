import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  .content {
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
  }

  .overline {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 0.8rem;
    padding: 0 1rem;
    font-size: 0.7rem;
  }

  .info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
  }

  .city_title {
    display: flex;
    flex: 0 0 auto;
    flex-direction: row;
    justify-content: flex-start;
  }

  .likes {
    height: 1.5rem;
  }

  .ratingContainer {
    display: flex;
    flex-direction: row;
  }

  .ratingNumber {
    margin-left: 0.5rem;
  }

  .extra_info {
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
  }

  .user_info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .avatar {
    height: 1.5rem;
    width: 1.5rem;
    margin-right: 0.5rem;
  }

  .price_time {
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
    margin: 1rem;
  }

  .decription {
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    margin: 0 1rem;
    text-align: left;
  }

  .gallery {
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
  }

  .subtitle {
    display: flex;
    justify-self: start;
    margin-left: 1rem;
  }

  .reviewContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .viewReviews {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 0 1rem;
  }

  .reviewText {
    margin-right: 0.3rem;
  }

  .expand {
    transform: rotate(0deg);
    margin-left: auto;
    transition: ${(props) =>
      props.theme.transitions.create('transform', {
        duration: props.theme.transitions.duration.shortest,
      })};
  }

  .expandOpen {
    transform: rotate(180deg);
  }
`
