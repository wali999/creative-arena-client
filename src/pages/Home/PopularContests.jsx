import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Container from '../../components/Shared/Container';
import Card from '../../components/Home/Card';
import { Link } from 'react-router';

const PopularContests = () => {
    const axiosSecure = useAxiosSecure();

    const { data: popularContests = [] } = useQuery({
        queryKey: ['popularContests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/popular-contests');
            return res.data;
        }
    });
    return (
        <div className="my-16">
            <h2 className="text-3xl text-center font-semibold mb-3">
                Popular Contests
            </h2>

            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
                Explore our most popular contests.
                These contests have the highest engagement and offer exciting rewards
                across different creative and skill-based categories.
            </p>

            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {popularContests.map(contest => (
                        <Card key={contest._id} contest={contest} />
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link to="/all-contests">
                        <button className="btn btn-outline btn-primary">
                            Show All Contests
                        </button>
                    </Link>
                </div>
            </Container>
        </div>
    );
};

export default PopularContests;