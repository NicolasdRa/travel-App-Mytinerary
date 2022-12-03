import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  '& > *': {
    // margin: theme.spacing(0.4),
    backgroundColor: theme.palette.secondary.main,
    boxShadow:
      '0 5px 15px -8px rgb(0 0 0 / 24%), 0 8px 10px -5px rgb(0 0 0 / 20%)',
  },

  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}))
