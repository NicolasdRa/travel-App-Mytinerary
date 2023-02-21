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
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0;

  .avatar {
    height: 2rem;
    width: 2rem;
  }

  .header {
    flex-direction: column;
    align-items: start;
    justify-content: start;
    flex-grow: 1;
    margin-left: 1rem;
    text-align: start;
    height: 40px;
  }

  .username {
    font-weight: bolder;
    margin-left: 0.3rem;
  }

  .rating-container {
    display: flex;
    flex-direction: row;
  }

  .rating {
    text-align: start;
    margin-right: 0.2rem;
  }

  .date {
    align-self: flex-end;
    text-align: end;
    margin-left: 1rem;
  }
`

export const StyledCardMessage = styled('div')`
  display: flex;
  flex-direction: row;
  padding-bottom: 16px !important;
  padding-top: 0;

  .summary {
    font-weight: bolder;
    text-align: start;
    margin-right: 0.5rem;

    ::first-letter {
      text-transform: capitalize;
    }
  }

  .description:first-letter {
    text-align: start;
    text-transform: capitalize;
  }
`
