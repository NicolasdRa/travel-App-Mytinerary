import { styled } from '@mui/material/styles'
import { Card, CardContent } from '@mui/material'

export const StyledCard = styled(Card)`
  box-shadow: none;
  display: flex;
  flex-direction: column;
`

export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: row;
  padding: 0.5rem 1rem;

  .avatar {
    height: 2rem;
    width: 2rem;
    margin: auto 0;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    /* flex-grow: 1; */
    margin-left: 1rem;
    text-align: start;
    height: 40px;
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
`
