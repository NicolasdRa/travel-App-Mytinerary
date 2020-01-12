import React from 'react';
import { Box } from '@material-ui/core';
import './Header.css'
import logo from '../../Images/myLogo.png';

const Header = () => {

        return (
            <Box>
               <Box className='logoBox'>
                   <img src={logo} alt="Logo" className='img'/>
               </Box>
               <Box>
                   <h3 className='legend'>Find the perfect trip, designed by insiders who know and love their cities</h3> 
               </Box>
            </Box>        
        )
}

export default Header;
