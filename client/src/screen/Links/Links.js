import React from 'react';
import { Box, Typography, Link } from '@material-ui/core';

const Links = () => {
    return (
        <Box className='linkContainer'>
            <Typography className='linkContainer'>
                <Link href="#" className='link'>
                    Log in
                </Link>
                <Link href="#" className='link'>
                    Create Account
                </Link>
            </Typography>
        </Box>
    );
}

export default Links;
