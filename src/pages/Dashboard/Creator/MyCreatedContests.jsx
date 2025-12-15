import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const MyCreatedContests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: myContests = [], refetch } = useQuery({
        queryKey: ["my-contests", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests-by-creator?email=${user.email}`);
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You cannot undo this action!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/contests/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire("Deleted!", "Contest has been removed.", "success");
                    refetch();
                }
            }
        });
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
                        {myContests.map((contest, index) => (
                            <tr key={contest._id} className="hover">
                                <th>{index + 1}</th>
                                <td className="font-medium">{contest.name}</td>
                                <td>{contest.contestType}</td>
                                <td>${contest.prizeMoney}</td>
                                <td>
                                    <span
                                        className={`badge ${contest.status === 'approved'
                                            ? 'badge-success'
                                            : contest.status === 'rejected'
                                                ? 'badge-error'
                                                : 'badge-info'
                                            }`}
                                    >
                                        {contest.status}
                                    </span>
                                </td>
                                <td>
                                    {new Date(contest.deadline).toLocaleDateString("en-US")}
                                </td>

                                <td className="flex gap-3 justify-center">
                                    {contest.status === 'pending' && (
                                        <>
                                            <Link
                                                to={`/dashboard/edit-contest/${contest._id}`}
                                                className="btn btn-sm btn-primary"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(contest._id)}
                                                className="btn btn-sm btn-error"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}

                                    {contest.status === 'approved' && (
                                        <Link
                                            to={`/dashboard/submitted-task`}
                                            className="btn btn-sm btn-info"
                                        >
                                            See Submissions
                                        </Link>
                                    )}

                                    {contest.status === 'rejected' && (
                                        <span title="This contest was rejected by admin" className="text-gray-400 text-sm">
                                            No Actions
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {myContests.length === 0 && (
                    <p className="text-center mt-6 text-gray-500">
                        You haven't created any contests yet.
                    </p>
                )}
            </div>
        </div>
    );
};

export default MyCreatedContests;