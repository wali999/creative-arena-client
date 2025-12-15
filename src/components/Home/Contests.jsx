import React from 'react';
import Container from '../Shared/Container';
import Card from './Card';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';

const contestTypes = [
    'All',
    'Design',
    'UI/UX',
    'Video Editing',
    'Writing',
    'Illustration',
    'Graphic Design',
    '3D Modeling',
    'Photography',
    'Music',
    'Gaming Review',
    'Other',
];

const Contests = () => {
    const axiosSecure = useAxiosSecure();
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get('type') || 'All';

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ['allContests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-contests');
            return res.data;
        },
    });

    const filteredContests =
        activeTab === 'All'
            ? contests
            : contests.filter(
                contest =>
                    contest.contestType?.toLowerCase() ===
                    activeTab.toLowerCase()
            );

    if (isLoading) {
        return <p className="text-center mt-10">Loading contests...</p>;
    }


    return (
        <Container>
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
                {contestTypes.map(type => (
                    <button
                        key={type}
                        onClick={() =>
                            type === 'All'
                                ? setSearchParams({})
                                : setSearchParams({ type })
                        }
                        className={`btn btn-sm ${activeTab === type ? 'btn-primary' : 'btn-outline'
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Contest list */}
            {filteredContests.length === 0 ? (
                <p className="text-center text-gray-500">
                    No contests found for{' '}
                    <span className="font-semibold">{activeTab}</span>
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredContests.map(contest => (
                        <Card key={contest._id} contest={contest} />
                    ))}
                </div>
            )}
        </Container>
    );
};

export default Contests;