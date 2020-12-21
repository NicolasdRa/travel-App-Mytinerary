import React, { useState, useRef } from 'react'
import { connect, useDispatch } from 'react-redux'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  Select,
  TextField,
  Typography,
} from '@material-ui/core'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'

import { addItinerary } from '../../Redux/itinerariesSlice'
// import { clearErrors } from "../../Redux/error/errorActions";
import { loadCurrentUser } from '../../Redux/users/userActions'

import { useStyles } from './styles'

const CreateItineraryForm = ({ addItinerary }) => {
  const classes = useStyles()

  // Component level state - profile info & file
  const [open, setOpen] = useState(false)
  const [newItinerary, setNewItinerary] = useState({
    city: '',
    title: '',
    category: '',
    price: '',
    duration: '',
    details: '',
    img: '',
  })
  const [file, setFile] = useState(null)
  const [previewFile, setPreviewFile] = useState(null)
  // const [error, setError] = useState(null);

  const { city, title, category, price, duration, details } = newItinerary

  const dispatch = useDispatch()
  // const types = ["image/png", "image/jpeg"];

  // Ref needed to be able to hide default input and functionalise custom icon  btn
  const hiddenInput = useRef(null)

  const handleClick = (e) => {
    hiddenInput.current.click()
  }

  const handleChangeFile = (e) => {
    const fileReader = new FileReader()
    fileReader.onload = () => {
      fileReader.readyState === 2 && setPreviewFile(fileReader.result)
    }
    setFile(e.target.files[0])
    fileReader.readAsDataURL(e.target.files[0])
  }

  const handleClearImage = (e) => {
    setPreviewFile(null)
  }

  const handleChange = (e) => {
    const { id, value } = e.target

    // let selectedImg
    // files !== null ? (selectedImg = files[0]) : (selectedImg = null)

    setNewItinerary((prevState) => ({ ...prevState, [id]: value }))
    // setCategory(e.target.value)

    // if (selectedImg && types.includes(selectedImg.type)) {
    //   setFile(selectedImg)
    //   setError(null)
    // } else {
    //   setFile(null)
    //   setError('Please select a valid image type (.png or .jpeg)')
    // }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('img', file)

    addItinerary(formData)
    dispatch(loadCurrentUser())
    setOpen(false)
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
    'Unique Experiences',
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
    '+ 12',
  ]

  return (
    <div>
      <Fab
        color="secondary"
        aria-label="add"
        onClick={handleClickOpen}
        className={classes.add_btn}>
        <AddIcon />
      </Fab>
      <Dialog
        //   TransitionComponent={Transition}
        //   keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <DialogTitle
            id="form-dialog-title"
            disableTypography
            className={classes.title}>
            <Typography variant="h6" color="primary">
              Create Your Itinerary
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" className={classes.subtitle}>
              Add itinerary details, add a photo and submit. You can then add
              activities to your itinerary.
            </Typography>
            <TextField
              required
              autoFocus
              fullWidth
              margin="dense"
              id="city"
              label="Itinerary City"
              type="city"
              autoComplete="current-city"
              value={city}
              onChange={handleChange}
              className={classes.input_field}
            />
            <TextField
              required
              autoFocus
              fullWidth
              margin="dense"
              id="title"
              label="Title"
              type="title"
              autoComplete="current-title"
              value={title}
              onChange={handleChange}
              className={classes.input_field}
            />
            <Grid item container className={classes.price_duration}>
              <Grid item xs={12} sm={4} container>
                <FormControl className={classes.formControl}>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    className={classes.select}
                    labelId="category-label"
                    id="category"
                    value={category}
                    onChange={handleChange}>
                    {CategoryOptions.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} container>
                <FormControl className={classes.formControl}>
                  <InputLabel id="price-label">Price</InputLabel>
                  <Select
                    className={classes.select}
                    labelId="price-label"
                    id="price"
                    value={price}
                    onChange={handleChange}>
                    {PriceOptions.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} container>
                <FormControl className={classes.formControl}>
                  <InputLabel id="duration-label">Duration</InputLabel>
                  <Select
                    className={classes.select}
                    labelId="duration-label"
                    id="duration"
                    value={duration}
                    onChange={handleChange}>
                    {DurationOptions.map((option, index) => (
                      <MenuItem
                        key={index}
                        value={`${option}hs`}>{`${option}hs`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <TextField
              required
              autoFocus
              fullWidth
              margin="dense"
              id="details"
              label="Description"
              type="details"
              autoComplete="current-details"
              value={details}
              onChange={handleChange}
              className={classes.input_field}
            />
            <div>
              <input
                style={{ display: 'none' }}
                id="customFile"
                onChange={handleChangeFile}
                type="file"
                ref={hiddenInput}
              />
              {!previewFile ? (
                <Box className={classes.photoIconContainer}>
                  <Typography variant="body2">Add a photo</Typography>
                  <IconButton onClick={handleClick}>
                    <AddAPhotoIcon
                      color="secondary"
                      className={classes.photo_icon}
                    />
                  </IconButton>
                </Box>
              ) : (
                <Box className={classes.previewContainer}>
                  <Box className={classes.previewImgContainer}>
                    <img
                      src={previewFile}
                      alt="preview file"
                      className={classes.previewImg}
                    />
                  </Box>
                  <Button
                    onClick={handleClearImage}
                    color="tertiary"
                    className={classes.clearButton}>
                    Clear photo
                  </Button>
                </Box>
              )}
            </div>
          </DialogContent>
          <DialogActions className={classes.btns}>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="secondary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default connect(null, { addItinerary })(CreateItineraryForm)
