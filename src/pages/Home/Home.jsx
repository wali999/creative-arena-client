import React from 'react';
import PopularContests from './PopularContests';
import Banner from './Banner';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularContests></PopularContests>
        </div>
    );
};

export default Home;