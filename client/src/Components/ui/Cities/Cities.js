import React from 'react'
import { Box, CircularProgress, TextField, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { fetchCities } from '../../Redux/cities/cityActions'
import { fetchItineraries } from '../../Redux/itineraries/itineraryActions'
import CityGallery from './CityGallery'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifySelf: 'center',
    width: '100%'
  },

  searchBar: {
    margin: '0.2rem 0 0.2rem 0',
    width: '95%'
  },

  text: {
    margin: '1rem 0 .5rem 1rem',
    textAlign: 'start'
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
    this.props.fetchItineraries()
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

      return (
        <Box>
          <Box className={classes.container}>
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
            <Typography className={classes.text}>
              Most popular Cities
            </Typography>
          </Box>
          <CityGallery cities={filteredCities} />
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
    itineraries: state.itineraries.itineraries,
    string: state.string
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCities: () => dispatch(fetchCities()),
    fetchItineraries: () => dispatch(fetchItineraries())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Cities))
