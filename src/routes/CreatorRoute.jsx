import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../components/Shared/Loading';

const CreatorRoute = ({ children }) => {
    const { loading, user } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || !user || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'creator') {
        return (
            <div>
                <p>Access is Forbidden</p>
            </div>
        );
    }

    return children;
};

export default CreatorRoute;