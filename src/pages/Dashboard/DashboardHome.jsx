import React from 'react';
import Loading from '../../components/Shared/Loading';
import useRole from '../../hooks/useRole';
import AdminDashboardHome from './AdminDashboardHome';
import CreatorDashboardHome from './CreatorDashboardHome';
import UserDashboardHome from './UserDashboardHome';

const DashboardHome = () => {
    const { role, roleLoading } = useRole();

    if (roleLoading) {
        return <Loading></Loading>
    }

    if (role === 'admin') {
        return <AdminDashboardHome></AdminDashboardHome>
    }
    else if (role === 'creator') {
        return <CreatorDashboardHome></CreatorDashboardHome>
    }
    else {
        return <UserDashboardHome></UserDashboardHome>
    }
};

export default DashboardHome;