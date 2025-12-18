import React from 'react';
import useAuth from '../../hooks/useAuth';

const AdminDashboardHome = () => {
    const { user } = useAuth();

    return (
        <div className="p-8  bg-base-100 text-base-content flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">Welcome Back, {user.displayName}!</h1>
            <p className="text-lg mb-6 opacity-80 text-center max-w-xl">
                As an Admin, you have the power to manage users, approve contests, and maintain the integrity of Creative Arena.
            </p>
            <p className="text-md italic text-center max-w-md">
                "Leadership is not about being in charge. It's about taking care of those in your charge."
            </p>
        </div>
    );
};

export default AdminDashboardHome;
