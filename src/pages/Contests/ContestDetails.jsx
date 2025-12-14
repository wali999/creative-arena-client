import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const ContestDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false);

    const [timeLeft, setTimeLeft] = useState(null);
    const [isEnded, setIsEnded] = useState(false);

    const { data: contest, isLoading } = useQuery({
        queryKey: ['contest', id],
        enabled: !!id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${id}`);
            return res.data;
        },
    });


    useEffect(() => {
        if (!contest?.deadline) return;

        const deadlineTime = new Date(contest.deadline).getTime();

        const interval = setInterval(() => {
            const now = Date.now();
            const diff = deadlineTime - now;

            if (diff <= 0) {
                clearInterval(interval);
                setIsEnded(true);
                setTimeLeft(null);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, [contest]);



    if (isLoading) {
        return <p className="text-center mt-10">Loading...</p>;
    }


    const isRegistered = contest?.participants?.includes(user?.email);


    const handlePay = async () => {
        const res = await axiosSecure.post('/create-checkout-session', {
            contestId: contest._id,
            contestName: contest.name,
            price: contest.price,
        });

        window.location.href = res.data.url;
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            {/* Banner */}
            <div className="w-full h-[380px] rounded-2xl overflow-hidden shadow-lg mb-8">
                <img
                    src={contest.image}
                    alt="Contest Banner"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Main Card */}
            <div className="bg-base-100 rounded-2xl shadow-xl p-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">
                            {contest.name}
                        </h1>
                        <p className="text-gray-500 text-sm">
                            {contest.contestType}
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-6">
                        <div className="text-center">
                            <p className="text-xl font-bold">{contest.participants?.length || 0}</p>
                            <p className="text-xs text-gray-500">Participants</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-bold">${contest.price}</p>
                            <p className="text-xs text-gray-500">Entry Fee</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-bold">${contest.prizeMoney}</p>
                            <p className="text-xs text-gray-500">Prize</p>
                        </div>
                        <div className="text-center">
                            {isEnded ? (
                                <>
                                    <p className="text-xl font-bold text-error">Ended</p>
                                    <p className="text-xs text-gray-500">Contest Ended</p>
                                </>
                            ) : (
                                <>
                                    <p className="text-xl font-bold text-error">
                                        {timeLeft
                                            ? `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m`
                                            : '--'}
                                    </p>
                                    <p className="text-xs text-gray-500">Remaining</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3">
                        Contest Description
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        {contest.description}
                    </p>
                </div>

                {/* Task Instructions */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3">
                        Task Instructions
                    </h2>
                    <ul className=" text-gray-600">
                        {contest.taskInstruction
                        }
                    </ul>
                </div>

                {/* Winner Section */}
                <div className="mb-8 border rounded-xl p-6 bg-base-200">
                    <h2 className="text-2xl font-semibold mb-4">Winner</h2>
                    <div className="flex items-center gap-4">
                        <img
                            src="https://i.pravatar.cc/100?img=12"
                            alt="Winner"
                            className="w-16 h-16 rounded-full"
                        />
                        <div>
                            <p className="font-semibold text-lg">Alex Johnson</p>
                            <p className="text-sm text-gray-500">Professional Designer</p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-end gap-4">
                    {isEnded ? (
                        <button disabled className="btn btn-disabled btn-lg">
                            Contest Ended
                        </button>
                    ) : isRegistered ? (
                        <button
                            disabled
                            className="btn btn-success btn-lg cursor-not-allowed"
                        >
                            Registered ✅
                        </button>
                    ) : (
                        <button
                            onClick={handlePay}
                            className="btn btn-primary btn-lg"
                        >
                            Pay ${contest.price} to Register
                        </button>
                    )}

                    {/* Submit  */}
                    {!isEnded && isRegistered && (
                        <button
                            onClick={() => setShowModal(true)}
                            className="btn btn-outline btn-lg"
                        >
                            Submit Task
                        </button>
                    )}
                </div>

            </div>

            {/* Submit Task Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-base-100 rounded-xl w-full max-w-md p-6">
                        <h3 className="text-xl font-semibold mb-3">
                            Submit Your Task
                        </h3>

                        <textarea
                            className="textarea textarea-bordered w-full mb-4"
                            rows="4"
                            placeholder="Provide your submission links or details..."
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="btn btn-sm"
                            >
                                Cancel
                            </button>
                            <button className="btn btn-sm btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContestDetails;
