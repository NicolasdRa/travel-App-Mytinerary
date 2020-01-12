import React from 'react';
import { IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

const HomeBtn = () => {
    return (
        <IconButton aria-label="home" size='large' disabled>
            <HomeIcon style={{ fontSize: 50 }}/>
        </IconButton>
    );
}

export default HomeBtn;
