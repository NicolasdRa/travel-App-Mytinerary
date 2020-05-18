import React, { Component } from 'react'
import 'typeface-roboto'
import { Grid, LinearProgress } from '@material-ui/core'
import { connect } from 'react-redux'
import ItineraryGallery from './ItineraryGallery'
import { fetchCities } from '../../store/actions/cityActions'
import { fetchItineraries } from '../../store/actions/itineraryActions'
import ItineraryHeader from './ItineraryHeader'
import './Itinerary.css'

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
    this.props.fetchItineraries(cityName)
    this.props.fetchCities()

    const cityName = this.props.match.params.city_name
    const cities = this.props.cities.cities
    const selectedCity = cities.filter(city => city.name === cityName)
    const cityImg = selectedCity[0].img

    this.setState({
      cityName: cityName,
      cityImg: cityImg,
      selectedCity: selectedCity
    })
  }

  render () {
    const { cityImg } = this.state
    const { selectedCity } = this.state
    const { cityName } = this.state
    const itineraries = this.props.itineraries.itineraries
    // console.log('itineraries :', itineraries)
    if (itineraries != null) {
      if (Object.keys(itineraries).includes(cityName)) {
        const itiByCity = itineraries[cityName]
        if (itiByCity.length > 0)
          return (
            <Grid item xs={12}>
              <div className='itinerary_container'>
                {selectedCity && (
                  <ItineraryHeader
                    itineraries={itiByCity}
                    cityName={cityName}
                    cityImg={cityImg}
                    selectedCity={selectedCity}
                  />
                )}
                <ItineraryGallery
                  className='itinerary_gallery'
                  itineraries={itiByCity.sort((a, b) =>
                    a.likes > b.likes ? -1 : 1
                  )}
                />
              </div>
            </Grid>
          )
        else
          return (
            <div>
              <h1>Itineraries not found for {cityName}</h1>
            </div>
          )
      } else {
        return (
          <div>
            <LinearProgress color='secondary' />
          </div>
        )
      }
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
