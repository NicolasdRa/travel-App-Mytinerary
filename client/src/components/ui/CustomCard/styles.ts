import { Card } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  margin: 0;
  min-width: 240px;
  max-width: 100%;
  width: 100%;
  overflow: visible;
  border-radius: 10px !important;
  justify-self: start;
  
  /* Ensure consistent card heights */
  min-height: 280px;

  ${(props) => props.theme.breakpoints.up('md')} {
    max-width: 280px;
    min-height: 300px;

    :hover {
      box-shadow: 0 1px 1px rgb(0 0 0 / 5%), 0 2px 2px rgb(0 0 0 / 5%),
        0 4px 4px rgb(0 0 0 / 5%), 0 6px 8px rgb(0 0 0 / 5%),
        0 8px 16px rgb(0 0 0 / 5%);
      transform: translateY(-0.8%);
      transition: transform 0.13s ease-in-out;
    }
  }

  .cardImg {
    height: 160px;
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    border-radius: 10px 10px 0 0 !important;
    contain: layout style;
  }

  .cardContent {
    text-align: start;
    padding: 4px 10px 2px 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    
    ${(props) => props.theme.breakpoints.up('md')} {
      padding: 6px 12px 4px 12px;
    }
  }

  .firstLine {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2px;
    min-height: 16px; /* Ensure consistent height */
  }

  .title {
    font-weight: 500;
    text-transform: capitalize;
    line-height: 1.2;
    font-size: 0.95rem;
    margin: 0;
    flex: 1;
    margin-right: 8px;
    
    /* Handle long titles with syllabic wrapping */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    
    /* Syllabic hyphenation */
    hyphens: auto;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    hyphenate-limit-chars: 6 3 3;
    hyphenate-limit-lines: 2;
    hyphenate-limit-last: always;
    word-wrap: break-word;
    overflow-wrap: break-word;
    
    ${(props) => props.theme.breakpoints.up('md')} {
      font-size: 1.1rem;
      line-height: 1.3;
      -webkit-line-clamp: 2;
    }
  }

  .likesBtn {
    margin-top: 0;
    flex-shrink: 0;
  }

  .subheader {
    text-align: left;
    font-size: 0.75rem;
    margin: 0;
    line-height: 1.3;
    
    ${(props) => props.theme.breakpoints.up('md')} {
      font-size: 0.85rem;
    }
  }

  .avatar {
    background-color: ${(props) => props.theme.palette.secondary.main};
    height: 1rem;
    width: 1rem;
    align-self: flex-start;
  }

  .authorInfo {
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .authorName {
    margin: 0 0 0 5px;
    font-size: 0.7rem;
    line-height: 1.2;
    
    ${(props) => props.theme.breakpoints.up('md')} {
      font-size: 0.75rem;
    }
  }


  .duration {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 0.7rem;
    margin-right: 0.8rem;
    
    ${(props) => props.theme.breakpoints.up('md')} {
      font-size: 0.75rem;
      margin-right: 1rem;
    }
  }

  .price {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 0.7rem;
    
    ${(props) => props.theme.breakpoints.up('md')} {
      font-size: 0.75rem;
    }
  }

  .icons {
    height: 0.8rem;
    width: 0.8rem;
    fill: grey;
    margin-right: 3px;
  }

  .infoText {
    font-size: 0.7rem;
    
    ${(props) => props.theme.breakpoints.up('md')} {
      font-size: 0.75rem;
    }
  }

  .cardActions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 0;
    padding: 0.2rem 0.5rem 0.5rem 0;
    flex-shrink: 0;
    
    ${(props) => props.theme.breakpoints.up('md')} {
      padding: 0.3rem 0.8rem 0.8rem 0;
    }
  }

  .bottom-content {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    min-height: 24px;
  }

  .additionalInfo {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    margin-left: auto;
  }

  .textBtn {
    margin: 0;
    font-weight: 400;
    font-size: 0.75rem;
    padding: 4px 8px;
    min-height: 28px;
    
    ${(props) => props.theme.breakpoints.up('md')} {
      font-size: 0.85rem;
      padding: 6px 12px;
      min-height: 32px;
    }
  }
`
