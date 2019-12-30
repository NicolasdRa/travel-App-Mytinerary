import React from 'react';
import 'typeface-roboto';
import CityCard from '../../Components/CityCard/CityCard';
import './CityGallery.css';


const CitiGallery = (props) => {

  const { cities } = props

         return cities.map((city) => (
         <CityCard city={city} key={city._id}/>
        ));
      }

export default CitiGallery