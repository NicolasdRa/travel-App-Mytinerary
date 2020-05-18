import React, { Component } from 'react'
import 'typeface-roboto'
import { Box, CircularProgress, TextField, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import ActivityGallery from './ActivityGallery'
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

class Activities extends Component {
  state = {
    filteredItineraries: null,
    string: '',
    activites: ''
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
    const itineraries = this.props.itineraries

    // filter function
    if (itineraries !== null) {
      let activitiesArray = []

      itineraries.forEach(itinerary => {
        if (itinerary.activities.length > 0) {
          activitiesArray.push(itinerary.activities)
        }
      })

      let activities = activitiesArray.flat()

      // .then(
      //   this.setState({
      //     activities: activities
      //   })
      // )

      return (
        <Box>
          <Box className={classes.container}>
            <form onSubmit={this.handleSubmit}>
              <TextField
                id='outlined-helperText'
                label='Search Activities by City Name..'
                defaultValue=''
                variant='outlined'
                onChange={this.handleChange}
                color='primary'
                className={classes.searchBar}
              />
            </form>
            <Typography className={classes.text}>
              Most popular Activities
            </Typography>
          </Box>
          <ActivityGallery
            string={this.state.string}
            activities={activities.sort((a, b) => (a.likes > b.likes ? -1 : 1))}

            //    {filteredItineraries
            //   .map(filteredItineraries.activities)
            //   .sort((a, b) => (a.likes > b.likes ? -1 : 1))}
          />
        </Box>
      )
    } else {
      return (
        <div className={classes.loader}>
          <Typography>Loading activities...</Typography>
          <CircularProgress color='secondary' />
        </div>
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
)(withStyles(styles)(Activities))
