import React, { Component } from 'react'
import 'typeface-roboto'
import {
  Grid,
  LinearProgress,
  Typography,
  Card,
  CardMedia
} from '@material-ui/core'
import { connect } from 'react-redux'
import ItineraryGallery from './ItineraryGallery'
import { fetchCities } from '../../store/actions/cityActions'
import { fetchItineraries } from '../../store/actions/itineraryActions'

class Itinerary extends Component {
  state = {
    itineraries: null,
    activities: null,
    cities: null,
    cityName: null,
    cityImg: null,
    selectedCity: null
  }

  // fetches cities from DB
  componentDidMount () {
    const cityName = this.props.match.params.city_name
    const cities = this.props.cities.cities
    const selectedCity = cities.filter(city => city.name === cityName)
    const cityImg = selectedCity[0].img

    this.props.fetchItineraries(cityName)
    this.props.fetchCities()

    this.setState({
      cityName: cityName,
      cityImg: cityImg,
      selectedCity: selectedCity
    })
  }

  render () {
    console.log(this.state)

    const { itineraries } = this.props.itineraries
    const { cityImg } = this.state
    const { selectedCity } = this.state
    const { cityName } = this.state

    if (itineraries !== null) {
      return (
        <Grid item xs={12}>
          <div>
            <Card>
              <CardMedia
                component='img'
                alt='City Header'
                height='140'
                image={cityImg}
                title={selectedCity}
              />
            </Card>
            <Typography className='cityTitle'>{cityName}</Typography>
            <ItineraryGallery itineraries={itineraries} />
          </div>
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

const mapStateToProps = state => {
  console.log('state :', state)

  return {
    itineraries: state.itineraries,
    activities: state.activities,
    cities: state.cities
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchItineraries: cityName => dispatch(fetchItineraries(cityName)),
    fetchCities: () => dispatch(fetchCities())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)
