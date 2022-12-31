import { useState, useEffect } from 'react'

import {
  Backdrop,
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { UploadCoverImgForm } from '../UploadCoverImgForm/UploadCoverImgForm'

import { updateUserItineraries } from '../../../redux/usersSlice'
import {
  addItinerary,
  selectItinerariesByUserId,
} from '../../../redux/itinerariesSlice'
import { categoryOptions, priceOptions, durationOptions } from './data'
import { base64StringtoFile } from '../../../utils/imageUtils'

import { useForm } from '../../../hooks/useForm'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { City, Itinerary, User } from '../../../@types/types'
import { StyledDialog, StyledMainContainer } from './styles'
import { selectAllCities } from '../../../redux/citiesSlice'
import { CustomDial } from '../../ui/CustomDial/CustomDial'
import { toggleAddItemForm } from '../../../redux/uiSlice'
import { addActivity } from '../../../redux/activitiesSlice'
import { theme } from '../../../theme/Theme'

interface CreateItemFormProps {
  currentUser: User
}

export const CreateItemForm: React.FC<CreateItemFormProps> = ({
  currentUser,
}) => {
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch = useAppDispatch()

  const backdropOpen = useAppSelector((state) => state.ui.backdrop.open)

  // handle form open & type state
  const open = useAppSelector((state) => state.ui.forms.addItemForm.open)
  const type = useAppSelector((state) => state.ui.forms.addItemForm.type)

  // Component level state
  const [file, setFile] = useState<string | Blob>('')
  const [previewFile, setPreviewFile] = useState(null)
  const [cityOptions, setCityOptions] = useState<City[]>([])
  const [itineraryOptions, setItineraryOptions] = useState<Itinerary[]>([])

  const cities = useAppSelector<City[]>(selectAllCities)
  const itineraries = useAppSelector<Itinerary[]>((state) =>
    selectItinerariesByUserId(state, currentUser._id)
  )

  // useForm hook
  const {
    values: formValues,
    handleInputChange,
    reset,
  } = useForm({
    city: '',
    itinerary: '',
    title: '',
    category: '',
    price: '€',
    duration: '0.5',
    details: '',
  })

  const { itinerary, city, title, category, price, duration, details } =
    formValues
  const { _id: userId } = currentUser

  // handles city options
  useEffect(() => {
    if (cities.length > 0) {
      setCityOptions(cities)
    }
  }, [])

  // handles itinerary options based on city selection
  useEffect(() => {
    if (itineraries.length > 0) {
      const filterUserItinerariesByCity = itineraries.filter(
        (item) => item.cityName === city
      )
      setItineraryOptions(filterUserItinerariesByCity)
    }
  }, [city, itineraries])

  // handles preview file
  useEffect(() => {
    if (previewFile) {
      const file = base64StringtoFile(previewFile, 'croppedImg.png')
      setFile(file)
    }
  }, [previewFile])

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const formData = new FormData()

    if (type === 'itinerary') {
      formData.append('img', file)
      formData.append('upload_preset', 'travel-app')
      formData.append(
        'city',
        cities.filter((item) => item.name === city)[0]._id
      )
      formData.append('cityName', city)
      formData.append('title', title)
      formData.append('category', category)
      formData.append('price', price)
      formData.append('duration', duration)
      formData.append('details', details)
      formData.append('author', userId)

      dispatch(addItinerary(formData))
      dispatch(updateUserItineraries({ ...formValues, img: previewFile }))
      dispatch(toggleAddItemForm('itinerary'))
    }

    if (type === 'activity') {
      formData.append('img', file)
      formData.append('upload_preset', 'travel-app')
      formData.append('cityName', city)
      formData.append('title', title)
      formData.append('category', category)
      formData.append('price', price)
      formData.append('duration', duration)
      formData.append('details', details)
      formData.append(
        'city',
        cities.filter((item) => item.name === city)[0]._id
      )
      itinerary &&
        formData.append(
          'itinerary',
          itineraries.filter((item) => item.title === itinerary)[0]._id
        )
      formData.append('author', userId)

      dispatch(addActivity(formData))
      dispatch(toggleAddItemForm('activity'))
    }

    reset()
    setPreviewFile(null)
  }

  const loadPreviewFile = (croppedImage: any) => setPreviewFile(croppedImage)

  const handleClearImage = () => {
    setPreviewFile(null)
  }

  const handleClose = () => {
    dispatch(toggleAddItemForm(type))
    reset()
  }

  return (
    <StyledMainContainer>
      {mdDown && <Backdrop open={backdropOpen} />}
      <CustomDial />
      <StyledDialog
        //   TransitionComponent={Transition}
        //   keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Typography variant="h6" color="primary" className="title">
            Create Your {type}
          </Typography>
          <DialogContent className="content">
            <Typography variant="body2" className="subtitle">
              Add details, a photo and submit.
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
            {type === 'activity' && (
              <FormControl className="formControl">
                <TextField
                  required
                  select
                  size="small"
                  className="select"
                  label="Choose an itinerary"
                  name="itinerary"
                  value={itinerary}
                  onChange={handleInputChange}
                >
                  {itineraryOptions.map((option, index) => (
                    <MenuItem key={index} value={option.title}>
                      {option.title}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            )}
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
                    select
                    size="small"
                    className="select"
                    label="Category"
                    name="category"
                    value={category}
                    onChange={handleInputChange}
                  >
                    {categoryOptions.map((option, index) => (
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
                    select
                    size="small"
                    className="select"
                    label="Price"
                    name="price"
                    value={price}
                    onChange={handleInputChange}
                  >
                    {priceOptions.map((option, index) => (
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
                    select
                    size="small"
                    className="select"
                    label="Duration"
                    name="duration"
                    value={duration}
                    onChange={handleInputChange}
                  >
                    {durationOptions.map((option, index) => (
                      <MenuItem
                        key={index}
                        id="duration"
                        value={option}
                      >{`${option} hs`}</MenuItem>
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
