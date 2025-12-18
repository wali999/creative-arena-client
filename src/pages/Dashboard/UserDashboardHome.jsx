import React from 'react';
import useAuth from '../../hooks/useAuth';

const UserDashboardHome = () => {
    const { user } = useAuth();

    return (
        <div className="p-8  bg-base-100 text-base-content flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">Welcome Back, {user.displayName}!</h1>
            <p className="text-lg mb-6 opacity-80 text-center max-w-xl">
                Explore contests, showcase your talent, and win exciting prizes. Your creativity deserves to be recognized!
            </p>
            <p className="text-md italic text-center max-w-md">
                "The secret to getting ahead is getting started." - Mark Twain
            </p>
        </div>
    );
};

export default UserDashboardHome;
