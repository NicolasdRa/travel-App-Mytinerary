import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;

  .card-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .view-reviews {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .review-text {
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

  .expand-open {
    transform: rotate(180deg);
  }

  .divider {
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
`
