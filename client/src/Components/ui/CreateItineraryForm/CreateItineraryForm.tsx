import { useState, useEffect } from 'react'

import {
  Button,
  DialogActions,
  DialogContent,
  Fab,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { UploadCoverImgForm } from '../UploadCoverImgForm/UploadCoverImgForm'

import { updateUserItineraries } from '../../Redux/usersSlice'
import { addItinerary } from '../../Redux/itinerariesSlice'
import { CategoryOptions, PriceOptions, DurationOptions } from './data'
import { base64StringtoFile } from '../../utils/imageUtils'

import { useForm } from '../../../hooks/useForm'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import { City, User } from '../../../@types/types'
import { StyledDialog, StyledMainContainer } from './styles'
import { selectAllCities } from '../../Redux/citiesSlice'

interface CreateItineraryFormProps {
  currentUser: User
}

export const CreateItineraryForm: React.FC<CreateItineraryFormProps> = ({
  currentUser,
}) => {
  const dispatch = useAppDispatch()

  // Component level state
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<string | Blob>('')
  const [previewFile, setPreviewFile] = useState(null)
  const [cityOptions, setCityOptions] = useState<City[]>([])

  const cities = useAppSelector<City[]>(selectAllCities)

  // useForm hook
  const {
    values: formValues,
    handleInputChange,
    reset,
  } = useForm({
    city: '',
    title: '',
    category: '',
    price: '€',
    duration: 1,
    details: '',
  })

  const { city, title, category, price, duration, details } = formValues
  const { _id } = currentUser

  useEffect(() => {
    if (cities.length > 0) {
      setCityOptions(cities)
    }
  }, [])

  useEffect(() => {
    if (previewFile) {
      const file = base64StringtoFile(previewFile, 'croppedImg.png')
      setFile(file)
    }
  }, [previewFile])

  const handleSubmit = (e: any) => {
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

  const loadPreviewFile = (croppedImage: any) => setPreviewFile(croppedImage)

  const handleClearImage = () => {
    setPreviewFile(null)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <StyledMainContainer>
      <Fab
        color="secondary"
        aria-label="add"
        onClick={handleClickOpen}
        className="add_btn"
      >
        <AddIcon />
      </Fab>
      <StyledDialog
        //   TransitionComponent={Transition}
        //   keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Typography variant="h6" color="primary" className="title">
            Create Your Itinerary
          </Typography>
          <DialogContent className="content">
            <Typography variant="body2" className="subtitle">
              Add details, a photo and submit. You can add activities from the
              itinerary page.
            </Typography>
            <FormControl className="formControl">
              <TextField
                required
                select
                size="small"
                className="select"
                label="Choose a city"
                name="city"
                value={city}
                onChange={handleInputChange}
              >
                {cityOptions.map((option, index) => (
                  <MenuItem key={index} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            <TextField
              size="small"
              required
              autoFocus
              fullWidth
              margin="dense"
              name="title"
              label="Title"
              autoComplete="current-title"
              value={title}
              onChange={handleInputChange}
              className="input_field"
            />
            <Grid item container className="price_duration">
              <Grid item xs={12} sm={4} container>
                <FormControl className="formControl">
                  <TextField
                    required
                    size="small"
                    className="select"
                    label="Category"
                    name="category"
                    value={category}
                    onChange={handleInputChange}
                  >
                    {CategoryOptions.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={4} container>
                <FormControl className="formControl">
                  <TextField
                    required
                    size="small"
                    className="select"
                    label="Price"
                    name="price"
                    value={price}
                    onChange={handleInputChange}
                  >
                    {PriceOptions.map((option, index) => (
                      <MenuItem key={index} id="price" value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={4} container>
                <FormControl className="formControl">
                  <TextField
                    required
                    size="small"
                    className="select"
                    label="Duration"
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
                  </TextField>
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
              className="input_field"
            />
            <div>
              {!previewFile ? (
                <UploadCoverImgForm
                  origin="itineraryForm"
                  loadPreviewFile={loadPreviewFile}
                  coverImg={file}
                />
              ) : (
                <div className="previewContainer">
                  <div className="previewImgContainer">
                    <img
                      src={previewFile}
                      alt="preview file"
                      className="previewImg"
                    />
                  </div>
                  <Button
                    onClick={handleClearImage}
                    color="primary"
                    className="clearButton"
                  >
                    Clear photo
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
          <DialogActions className="btns">
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="secondary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </StyledDialog>
    </StyledMainContainer>
  )
}
