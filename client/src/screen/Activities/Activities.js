import React, { Component } from 'react'
import 'typeface-roboto'
import {
  Grid,
  CircularProgress,
  TextField,
  Typography
} from '@material-ui/core'
import { connect } from 'react-redux'
import ActivityGallery from './ActivityGallery'
import { fetchItineraries } from '../../store/actions/itineraryActions'
import { fetchCities } from '../../store/actions/cityActions'
import './Activities.css'

class Activities extends Component {
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
    const itineraries = this.props.itineraries
    console.log(itineraries)

    // filter function
    if (itineraries !== null) {
      let activitiesArray = []

      itineraries.forEach(itinerary => {
        if (itinerary.activities.length > 0) {
          activitiesArray.push(itinerary.activities)
        }
        console.log(activitiesArray)
      })

      let activities = activitiesArray.flat()

      console.log(activities)

      return (
        <Grid item xs={12}>
          <div>
            <form onSubmit={this.handleSubmit}>
              <TextField
                id='outlined-helperText'
                label='Search Activities by City Name..'
                defaultValue=''
                variant='outlined'
                onChange={this.handleChange}
                color='primary'
                style={{ margin: '0.2rem 0 0.2rem 0', width: '95%' }}
              />
            </form>
            <Typography
              style={{ margin: '1rem 0 .5rem 1rem', textAlign: 'start' }}
            >
              Most popular Activities
            </Typography>
          </div>
          <ActivityGallery
            string={this.state.string}
            activities={activities.sort((a, b) => (a.likes > b.likes ? -1 : 1))}

            //    {filteredItineraries
            //   .map(filteredItineraries.activities)
            //   .sort((a, b) => (a.likes > b.likes ? -1 : 1))}
          />
        </Grid>
      )
    } else {
      return (
        <div className='loader'>
          <Typography>Loading Activities...</Typography>
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

export default connect(mapStateToProps, mapDispatchToProps)(Activities)
