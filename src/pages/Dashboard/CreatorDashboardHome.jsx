import React from 'react';
import useAuth from '../../hooks/useAuth';

const CreatorDashboardHome = () => {
    const { user } = useAuth();

    return (
        <div className="p-8  bg-base-100 text-base-content flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">Welcome Back, {user.displayName}!</h1>
            <p className="text-lg mb-6 opacity-80 text-center max-w-xl">
                You're the heart of Creative Arena! Create contests, engage participants, and inspire creativity across the platform.
            </p>
            <p className="text-md italic text-center max-w-md">
                "Creativity is intelligence having fun." - Albert Einstein
            </p>
        </div>
    );
};

export default CreatorDashboardHome;
