import React, { useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { QueryClient, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const MyProfile = () => {
    const axiosSecure = useAxiosSecure();
    const { user, refetch } = useAuth();

    const { register, handleSubmit, reset } = useForm();

    const { data: profile, isLoading } = useQuery({
        queryKey: ['my-profile'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/me');
            return res.data;
        }
    });

    useEffect(() => {
        if (profile) {
            reset({
                displayName: profile.displayName || '',
                photoURL: profile.photoURL || '',
                bio: profile.bio || ''
            });
        }
    }, [profile, reset]);




    const { data: stats = {} } = useQuery({
        queryKey: ['win-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/win-stats');
            return res.data;
        }
    });


    const chartData = [
        { name: 'Won', value: stats.won || 0 },
        { name: 'Lost', value: (stats.participated || 0) - (stats.won || 0) }
    ];


    const onSubmit = async (data) => {
        await axiosSecure.patch('/users/profile', data);

        Swal.fire({
            position: "top-end",
            icon: 'success',
            title: 'Profile Updated',
            timer: 2000,
            showConfirmButton: false
        });

        refetch();
        QueryClient.invalidateQueries(['my-profile']);
    };


    if (isLoading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">My Profile</h2>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Profile Card */}
                <div className="card bg-base-100 shadow-xl p-6">
                    <img
                        src={user?.photoURL}
                        className="w-24 h-24 rounded-full mx-auto mb-4"
                    />

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        <input
                            {...register('displayName')}
                            className="input input-bordered w-full"
                            placeholder="Name"
                        />

                        <input
                            {...register('photoURL')}
                            className="input input-bordered w-full"
                            placeholder="Photo URL"
                        />

                        <textarea
                            {...register('bio')}
                            className="textarea textarea-bordered w-full"
                            placeholder="Bio / Address"
                        />

                        <button className="btn btn-primary w-full">
                            Update Profile
                        </button>
                    </form>
                </div>

                {/* Win Chart */}
                <div className="card bg-base-100 shadow-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-center">
                        Win Performance
                    </h3>

                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={90}
                                label
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={
                                            entry.name === 'Won'
                                                ? '#AFE1AF'
                                                : '#F08080'
                                        }
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>

                    <p className="text-center mt-4 font-semibold">
                        Win Rate: {stats.winPercentage}%
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;