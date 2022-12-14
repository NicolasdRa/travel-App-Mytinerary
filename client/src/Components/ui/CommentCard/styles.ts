import { styled } from '@mui/material/styles'
import { Card } from '@mui/material'

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  box-shadow: none;

  .avatar {
    height: 2rem;
    width: 2rem;
    margin: auto 0;
  }

  .userInfo {
    display: flex;
    flex-direction: 'row';
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    flex-grow: 1;
    margin-left: 1rem;
    text-align: start;
  }

  .userName {
    margin-left: 0.3rem;
    font-weight: bolder;
  }

  .ratingContainer {
    display: flex;
    flex-direction: row;
  }

  .rating {
    margin-right: 0.5rem;
    text-align: start;
  }

  .date {
    margin: 0 0.5rem 0 auto;
    align-self: flex-end;
    text-align: end;
  }

  .content {
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    padding-top: 0;
    padding-bottom: 16px !important;
  }

  .summary {
    text-align: start;
    font-weight: bolder;
  }

  .description {
    text-align: start;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }
`
