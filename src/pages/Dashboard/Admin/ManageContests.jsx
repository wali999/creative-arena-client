import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { RiDeleteBin6Fill } from 'react-icons/ri';

const ManageContests = () => {
    const axiosSecure = useAxiosSecure();
    const [page, setPage] = React.useState(1);
    const limit = 10;

    const { data = {}, refetch } = useQuery({
        queryKey: ['contests', page],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/contests?page=${page}&limit=${limit}`
            );
            return res.data;
        },
        keepPreviousData: true
    });

    const contests = data.contests || [];
    const totalPages = Math.ceil((data.total || 0) / limit);

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
            <h2 className="text-2xl font-bold mb-6">Manage Contests</h2>

            <div className=" min-h-[650px] flex flex-col justify-between">
                <table className="table table-zebra w-full">
                    <thead className="bg-base-200">
                        <tr className="text-sm font-semibold">
                            <th>#</th>
                            <th>Contest Name</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Deadline</th>
                            <th className="text-center">Actions</th>
                            <th className="text-center">Other Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {contests.map((contest, index) => (
                            <tr key={contest._id} className="hover">
                                <th>{(page - 1) * limit + index + 1}</th>
                                <td className="font-medium">{contest.name}</td>
                                <td>{contest.contestType}</td>

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
                                <td className="text-center align-middle">
                                    <button
                                        onClick={() => handleDelete(contest._id)}
                                        className="text-red-500 inline-flex items-center justify-center"
                                    >
                                        <RiDeleteBin6Fill />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center mt-6 gap-2">
                    <button
                        className="btn btn-sm"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        Prev
                    </button>

                    {[...Array(totalPages).keys()].map(num => (
                        <button
                            key={num}
                            onClick={() => setPage(num + 1)}
                            className={`btn btn-sm ${page === num + 1 ? 'btn-primary' : ''
                                }`}
                        >
                            {num + 1}
                        </button>
                    ))}

                    <button
                        className="btn btn-sm"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                </div>

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