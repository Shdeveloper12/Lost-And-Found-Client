import React from 'react';
import Banner from '../components/Banner';
import LatestFindAndLost from '../components/LatestFindAndLost';
import { useLoaderData } from 'react-router';

const Home = () => {
    const posts = useLoaderData();
    return (
        
        <div>
            <Banner></Banner>
            <LatestFindAndLost></LatestFindAndLost>
        </div>
    );
};

export default Home;