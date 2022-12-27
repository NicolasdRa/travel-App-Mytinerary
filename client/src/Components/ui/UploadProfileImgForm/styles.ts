import { Dialog } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')`
  .photoIconContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }

  .photo_icon {
    height: 5rem;
    width: 5rem;
  }
`

export const StyledDialog = styled(Dialog)`
  .MuiDialogContent-root {
    padding-bottom: 0px !important;
  }

  .title {
    font-size: 1rem;
    text-align: center;
  }

  .previewContainer {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .btns {
    padding-left: 1rem;
  }
`
