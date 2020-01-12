import React from 'react';
import { BottomNavigation, BottomNavigationAction  } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import './BottomNav.css';



const BottomNav = () => {
    return (
        <Link to="/">
            <BottomNavigation 
                // value={value}
                // onChange={(event, newValue) => {
                // setValue(newValue);
                // }}
            
                // showLabels
                className='footer'
    >
                <BottomNavigationAction label="Home" icon={<HomeIcon style={{ fontSize: 45 }}/>} />
            
           </BottomNavigation>
        </Link>
    );
}

export default BottomNav;
