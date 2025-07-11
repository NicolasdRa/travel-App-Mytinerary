import { useState, useEffect, FormEvent } from 'react'

import {
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
import { LiveSearch } from '../../ui/LiveSearch/LiveSearch'

interface CreateItemFormProps {
  currentUser: User
}

export const CreateItemForm: React.FC<CreateItemFormProps> = ({
  currentUser,
}) => {
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch = useAppDispatch()

  // handle form open & type state
  const open = useAppSelector((state) => state.ui.forms.addItemForm.open)
  const type = useAppSelector((state) => state.ui.forms.addItemForm.type)

  // Component level state
  const [file, setFile] = useState<string | Blob>('')
  const [previewFile, setPreviewFile] = useState(null)
  // const [cityOptions, setCityOptions] = useState<City[]>([])
  const [itineraryOptions, setItineraryOptions] = useState<Itinerary[]>([])
  const [city, setCity] = useState('')
  const [selectedCity, setSelectedCity] = useState<any>(null)

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

  const { itinerary, title, category, price, duration, details } = formValues

  const { _id: userId } = currentUser

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

  const handleAutcompleteValueChange = (value: any) => {
    if (value) {
      const name = value.name
      setCity(name)
      setSelectedCity(value)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData()

    if (type === 'itinerary') {
      // Find city in local Redux store first
      const localCity = cities.find((item) => item.name === city)
      
      // If city exists in Redux store, use its ID, otherwise use the selected city data
      const cityId = localCity?._id || selectedCity?.id || ''
      
      if (!cityId) {
        alert('Please select a valid city')
        return
      }
      
      formData.append('img', file)
      formData.append('upload_preset', 'travel-app')
      formData.append('city', cityId)
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
    setCity('')
    setSelectedCity(null)
  }

  const loadPreviewFile = (croppedImage: any) => setPreviewFile(croppedImage)

  const handleClearImage = () => {
    setPreviewFile(null)
  }

  const handleClose = () => {
    dispatch(toggleAddItemForm(type))
    reset()
    setCity('')
    setSelectedCity(null)
  }

  const formIntroMessage = {
    generic: 'Add details, a photo and submit',
    city: 'Type city name and choose, add a photo and submit',
    itinerary: 'Type city name, choose city, add details, a photo and submit',
    activity:
      'Start by choosing the desired city and itinerary, complete details, add photo and submit. You can only add activities to already created itineraries. If your activity is not linked with an existent itinerary create a new itinerary first.',
  }

  return (
    <StyledMainContainer>
      <CustomDial />
      <StyledDialog
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
              {formIntroMessage[type as keyof typeof formIntroMessage]}
            </Typography>
            <FormControl className="formControl">
              <LiveSearch
                name="city"
                target="cities"
                handleAutcompleteValueChange={handleAutcompleteValueChange}
              />
            </FormControl>
            {type === 'activity' && itineraryOptions.length > 0 && (
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
            )}{' '}
            {type === 'activity' && itineraryOptions.length <= 0 && city && (
              <Typography className="warning">
                No Itineraries have been created for {city}. You must create an
                itinerary first and then add you desired activity.
              </Typography>
            )}
            {(type === 'itinerary' ||
              (type === 'activity' && itineraryOptions.length > 0)) && (
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
            )}
            {(type === 'itinerary' || type === 'activity') && (
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
            )}
            {(type === 'itinerary' || type === 'activity') && (
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
            )}
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
            <Button type="submit" color="secondary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </StyledDialog>
    </StyledMainContainer>
  )
}
