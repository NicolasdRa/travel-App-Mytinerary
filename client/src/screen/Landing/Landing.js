import React from 'react';
import 'typeface-roboto';
import './Landing.css';
import Container from '@material-ui/core/Container';
import Header from '../../Components/Header/Header';
import MainContent from '../../Components/MainContent/MainContent';
import Links from '../../Components/Links/Links';

const Landing = () => {
    return (
        <Container maxWidth="sm">
            <Header />
            <MainContent />
            <h3>Want to build your own MYtinerary?</h3>
            <Links />           
        </Container>        
    );
}

export default Landing;
