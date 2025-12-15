import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const SubmittedTasks = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedSubmission, setSelectedSubmission] = useState(null);


    const { data: submissions = [], refetch } = useQuery({
        queryKey: ['creator-submissions'],
        queryFn: async () => {
            const res = await axiosSecure.get('/creator/submissions');
            return res.data;
        }
    });


    const handleDeclareWinner = async (submission) => {
        await axiosSecure.patch(
            `/creator/declare-winner/${submission._id}`,
            { contestId: submission.contestId }
        );

        refetch();
    };




    return (
        <div className="p-6">
            <h2 className="text-2xl text-center font-bold mb-6">Submitted Task on My Created Contests</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Contest</th>
                            <th>Participant</th>
                            <th>Email</th>
                            <th>Submission</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {submissions.map(sub => (
                            <tr key={sub._id}>
                                <td>{sub.contestName}</td>
                                <td>{sub.participant.name}</td>
                                <td>{sub.participant.email}</td>

                                <td>
                                    <button
                                        className="link link-primary"
                                        onClick={() => setSelectedSubmission(sub)}
                                    >
                                        View Work
                                    </button>
                                </td>

                                <td>
                                    <span
                                        className={`badge font-semibold ${sub.status === 'winner'
                                            ? 'badge-success'
                                            : sub.status === 'rejected'
                                                ? 'badge-error'
                                                : 'badge-warning'
                                            }`}
                                    >
                                        {sub.status}
                                    </span>
                                </td>

                                <td>
                                    {sub.isWinner ? (
                                        <span className="text-success font-semibold">
                                            Winner 🏆
                                        </span>
                                    ) : sub.status === 'rejected' ? (
                                        <span className="text-error font-semibold">
                                            Rejected
                                        </span>
                                    ) : (
                                        <button
                                            className="btn btn-xs btn-primary"
                                            onClick={() => handleDeclareWinner(sub)}
                                        >
                                            Declare Winner
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {submissions.length === 0 && (
                    <p className="text-center mt-6 text-gray-500">
                        No Submission's in your created contests yet.
                    </p>
                )}
            </div>
            {selectedSubmission && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-base-100 rounded-xl w-full max-w-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">
                            Submission Details
                        </h3>

                        {/* Submission Text */}
                        <div className="mb-4">
                            <p className="font-medium mb-1">Description</p>
                            <p className="text-gray-600 text-sm">
                                {selectedSubmission.submissionText || 'No description provided'}
                            </p>
                        </div>

                        {/* Submission Link */}
                        <div className="mb-6">
                            <p className="font-medium mb-1">Submission Link</p>
                            <a
                                href={
                                    selectedSubmission.submissionLink.startsWith('http')
                                        ? selectedSubmission.submissionLink
                                        : `https://${selectedSubmission.submissionLink}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link link-primary break-all"
                            >
                                {selectedSubmission.submissionLink}
                            </a>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end">
                            <button
                                className="btn btn-sm"
                                onClick={() => setSelectedSubmission(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubmittedTasks;