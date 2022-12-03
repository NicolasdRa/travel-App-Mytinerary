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

  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 1.5rem 1rem 0 1rem;
    padding: 0 1rem 0 0;
  }

  .city_title {
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    text-align: left;
    margin-left: 1rem;
  }

  .subtitle {
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    text-align: left;
    margin-left: 1rem;
  }

  .gallery {
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    text-align: left;
    margin-top: 1.5rem;
  }
`
