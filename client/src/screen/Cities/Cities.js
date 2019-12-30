import React from 'react';
import 'typeface-roboto';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import CityGallery from '../CityGallery/CityGallery';
import TextField from '@material-ui/core/TextField';
import './Cities.css';
// import SearchBar from '../../Components/SearchBar/SearchBar';

export default class Cities extends React.Component {

  state = {
    cities: [],
    string: ""
   }
  
  // fetches cities from DB
  componentDidMount() {
  axios.get('http://localhost:5000/cities/all')
    .then(res => { 
      this.setState({
        cities: res.data
      })
    })  
  }

  handleChange = (e) => {
  
  // updates string in state
  this.setState({
  string: e.target.value.toLowerCase()
    })
  };
  
  handleSubmit = (e) => {
  e.preventDefault()  
    };

  render() {  

  // filter function    
  let filteredCities = [...this.state.cities.filter(city => { 
  return city.name.toLowerCase().startsWith(this.state.string)    
  })]

   return (
       <Grid item xs={12}>
         <div>
            <form onSubmit={this.handleSubmit}>
               <TextField id="standard-name" label="Search City"
                  defaultValue={""}
                  onChange={this.handleChange} />
          </form> 
        </div>
        <CityGallery cities={filteredCities} />
       </Grid>
      );
    }
  }

//'https://mern-ubiqum-v2.herokuapp.com/cities/all' // MERN DB para desarrollo solo frontend