import React from 'react';
import Banner from '../components/Banner';
import LatestFindAndLost from '../components/LatestFindAndLost';
import FaqSection from '../components/FaqSection';
import ReviewSection from '../components/ReviewSection';


const Home = () => {
   
    return (
        
        <div>
            <Banner></Banner>
            <LatestFindAndLost></LatestFindAndLost>
            <FaqSection></FaqSection>
            <ReviewSection></ReviewSection>
        </div>
    );
};

export default Home;