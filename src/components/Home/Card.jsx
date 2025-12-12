import React from 'react';
import { FaAward, FaMoneyBillWave, FaRegClock, FaTags } from 'react-icons/fa';

const Card = () => {
    return (
        <div className="card w-[350px] bg-base-100 shadow-xl rounded-xl hover:shadow-2xl transition">
            {/* Image */}
            <figure className="h-56 overflow-hidden rounded-t-xl">
                <img
                    src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80"
                    alt="Creative Contest"
                    className="w-full h-full object-cover hover:scale-105 transition"
                />
            </figure>

            {/* Content */}
            <div className="card-body p-5">
                {/* Title */}
                <h2 className="card-title text-xl font-semibold">
                    Logo Design Challenge
                </h2>

                {/* Short Description */}
                <p className="text-sm text-gray-600 mb-2">
                    Create a modern, clean, and professional logo for a fictional tech brand...
                </p>

                {/* Info Section */}
                <div className="space-y-2 text-sm">
                    <p className="flex gap-2 items-center">
                        <FaMoneyBillWave className="text-green-500" />
                        <span className="font-semibold">Entry Fee:</span> $15
                    </p>

                    <p className="flex gap-2 items-center">
                        <FaAward className="text-yellow-500" />
                        <span className="font-semibold">Prize Money:</span> $200
                    </p>

                    <p className="flex gap-2 items-center">
                        <FaTags className="text-blue-500" />
                        <span className="font-semibold">Contest Type:</span> Image Design
                    </p>

                    <p className="flex gap-2 items-center">
                        <FaRegClock className="text-red-500" />
                        <span className="font-semibold">Deadline:</span> Jan 31, 2025
                    </p>
                </div>

                {/* Task Instruction */}
                <div className="mt-3">
                    <h3 className="font-semibold">Task Instruction:</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        Submit high-quality PNG or SVG files. Use your creativity
                        to produce a unique logomark.
                    </p>
                </div>

                {/* Buttons */}
                <div className="card-actions mt-4 justify-end">
                    <button className="btn btn-primary btn-sm">Details</button>
                    <button className="btn btn-accent btn-sm">Register</button>
                </div>
            </div>
        </div>
    );
};

export default Card;