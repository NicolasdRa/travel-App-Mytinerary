import { styled } from '@mui/material/styles'
import { Card } from '@mui/material'

export const StyledSmallCard = styled(Card)`
  flex: 0 0 auto;
  margin: 0.3rem;
  min-width: 9rem;
  max-width: 9rem;
  padding: 0;

  .media {
    height: 6rem;
    object-fit: cover;
    min-width: 4rem;
    border-radius: 3;
  }

  .card_underlineNone {
    text-decoration: none;
  }

  .card_title {
    padding: 0 0.5rem;
    color: black;
    text-decoration: none;
    font-weight: 400;
  }
`
