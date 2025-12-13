import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const roles = ['user', 'creator', 'admin'];

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleRoleChange = async (user, newRole) => {
        if (user.role === newRole) return;

        try {
            await axiosSecure.patch(`/users/${user._id}/role`, { role: newRole });

            Swal.fire({
                position: "top-end",
                icon: 'success',
                title: 'Role updated',
                text: `${user.displayName} is now ${newRole}`,
                timer: 1500,
                showConfirmButton: false
            });

            queryClient.invalidateQueries(['users']);
        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: 'error',
                title: 'Failed',
                text: error.response?.data?.message || 'Something went wrong'
            });
        }
    };


    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead className="bg-base-200">
                        <tr className="text-sm font-semibold">
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className="hover">
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="mask mask-squircle h-10 w-10 ">
                                            <img
                                                src={user.photoURL}
                                                alt="Avatar" />
                                        </div>
                                        <div className="font-medium">
                                            {user.displayName}
                                        </div>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`badge ${user.role === 'admin'
                                        ? 'badge-error'
                                        : user.role === 'creator'
                                            ? 'badge-warning'
                                            : 'badge-info'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>

                                <td className="text-center">
                                    <select
                                        className="select select-bordered select-sm"
                                        value={user.role}
                                        disabled={user.role === 'admin'}
                                        onChange={(e) =>
                                            handleRoleChange(user, e.target.value)
                                        }
                                    >
                                        {roles.map(role => (
                                            <option key={role} value={role}>
                                                {role}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {users.length === 0 && (
                    <p className="text-center mt-6 text-gray-500">
                        There is no User yet.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;