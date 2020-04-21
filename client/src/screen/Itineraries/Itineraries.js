import React, { Component } from 'react'
// import { compose } from 'redux'
import 'typeface-roboto'
import {
  Grid,
  CircularProgress,
  TextField,
  Typography
} from '@material-ui/core'
import { connect } from 'react-redux'
import ItineraryGallery from './ItineraryGallery'
import { fetchItineraries } from '../../store/actions/itineraryActions'
import { fetchCities } from '../../store/actions/cityActions'
// import { withStyles, createStyles } from '@material-ui/core/styles'
// import './Itineraries.css'

// const useStyles = () =>
//   createStyles({
//     gallery: {
//       marginBottom: '10rem'
//     }
//   })

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
    const { itineraries } = this.props

    // filter conditional
    if (itineraries !== null) {
      let filteredItineraries = [
        ...itineraries.filter(itinerary => {
          return itinerary.city.toLowerCase().startsWith(this.state.string)
        })
      ]

      return (
        <Grid item xs={12}>
          <div>
            <form onSubmit={this.handleSubmit}>
              <TextField
                id='outlined-helperText'
                label='Search Itineraries by City Name..'
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
              Most popular Itineraries
            </Typography>
          </div>
          <ItineraryGallery
            string={this.state.string}
            itineraries={filteredItineraries.sort((a, b) =>
              a.likes > b.likes ? -1 : 1
            )}
          />
        </Grid>
      )
    } else {
      return (
        <div className='loader'>
          <Typography>Loading itineraries...</Typography>
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

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withStyles(useStyles)(Itineraries))

// // This one works but doesnt read styles
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withStyles(useStyles)(Itineraries))

// // // This one works
// export default compose(
//   withStyles(useStyles),
//   connect(mapStateToProps, mapDispatchToProps)
// )(Itineraries)

export default connect(mapStateToProps, mapDispatchToProps)(Itineraries)
