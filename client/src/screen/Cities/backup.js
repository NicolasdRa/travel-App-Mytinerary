import React from 'react';
import 'typeface-roboto';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import CityGallery from '../CityGallery/CityGallery';
import './Cities.css';
import SearchBar from '../../Components/SearchBar/SearchBar';


export default class Cities extends React.Component {

  state = {cities: [], }
  
  // fetches cities from DB
  componentDidMount() {
  axios.get('http://localhost:5000/cities/all')
    .then(res => { 
      this.setState({
        cities: res.data
      })
   })  
  }

  // retrieves filter values and converts to string taking parameter from searchBar
  cityFilter = (filterString) => { 
    let string = filterString.string
    console.log(string)
  
   // filter function    
    let filteredCities = [...this.state.cities.filter(city => { 
    return city.name.toLowerCase().match(string)    
        })]
  
  // sets state with filtered cities      
      this.setState({
      cities: filteredCities              
      });  
    }


  render() {  

    return (
        <Grid item xs={12}>
          <div>
              <SearchBar filterString={this.cityFilter} /> 
          </div>
          <CityGallery cities={this.state.cities} />
        </Grid>
      );
    }
  }

//'https://mern-ubiqum-v2.herokuapp.com/cities/all' // MERN DB para desarrollo solo frontend