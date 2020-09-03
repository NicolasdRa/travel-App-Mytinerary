import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import FormHelperText from '@material-ui/core/FormHelperText'
import { addItinerary } from '../../Redux/itineraries/itineraryActions'
import { clearErrors } from '../../Redux/error/errorActions'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  title: {
    margin: '1.5rem 0 0 0',
    padding: 0,
    textAlign: 'center'
  },

  subtitle: {
    margin: '2.5rem 0 0 0 ',
    padding: 0,
    textAlign: 'center'
  },

  input_field: {
    margin: '.8rem 0'
  },

  text: {
    marginTop: '1rem',
    textAlign: 'center'
  },

  submit_button: {
    display: 'flex',
    margin: '1rem 0',
    padding: '.8rem'
  },

  btns: {
    paddingLeft: '1rem'
  },

  formControl: {
    margin: theme.spacing(1)
  },

  price_duration: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  photo_icon: {
    height: '3rem',
    width: '3rem'
  },

  add_btn: {
    position: 'fixed',
    bottom: '4rem',
    right: '1.5rem',
    zIndex: '1000'
  }
})

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

class AddItinerary extends Component {
  state = {
    open: false,
    fullWidth: true,
    maxWidth: 'sm',
    isAuthenticated: false,
    msg: null,
    newItinerary: {
      city: '',
      title: '',
      img: '',
      duration: '',
      price: '',
      category: [],
      details: '',
      activities: []
    },
    selectedImg: null
  }

  componentDidUpdate (prevProps) {
    const { errors } = this.props
    if (errors !== prevProps.errors)
      if (errors.id === 'POSTING_ERROR') {
        // Check for login Errors
        this.setState({ msg: errors.msg.msg })
      } else {
        this.setState({ msg: null })
      }
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  handleChange = e => {
    const { type, id, value, files } = e.target
    const { newItinerary } = this.state

    type === 'file'
      ? this.setState({
          selectedImg: files[0]
        })
      : this.setState({ ...newItinerary, [id]: value })
  }

  handleImgUpload = () => {}

  handleSubmit = e => {
    e.preventDefault()
    this.handleClose()

    const { newItinerary } = this.state
    this.props.addItinerary(newItinerary)

    const formData = new FormData({
      // city,
      // title,
      // details,
      // category,
      // duration,
      // price
    })
    formData.append('file', this.state.selectedImg)
    console.log(
      'Your Itinerary has been submitted and this image has been uploaded: ' +
        this.state.selectedImg
    )
  }

  clearState = e => {
    e.preventDefault()
    this.setState({
      [e.target.id]: ''
    })
  }

  handleToggle = () => {
    this.setState({
      open: !this.setState.open
    })
  }

  render () {
    const { classes } = this.props
    const errors = this.state.msg
    const { open } = this.state
    const {
      city,
      title,
      img,
      duration,
      price,
      category,
      details,
      activities
    } = this.state

    const handleClickOpen = () => {
      this.setState({
        open: true
      })
    }

    return (
      <div>
        <Fab
          color='secondary'
          aria-label='add'
          onClick={handleClickOpen}
          className={classes.add_btn}
        >
          <AddIcon />
        </Fab>
        <Dialog
          //   TransitionComponent={Transition}
          //   keepMounted
          open={open}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <form onSubmit={this.handleSubmit}>
            <DialogTitle
              id='form-dialog-title'
              disableTypography
              className={classes.title}
            >
              <Typography variant='body2'>Add Your New Itinerary</Typography>
            </DialogTitle>
            <DialogContent>
              <TextField
                required
                autoFocus
                fullWidth
                margin='dense'
                id='city'
                label='Itinerary City'
                type='city'
                autoComplete='current-city'
                value={city}
                onChange={this.handleChange}
                className={classes.input_field}
              />
              <TextField
                required
                autoFocus
                fullWidth
                margin='dense'
                id='title'
                label='Title'
                type='title'
                autoComplete='current-title'
                value={title}
                onChange={this.handleChange}
                className={classes.input_field}
              />
              <TextField
                required
                autoFocus
                fullWidth
                margin='dense'
                id='details'
                label='Description'
                type='details'
                autoComplete='current-details'
                value={details}
                onChange={this.handleChange}
                className={classes.input_field}
              />
              <Box className={classes.price_duration}>
                <FormControl className={classes.formControl}>
                  <InputLabel id='demo-simple-select-helper-label'>
                    Category
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-helper-label'
                    id='category'
                    value={category}
                    onChange={this.handleChange}
                  >
                    <MenuItem value={'Arts & Culture'}>Arts & Culture</MenuItem>
                    <MenuItem value={'Popular Attractions'}>
                      Popular Attractions
                    </MenuItem>
                    <MenuItem value={'Pubs & Bars'}>Pubs & Bars</MenuItem>
                    <MenuItem value={'Food & Nightlife'}>
                      Food & Nightlife
                    </MenuItem>
                    <MenuItem value={'Tours & Sightseeing'}>
                      Tours & Sightseeing
                    </MenuItem>
                    <MenuItem value={'Spa & Wellness'}>Spa & Wellness</MenuItem>
                    <MenuItem value={'Sports & Outdoors'}>
                      Sports & Outdoors
                    </MenuItem>
                    <MenuItem value={'Nature & Wildlife'}>
                      Nature & Wildlife
                    </MenuItem>
                    <MenuItem value={'Unique Experiences'}>
                      Unique Experiences
                    </MenuItem>
                  </Select>
                  <FormHelperText>Choose category</FormHelperText>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel id='demo-simple-select-helper-label'>
                    Price
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-helper-label'
                    id='price'
                    value={price}
                    onChange={this.handleChange}
                  >
                    <MenuItem value={'€'}>€</MenuItem>
                    <MenuItem value={'€€'}>€€</MenuItem>
                    <MenuItem value={'€€€'}>€€€</MenuItem>
                  </Select>
                  <FormHelperText>Choose price</FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel id='demo-simple-select-helper-label'>
                    Duration
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-helper-label'
                    id='duration'
                    value={duration}
                    onChange={this.handleChange}
                  >
                    <MenuItem value={'0h 30m'}>0h 30m</MenuItem>
                    <MenuItem value={'1h 00m'}>1h 00m</MenuItem>
                    <MenuItem value={'1hs 30m'}>1hs 30m</MenuItem>
                    <MenuItem value={'2hs 00m'}>2hs 00m</MenuItem>
                    <MenuItem value={'2hs 30m'}>2hs 30m</MenuItem>
                    <MenuItem value={'3hs 00m'}>3hs 00m</MenuItem>
                    <MenuItem value={'3hs 30m'}>3hs 30m</MenuItem>
                    <MenuItem value={'4hs 00m'}>4hs 00m</MenuItem>
                    <MenuItem value={'4hs 30m'}>4hs 30m</MenuItem>
                    <MenuItem value={'5hs 00m'}>5hs 00m</MenuItem>
                    <MenuItem value={'5hs 30m'}>5hs 30m</MenuItem>
                    <MenuItem value={'6hs 00m'}>6hs 00m</MenuItem>
                    <MenuItem value={'6hs 30m'}>6hs 30m</MenuItem>
                    <MenuItem value={'7hs 00m'}>7hs 00m</MenuItem>
                    <MenuItem value={'7hs 30m'}>7hs 30m</MenuItem>
                    <MenuItem value={'8hs 00m'}>8hs 00m</MenuItem>
                    <MenuItem value={'12hs 00m'}>12hs 00m</MenuItem>
                    <MenuItem value={'+ de 12hs 00m'}>+ de 12hs 00m</MenuItem>
                  </Select>
                  <FormHelperText>Choose Duration</FormHelperText>
                </FormControl>
              </Box>
              <input type='file' onChange={this.handleChange} />
              <IconButton>
                <AddAPhotoIcon
                  color='secondary'
                  className={classes.photo_icon}
                />
              </IconButton>

              <DialogContentText className={classes.text}>
                <Typography variant='body2'>
                  By proceeding you agree to Mytinerary’s Privacy Policy, User
                  Agreement and T&Cs.
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.btns}>
              <Button onClick={this.handleClose} color='primary'>
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} color='secondary'>
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    authError: state.auth.error,
    isAuthenticated: state.isAuthenticated,
    errors: state.errors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItinerary: newItinerary => dispatch(addItinerary(newItinerary)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddItinerary))
