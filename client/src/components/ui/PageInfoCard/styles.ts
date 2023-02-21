import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  align-items: space-between;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  padding: 0 0.8rem;
  width: 100vw;

  ${(props) => props.theme.breakpoints.up('md')} {
    padding: 0.5rem 0 0 0;
    width: 80vw;
  }

  ${(props) => props.theme.breakpoints.up('lg')} {
    width: 70vw;
  }

  .top-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 0.8rem;
  }

  .topRight-container {
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 40%;
  }

  .overline {
    display: flex;
    flex-direction: row;
    font-size: 0.7rem;
    justify-content: flex-start;
  }

  .likes {
    height: 1.5rem;
  }

  .info {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .infoLeft {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .infoRight {
    align-self: flex-end;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 40%;
  }

  .description-desktop {
    display: none;

    ${(props) => props.theme.breakpoints.up('lg')} {
      align-self: flex-start;
      display: block;
      justify-self: flex-end;
      text-align: left;
    }
  }

  .description-title {
    font-size: 0.9rem;
    font-weight: bold;

    ${(props) => props.theme.breakpoints.up('md')} {
      font-size: 1rem;
    }
  }

  .title {
    display: flex;
    flex-direction: row;
    flex: 0 0 auto;
    justify-content: flex-start;
  }

  .rating-container {
    display: flex;
    flex-direction: row;
    margin-left: -1rem;
  }

  .rating-number {
    margin-left: 0.5rem;
  }

  .extra-info {
    display: flex;
    justify-content: space-between;
  }

  .user-info {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .avatar {
    height: 1.5rem;
    margin-right: 0.5rem;
    width: 1.5rem;
  }

  .price-time {
    align-items: center;
    display: flex;
    margin-left: auto;
    padding: 0;
  }

  .icons {
    color: grey;
    font-size: 1rem;
    margin-right: 0.2rem;
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
    margin-bottom: 1rem;
    margin-top: 1rem;
  }

  .description-mobile {
    text-align: left;

    ${(props) => props.theme.breakpoints.up('md')} {
      display: none;
    }
  }
`
