import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MyParticipated = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: participatedContests = [], isLoading } = useQuery({
        queryKey: ['myParticipated', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/my-participated?email=${user.email}`
            );
            return res.data;
        }
    });

    if (isLoading) {
        return <p className="text-center mt-10">Loading...</p>;
    }
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Participated Contests</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead className="bg-base-200">
                        <tr className="text-sm font-semibold">
                            <th>#</th>
                            <th>Contest Name</th>
                            <th>Type</th>
                            <th>Prize Money</th>
                            <th>Status</th>
                            <th>Deadline</th>
                        </tr>
                    </thead>

                    <tbody>
                        {participatedContests.map((contest, index) => (
                            <tr key={contest._id}>
                                <th>{index + 1}</th>
                                <td className="font-medium">{contest.name}</td>
                                <td>{contest.contestType}</td>
                                <td>${contest.prizeMoney}</td>
                                <td>
                                    <span className="badge badge-success">
                                        Registered
                                    </span>
                                </td>
                                <td>
                                    {new Date(contest.deadline).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {participatedContests.length === 0 && (
                    <p className="text-center mt-6 text-gray-500">
                        You haven't Participated any contests yet.
                    </p>
                )}
            </div>
        </div>
    );
};

export default MyParticipated;