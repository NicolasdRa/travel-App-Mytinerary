import React from 'react'
import {
  Box,
  CircularProgress,
  TextField,
  Typography,
  Paper
} from '@material-ui/core'
import { connect } from 'react-redux'
import { fetchCities } from '../../Redux/cities/cityActions'
import CityGallery from './CityGallery'
import { withStyles } from '@material-ui/core/styles'
import ListingHeader from '../Headers/ListingHeader'

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifySelf: 'center'
  },

  searchbarContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: theme.palette.common.beigeLight,
    opacity: '1',
    // borderStyle: 'solid',
    // borderColor: theme.palette.primary.light,
    // border: '1px',
    borderRadius: '5px',
    padding: '1rem 1.5rem',
    margin: '-.2rem -.5rem 0 -.5rem'
  },

  searchBarTitle: {
    color: theme.palette.primary.main,
    fontSize: '1rem',
    fontWeight: '300',
    textAlign: 'left',
    margin: '.5rem .5rem .7rem .5rem'
  },

  searchBar: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '8px'
  },

  subtitle: {
    margin: '1.7rem auto .5rem 1.5rem',
    textAlign: 'start'
  },

  galleryContainer: {
    display: 'flex',
    width: 'auto',
    overflowX: 'auto'
  },

  loader: {
    display: 'flex',
    flexDirection: 'column',
    margin: '5rem 5rem'
  }
})

class Cities extends React.Component {
  state = {
    filteredCities: null,
    string: ''
  }

  // fetches cities from DB
  componentDidMount () {
    this.props.fetchCities()
  }

  handleChange = e => {
    // updates string in state
    this.setState({
      string: e.target.value.toLowerCase()
    })
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  render () {
    const { classes } = this.props
    const { cities } = this.props

    // filter function
    if (cities !== null) {
      let filteredCities = [
        ...cities.filter(city => {
          return city.name.toLowerCase().startsWith(this.state.string)
        })
      ]

      function generateRandomInteger (min, max) {
        return Math.floor(min + Math.random() * (max + 1 - min))
      }

      const randomNumber = generateRandomInteger(0, cities.length)
      const city =
        filteredCities === null ? cities[randomNumber] : filteredCities[0]
      // const city = cities[randomNumber]

      return (
        <Box>
          <Box className={classes.container}>
            <ListingHeader city={city} className={classes.header} />
            <Paper elevation={2} className={classes.searchbarContainer}>
              <Typography className={classes.searchBarTitle}>
                Choose your destination
              </Typography>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  id='outlined-helperText'
                  label='Search City..'
                  defaultValue=''
                  variant='outlined'
                  onChange={this.handleChange}
                  color='primary'
                  className={classes.searchBar}
                />
              </form>
            </Paper>
            <Typography variant='subtitle2' className={classes.subtitle}>
              Most popular Cities
            </Typography>
          </Box>
          <Box className={classes.galleryContainer}>
            <CityGallery cities={filteredCities} />
          </Box>
        </Box>
      )
    } else {
      return (
        <Box className={classes.loader}>
          <Typography>Loading cities...</Typography>
          <CircularProgress color='secondary' />
        </Box>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    cities: state.cities.cities,
    string: state.string
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCities: () => dispatch(fetchCities())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Cities))
