import React, { Component } from 'react'
import 'typeface-roboto'
import { Grid, LinearProgress, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { fetchItineraries } from '../../store/actions/itineraryActions'
import ItineraryCityHeader from './ItineraryCityHeader'
import ItineraryGallery from './ItineraryGallery'
// import { fetchActivities } from '../../store/actions/activityActions';

class Itinerary extends Component {
  state = {
    itineraries: null,
    activities: null,
    cityName: null
  }

  componentDidMount () {
    this.props.fetchItineraries()
    // this.props.fetchActivities();
  }

  render () {
    const { itineraries } = this.props.itineraries
    // // const { activities } = this.props.activities

    if (itineraries !== null) {
      return (
        <Grid item xs={12}>
          <div>
            <h4> {this.state.cityName} </h4> <ItineraryCityHeader />
            <Typography> Available Itineraries </Typography>{' '}
            <ItineraryGallery itineraries={itineraries} />{' '}
          </div>{' '}
        </Grid>
      )
    } else {
      return (
        <div>
          <LinearProgress color='secondary' />
        </div>
      )
    }
  }
}

console.log(this.state)

const mapStateToProps = (state, ownProps) => {
  let cityName = ownProps.match.params.city_name

  return {
    cityName: state.cities.find(cities => cities.name === cityName),
    itineraries: state.itineraries,
    activities: state.activities
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchItineraries: () => dispatch(fetchItineraries())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)
