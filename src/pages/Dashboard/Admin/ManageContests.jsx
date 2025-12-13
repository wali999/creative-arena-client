import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageContests = () => {
    const axiosSecure = useAxiosSecure();

    const { data: contests = [], refetch } = useQuery({
        queryKey: ['contests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests');
            return res.data;
        }
    });

    const handleApprove = async (contest) => {
        try {
            await axiosSecure.patch(`/contests/${contest._id}/status`, {
                status: 'approved'
            });

            Swal.fire({
                icon: 'success',
                title: 'Approved',
                text: 'Contest has been approved',
                timer: 1200,
                showConfirmButton: false
            });

            refetch();
        } catch (error) {
            Swal.fire('Error', 'Failed to approve contest', error);
        }
    };

    const handleReject = async (contest) => {
        try {
            await axiosSecure.patch(`/contests/${contest._id}/status`, {
                status: 'rejected'
            });

            Swal.fire({
                icon: 'success',
                title: 'Rejected',
                text: 'Contest has been rejected',
                timer: 1200,
                showConfirmButton: false
            });

            refetch();
        } catch (error) {
            Swal.fire('Error', 'Failed to reject contest', error);
        }
    };



    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Created Contests</h2>

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
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {contests.map((contest, index) => (
                            <tr key={contest._id} className="hover">
                                <th>{index + 1}</th>
                                <td className="font-medium">{contest.name}</td>
                                <td>{contest.contestType}</td>
                                <td>${contest.prizeMoney}</td>
                                <td>
                                    <span className="badge badge-info">{contest.status}</span>
                                </td>
                                <td>
                                    {new Date(contest.deadline).toLocaleDateString("en-US")}
                                </td>

                                <td className="flex gap-2 justify-center">
                                    {contest.status === 'pending' ? (
                                        <>
                                            <button
                                                onClick={() => handleApprove(contest)}
                                                className="btn btn-sm btn-success"
                                            >
                                                Approve
                                            </button>

                                            <button
                                                onClick={() => handleReject(contest)}
                                                className="btn btn-sm btn-error"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    ) : (
                                        <span className="text-gray-400 text-sm">
                                            No actions
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {contests.length === 0 && (
                    <p className="text-center mt-6 text-gray-500">
                        You haven't created any contests yet.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ManageContests;