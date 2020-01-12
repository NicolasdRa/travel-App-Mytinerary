import React from 'react';
import { Button, ArrowForwardIcon} from '@material-ui/core';

const ForwardBtn = () => {
 
    return (
    <Button variant="contained" color="primary" href="#contained-buttons">
            <ArrowForwardIcon className='MuiButton-iconSizeLarge' />
    </Button>
    )
}

export default ForwardBtn;
