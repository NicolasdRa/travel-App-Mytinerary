import React from 'react'
import 'typeface-roboto'
import { Grid, LinearProgress } from '@material-ui/core'
import CityGallery from '../CityGallery/CityGallery'
import TextField from '@material-ui/core/TextField'
import './Cities.css'
import { connect } from 'react-redux'
import { fetchCities } from '../../store/actions/cityActions'

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
    const cities = this.props.cities

    // filter function
    if (cities !== null) {
      let filteredCities = [
        ...cities.filter(city => {
          return city.name.toLowerCase().startsWith(this.state.string)
        })
      ]

      return (
        <Grid item xs={12}>
          <div>
            <form onSubmit={this.handleSubmit}>
              <TextField
                id='standard-name'
                label='Search City'
                defaultValue={''}
                onChange={this.handleChange}
              />
            </form>
          </div>

          <CityGallery cities={filteredCities} />
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
  return {
    cities: state.cities.cities
    // string: state.string
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCities: () => dispatch(fetchCities())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities)
