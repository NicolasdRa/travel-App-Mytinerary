import React from 'react';
import './MainContent.css'
import { Card, CardHeader, CardContent, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import ForwardBtn from './ForwardBtn';


const MainContent = () => {
    return ( 
      <Card >
          <CardHeader title='Start Browsing' />
          <CardContent>
           <Link to="/cities">
            <IconButton aria-label="forward arrow" size='medium'>
                <ArrowForwardIosIcon style={{ color: 'red', fontSize: 70 }}/>
            </IconButton>
            </Link>       
          </CardContent>
      </Card>
    );
}

export default MainContent;
