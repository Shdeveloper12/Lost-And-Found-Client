import React from 'react';
import Banner from '../components/Banner';
import LatestFindAndLost from '../components/LatestFindAndLost';
import FaqSection from '../components/FaqSection';


const Home = () => {
   
    return (
        
        <div>
            <Banner></Banner>
            <LatestFindAndLost></LatestFindAndLost>
            <FaqSection></FaqSection>
        </div>
    );
};

export default Home;