import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import UploadCoverImgForm from '../UploadCoverImgForm/UploadCoverImgForm'

import { selectAllCities } from '../../Redux/citiesSlice'
import {
  selectCurrentUser,
  updateUserItineraries,
} from '../../Redux/usersSlice'
import { addItinerary } from '../../Redux/itinerariesSlice'
import { CategoryOptions, PriceOptions, DurationOptions } from './data'
import { base64StringtoFile } from '../../utils/imageUtils'

import { useForm } from '../../../hooks/useForm'
import { useStyles } from './styles'

const CreateItineraryForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const cities = useSelector((state) => selectAllCities(state))
  const { _id } = useSelector(selectCurrentUser)

  // Component level state
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState(null)
  const [previewFile, setPreviewFile] = useState(null)

  // useForm hook
  const [formValues, handleInputChange, reset] = useForm({
    city: '',
    title: '',
    category: '',
    price: '',
    duration: '',
    details: '',
    author: '',
  })

  const { city, title, category, price, duration, details } = formValues

  useEffect(() => {
    if (previewFile) {
      const file = base64StringtoFile(previewFile, 'croppedImg.png')
      setFile(file)
    }
  }, [previewFile])

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('img', file)
    formData.append('upload_preset', 'travel-app')
    formData.append('city', city)
    formData.append('title', title)
    formData.append('category', category)
    formData.append('price', price)
    formData.append('duration', duration)
    formData.append('details', details)
    formData.append('author', _id)

    dispatch(addItinerary(formData))
    dispatch(updateUserItineraries({ ...formValues, img: previewFile }))
    setOpen(false)
    reset()
    setPreviewFile(null)
  }

  const loadPreviewFile = (croppedImage) => setPreviewFile(croppedImage)

  const handleClearImage = (e) => {
    setPreviewFile(null)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const cityOptions = cities.map((city) => city.name).sort()

  return (
    <div>
      <Fab
        color="secondary"
        aria-label="add"
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
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <DialogTitle
            id="form-dialog-title"
            disableTypography
            className={classes.title}
          >
            <Typography variant="h6" color="primary">
              Create Your Itinerary
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" className={classes.subtitle}>
              Add details, a photo and submit. You can add activities from the
              itinerary page.
            </Typography>
            <FormControl className={classes.formControl}>
              <InputLabel id="city-label">Choose a city</InputLabel>
              <Select
                className={classes.select}
                labelId="city-label"
                name="city"
                value={city}
                onChange={handleInputChange}
              >
                {cityOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              required
              autoFocus
              fullWidth
              margin="dense"
              name="title"
              label="Title"
              autoComplete="current-title"
              value={title}
              onChange={handleInputChange}
              className={classes.input_field}
            />
            <Grid item container className={classes.price_duration}>
              <Grid item xs={12} sm={4} container>
                <FormControl className={classes.formControl}>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    className={classes.select}
                    labelId="category-label"
                    name="category"
                    value={category}
                    onChange={handleInputChange}
                  >
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
                    name="price"
                    value={price}
                    onChange={handleInputChange}
                  >
                    {PriceOptions.map((option, index) => (
                      <MenuItem key={index} id="price" value={option}>
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
                    name="duration"
                    value={duration}
                    onChange={handleInputChange}
                  >
                    {DurationOptions.map((option, index) => (
                      <MenuItem
                        key={index}
                        id="duration"
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
              multiline
              rows={3}
              margin="dense"
              name="details"
              label="Description"
              type="details"
              autoComplete="current-details"
              value={details}
              onChange={handleInputChange}
              className={classes.input_field}
            />
            <div>
              {!previewFile ? (
                <UploadCoverImgForm
                  origin="itineraryForm"
                  loadPreviewFile={loadPreviewFile}
                />
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
                    color="primary"
                    className={classes.clearButton}
                  >
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

export default CreateItineraryForm
