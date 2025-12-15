import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { GiTrophyCup } from 'react-icons/gi';

const MyWinningContests = () => {
    const axiosSecure = useAxiosSecure();

    const { data: wins = [], isLoading } = useQuery({
        queryKey: ['my-winning-contests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/my-winning-contests');
            return res.data;
        }
    });

    if (isLoading) {
        return <p className="text-center mt-10">Loading...</p>;
    }
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6"> My Winning Contests</h2>

            {wins.length === 0 && (
                <p className="text-gray-500">You haven’t won any contests yet.</p>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wins.map(win => (
                    <div
                        key={win._id}
                        className="card bg-base-100 shadow-xl"
                    >
                        <figure>
                            <img
                                src={win.contest.image}
                                alt={win.contestName}
                                className="h-40 w-full object-cover"
                            />
                        </figure>

                        <div className="card-body">
                            <h3 className="font-bold text-lg">
                                {win.contestName}
                            </h3>

                            <div className='flex justify-between items-center'>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        {win.contest.contestType}
                                    </p>

                                    <p className="text-success font-semibold">
                                        Prize: ${win.contest.prizeMoney}
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        Won on {new Date(win.submittedAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <GiTrophyCup size={50} className='text-yellow-500' />
                                </div>
                            </div>

                            <a
                                href={
                                    win.submissionLink.startsWith('http')
                                        ? win.submissionLink
                                        : `https://${win.submissionLink}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-outline mt-3"
                            >
                                View My Work
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyWinningContests;