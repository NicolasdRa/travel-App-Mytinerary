import React, { Component } from 'react'
import 'typeface-roboto'
import { Box, CircularProgress, TextField, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import ItineraryGallery from './ItineraryGallery'
import { fetchItineraries } from '../../store/actions/itineraryActions'
import { fetchCities } from '../../store/actions/cityActions'
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
    flexDirection: 'column'
  }
})

class Itineraries extends Component {
  state = {
    filteredItineraries: null,
    string: ''
  }

  // fetches itineraries & cities from DB
  componentDidMount () {
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
    const { itineraries } = this.props

    // filter conditional
    if (itineraries !== null) {
      let filteredItineraries = [
        ...itineraries.filter(itinerary => {
          return itinerary.city.toLowerCase().startsWith(this.state.string)
        })
      ]

      return (
        <Box>
          <Box className={classes.container}>
            <form onSubmit={this.handleSubmit}>
              <TextField
                id='outlined-helperText'
                label='Search Itineraries by City Name..'
                defaultValue=''
                variant='outlined'
                onChange={this.handleChange}
                color='primary'
                className={classes.searchBar}
              />
            </form>
            <Typography className={classes.text}>
              Most popular Itineraries
            </Typography>
          </Box>
          <ItineraryGallery
            string={this.state.string}
            itineraries={filteredItineraries.sort((a, b) =>
              a.likes > b.likes ? -1 : 1
            )}
          />
        </Box>
      )
    } else {
      return (
        <Box className={classes.loader}>
          <Typography>Loading itineraries...</Typography>
          <CircularProgress color='secondary' />
        </Box>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    itineraries: state.itineraries.itineraries
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchItineraries: () => dispatch(fetchItineraries()),
    fetchCities: () => dispatch(fetchCities())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Itineraries))
