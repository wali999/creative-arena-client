import React from 'react';
import { FaAward, FaMoneyBillWave, FaRegClock, FaTags, FaUserFriends } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';

const Card = ({ contest }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        if (!user) {
            navigate('/login');
        } else {
            navigate(`/all-contests/${contest._id}`);
        }
    };

    return (
        <div className="card w-[350px] bg-base-100 shadow-xl rounded-xl hover:shadow-2xl transition">
            {/* Image */}
            <figure className="h-56 overflow-hidden rounded-t-xl">
                <img
                    src={contest.image}
                    alt={contest.name}
                    className="w-full h-full object-cover hover:scale-105 transition"
                />
            </figure>

            {/* Content */}
            <div className="card-body p-5">
                {/* Title */}
                <h2 className="card-title text-xl font-semibold">
                    {contest.name}
                </h2>

                {/* Short Description */}
                <p className="text-sm text-gray-600 mb-2">
                    {contest.description.slice(0, 90)}...
                </p>

                {/* Info Section */}
                <div className="space-y-2 text-sm">
                    <p className="flex gap-2 items-center">
                        <FaTags className="text-blue-500" />
                        <span className="font-semibold">Contest Type:</span> {contest.contestType}
                    </p>

                    <p className="flex gap-2 items-center">
                        <FaRegClock className="text-red-500" />
                        <span className="font-semibold">Deadline:</span> {' '}
                        {new Date(contest.deadline).toLocaleDateString()}
                    </p>
                    <p className="flex gap-2 items-center">
                        <FaUserFriends className="text-yellow-500" />
                        <span className="font-semibold">Perticipants:</span> {' '}
                        {contest.participants || 0}
                    </p>
                </div>



                {/* Buttons */}
                <div className="card-actions mt-4 justify-end">
                    <button
                        onClick={handleDetailsClick}
                        className="btn btn-primary btn-sm"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;