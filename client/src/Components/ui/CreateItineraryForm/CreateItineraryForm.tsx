import { useState, useEffect } from 'react'

import {
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
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import UploadCoverImgForm from '../UploadCoverImgForm/UploadCoverImgForm'

import { selectAllCities } from '../../Redux/citiesSlice'
import { updateUserItineraries } from '../../Redux/usersSlice'
import { addItinerary } from '../../Redux/itinerariesSlice'
import { CategoryOptions, PriceOptions, DurationOptions } from './data'
import { base64StringtoFile } from '../../utils/imageUtils'

import { useForm } from '../../../hooks/useForm'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import { User } from '../../../@types/types'
import { StyledContainer } from './styles'

interface CreateItineraryFormProps {
  currentUser: User
}

export const CreateItineraryForm: React.FC<CreateItineraryFormProps> = ({
  currentUser,
}) => {
  const dispatch = useAppDispatch()

  const cities = useAppSelector((state) => selectAllCities(state))

  // Component level state
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<string | Blob>('')
  const [previewFile, setPreviewFile] = useState(null)

  // useForm hook
  const {
    values: formValues,
    handleInputChange,
    reset,
  } = useForm({
    city: '',
    title: '',
    category: '',
    price: 0,
    duration: 1,
    details: '',
  })

  const { city, title, category, price, duration, details } = formValues
  const { _id } = currentUser

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

  const cityOptions = cities.map((city) => city.name).sort()

  return (
    <StyledContainer>
      <Fab
        color="secondary"
        aria-label="add"
        onClick={handleClickOpen}
        className="add_btn"
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
          <DialogTitle id="form-dialog-title" className="title">
            <Typography variant="h6" color="primary">
              Create Your Itinerary
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" className="subtitle">
              Add details, a photo and submit. You can add activities from the
              itinerary page.
            </Typography>
            <FormControl className="formControl">
              <InputLabel id="city-label">Choose a city</InputLabel>
              <Select
                className="select"
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
              className="input_field"
            />
            <Grid item container className="price_duration">
              <Grid item xs={12} sm={4} container>
                <FormControl className="formControl">
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    className="select"
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
                <FormControl className="formControl">
                  <InputLabel id="price-label">Price</InputLabel>
                  <Select
                    className="select"
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
                <FormControl className="formControl">
                  <InputLabel id="duration-label">Duration</InputLabel>
                  <Select
                    className="select"
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
      </Dialog>
    </StyledContainer>
  )
}
