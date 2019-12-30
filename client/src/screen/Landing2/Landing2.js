import React from 'react';
import 'typeface-roboto';
import './Landing2.css';
import Container from '@material-ui/core/Container';
import MenuAppBar from '../../Components/TopNav/TopNav';
import Header from '../../Components/Header/Header';
import MainContent from '../../Components/MainContent/MainContent';

const Landing2 = () => {
    return (
        <div>
            <Container maxWidth="sm">
                <MenuAppBar />
                <Header />
                <MainContent />                         
            </Container>    
        </div>
    );
}

export default Landing2;


// //import BottomNav from './BottomNav'
// // import Browser from './Browser';
// // import Links from './Links';

// const Landing = () => {
//     return (
//         <Container maxWidth="sm" className='container'>
//             <Header />
//             <MainContent />
//                 <h3>Want to build your own MYtinerary?</h3>
//             <Links />
//             <BottomNav />            
//         </Container>        
//     );
// }

// export default Landing;
