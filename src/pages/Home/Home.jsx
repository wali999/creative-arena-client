import React from 'react';
import PopularContests from './PopularContests';
import Banner from './Banner';
import WinnerAdvertisement from './WinnerAdvertisement';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularContests></PopularContests>
            <WinnerAdvertisement></WinnerAdvertisement>
        </div>
    );
};

export default Home;