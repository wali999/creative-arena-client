import React from 'react';
import PopularContests from './PopularContests';
import Banner from './Banner';
import WinnerAdvertisement from './WinnerAdvertisement';
import HowItWorks from './HowItWorks';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularContests></PopularContests>
            <WinnerAdvertisement></WinnerAdvertisement>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;