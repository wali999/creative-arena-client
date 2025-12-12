import React from 'react';
import Container from '../Shared/Container';
import Card from './Card';

const Contests = () => {
    return (
        <Container>
            <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-10'>
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </Container>
    );
};

export default Contests;