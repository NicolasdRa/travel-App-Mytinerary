import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import UploadCoverImgForm from '../UploadCoverImgForm/UploadCoverImgForm'

import { selectAllCities } from '../../Redux/citiesSlice'
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

import { CategoryOptions, PriceOptions, DurationOptions } from './data'

import { useStyles } from './styles'

const CreateItineraryForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const cities = useSelector((state) => selectAllCities(state))

  // Component level state - profile info & file
  const [open, setOpen] = useState(false)
  const [itinerary, setItinerary] = useState({
    city: '',
    title: '',
    category: '',
    price: '',
    duration: '',
    details: '',
    img: '',
  })

  // Component level state - file
  const [file, setFile] = useState('')
  const [previewFile, setPreviewFile] = useState('')
  console.log(previewFile)
  // Ref needed to hide default input and functionalise custom icon  btn
  const hiddenInput = useRef(null)

  const handleClick = (e) => {
    hiddenInput.current.click()
  }

  // converts received file from child component to base 64 for preview
  useEffect( () => {
    const imageDataUrl = await readFile(file)
    setPreviewFile(imageDataUrl)
    return () => {
      setPreviewFile('')
    }
  }, [file])

  // textfield value handler
  const handleChange = (e) => {
    const { name, value } = e.target
    setItinerary({ ...itinerary, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('img', file)
    formData.append('city', itinerary.city)
    formData.append('title', itinerary.title)
    formData.append('category', itinerary.category)
    formData.append('price', itinerary.price)
    formData.append('duration', itinerary.duration)
    formData.append('details', itinerary.details)

    dispatch(addItinerary(formData))
    setOpen(false)
    setPreviewFile(null)
  }

  const loadFile = (image) => setFile(image)

  const loadPreviewFile = (dataUrl) => setPreviewFile(dataUrl)

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
            <FormControl className={classes.formControl}>
              <InputLabel id="city-label">Choose a city</InputLabel>
              <Select
                className={classes.select}
                labelId="city-label"
                name="city"
                value={itinerary.city}
                onChange={handleChange}>
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
              name="new-city"
              label="Itinerary City"
              autoComplete="current-city"
              value={itinerary.city}
              onChange={handleChange}
              className={classes.input_field}
            />
            <TextField
              required
              autoFocus
              fullWidth
              margin="dense"
              name="title"
              label="Title"
              autoComplete="current-title"
              value={itinerary.title}
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
                    name="category"
                    value={itinerary.category}
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
                    name="price"
                    value={itinerary.price}
                    onChange={handleChange}>
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
                    value={itinerary.duration}
                    onChange={handleChange}>
                    {DurationOptions.map((option, index) => (
                      <MenuItem
                        key={index}
                        id="duration"
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
              multiline
              rows={5}
              margin="dense"
              name="details"
              label="Description"
              type="details"
              autoComplete="current-details"
              value={itinerary.details}
              onChange={handleChange}
              className={classes.input_field}
            />
            <div>
              {/* <input
                style={{ display: 'none' }}
                id="customFile"
                onChange={handleChangeFile}
                type="file"
                ref={hiddenInput}
              /> */}
              {!previewFile ? (
                <UploadCoverImgForm
                  origin="itineraryForm"
                  loadFile={loadFile}
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

export default CreateItineraryForm