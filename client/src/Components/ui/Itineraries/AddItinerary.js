import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  Select,
  TextField,
  Typography
} from '@material-ui/core'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import { addItinerary } from '../../Redux/itineraries/itineraryActions'
import { clearErrors } from '../../Redux/error/errorActions'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
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

  formControl: {
    display: 'flex',
    justifySelf: 'space-between',
    minWidth: '30%'
  },

  // select: {
  //   minWidth: '3rem'
  // },

  submit_button: {
    display: 'flex',
    margin: '1rem 0',
    padding: '.8rem'
  },

  btns: {
    paddingLeft: '1rem'
  },

  // price_duration: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'space-around'
  // },

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
}))

const AddItinerary = ({ addItinerary }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [newItinerary, setNewItinerary] = useState({
    city: '',
    title: '',
    category: '',
    price: '',
    duration: '',
    details: '',
    img: ''
  })
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  // const [category, setCategory] = useState(null)

  const { city, title, category, price, duration, details, img } = newItinerary

  console.log(city)
  console.log(title)
  console.log(category)
  console.log(price)
  console.log(duration)
  console.log(details)

  const types = ['image/png', 'image/jpeg']

  const handleChange = e => {
    const { id, value, files } = e.target

    // let selectedImg
    // files !== null ? (selectedImg = files[0]) : (selectedImg = null)

    setNewItinerary(prevState => ({ ...prevState, [id]: value }))
    // setCategory(e.target.value)

    // if (selectedImg && types.includes(selectedImg.type)) {
    //   setFile(selectedImg)
    //   setError(null)
    // } else {
    //   setFile(null)
    //   setError('Please select a valid image type (.png or .jpeg)')
    // }
  }

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('file', file)

    addItinerary(formData)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const CategoryOptions = [
    'Arts & Culture',
    'Popular Attractions',
    'Pubs & Bars',
    'Food & Nightlife',
    'Tours & Sightseeing',
    'Spa & Wellness',
    'Sports & Outdoors',
    'Nature & Wildlife',
    'Unique Experiences'
  ]
  const PriceOptions = ['€', '€€', '€€€']
  const DurationOptions = [
    '0,5',
    '1',
    '1.5',
    '2',
    '2.5',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '12',
    '+ 12'
  ]

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
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <form onSubmit={handleSubmit}>
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
              onChange={handleChange}
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
              onChange={handleChange}
              className={classes.input_field}
            />
            <Grid item container className={classes.price_duration}>
              <Grid item xs={4} container>
                <FormControl className={classes.formControl}>
                  <InputLabel id='category-label'>Category</InputLabel>
                  <Select
                    className={classes.select}
                    labelId='category-label'
                    id='category'
                    value={category}
                    onChange={handleChange}
                  >
                    {CategoryOptions.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                        {console.log(option)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4} container>
                <FormControl className={classes.formControl}>
                  <InputLabel id='price-label'>Price</InputLabel>
                  <Select
                    className={classes.select}
                    labelId='price-label'
                    id='price'
                    value={price}
                    onChange={handleChange}
                  >
                    {PriceOptions.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4} container>
                <FormControl className={classes.formControl}>
                  <InputLabel id='duration-label'>Duration</InputLabel>
                  <Select
                    className={classes.select}
                    labelId='duration-label'
                    id='duration'
                    value={duration}
                    onChange={handleChange}
                  >
                    {DurationOptions.map((option, index) => (
                      <MenuItem
                        key={index}
                        value={`${option}hs`}
                      >{`${option}hs`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
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
              onChange={handleChange}
              className={classes.input_field}
            />
            <Box>
              <input type='file' onChange={handleChange} />
              <IconButton>
                <AddAPhotoIcon
                  color='secondary'
                  className={classes.photo_icon}
                />
              </IconButton>
              <Box className='output'>
                {error && <Box className='error'>{error}</Box>}
                {file && <Box className='file'>{file.name}</Box>}
              </Box>
            </Box>

            <DialogContentText className={classes.text}>
              {/* <Typography variant='body2'> */}
              By proceeding you agree to Mytinerary’s Privacy Policy, User
              Agreement and T&Cs.
              {/* </Typography> */}
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.btns}>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleSubmit} color='secondary'>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default connect(null, { addItinerary })(AddItinerary)
