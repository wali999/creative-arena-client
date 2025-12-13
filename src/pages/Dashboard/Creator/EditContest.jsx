import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useForm, Controller } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const EditContest = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: '',
            contestType: '',
            image: '',
            price: '',
            prizeMoney: '',
            description: '',
            taskInstruction: '',
            deadline: null,
        }
    });

    // to fetch contest
    const { data: contest, isLoading } = useQuery({
        queryKey: ['contest', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${id}`);
            return res.data;
        },
        enabled: !!id
    });

    //to show Prefilled form
    useEffect(() => {
        if (contest?._id) {
            reset({
                name: contest.name,
                contestType: contest.contestType,
                image: contest.image,
                price: contest.price,
                prizeMoney: contest.prizeMoney,
                description: contest.description,
                taskInstruction: contest.taskInstruction,
                deadline: new Date(contest.deadline),
            });
        }
    }, [contest, reset]);

    // Update contest
    const handleUpdateContest = async (data) => {
        const updatedContest = {
            ...data,
            price: Number(data.price),
            prizeMoney: Number(data.prizeMoney),
            deadline: data.deadline.toISOString(),
        };

        const res = await axiosSecure.patch(`/contests/${id}`, updatedContest);

        if (res.data.modifiedCount > 0) {
            navigate('/dashboard/my-created-contests');
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Contest updated.",
                showConfirmButton: false,
                timer: 2000
            });
        }
    };

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 mt-5 bg-base-100 shadow-xl rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Contest</h2>

            <form className="space-y-5" onSubmit={handleSubmit(handleUpdateContest)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    <div className="space-y-5">

                        {/* Contest Name */}
                        <div>
                            <label className="font-semibold">Contest Name</label>
                            <input
                                type="text"
                                className="input input-bordered w-full mt-1"
                                {...register("name", { required: true })}
                            />
                            {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                        </div>

                        {/* Contest Type */}
                        <div>
                            <label className="font-semibold">Contest Type</label>
                            <select
                                className="select select-bordered w-full mt-1"
                                {...register("contestType", { required: true })}
                            >
                                <option value="">Select a type</option>
                                <option value="Image Design">Image Design</option>
                                <option value="Article Writing">Article Writing</option>
                                <option value="Business Idea">Business Idea</option>
                                <option value="Gaming Review">Gaming Review</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.contestType && <p className="text-red-500 text-sm">Contest type is required</p>}
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="font-semibold">Image URL</label>
                            <input
                                type="text"
                                className="input input-bordered w-full mt-1"
                                {...register("image", { required: true })}
                            />
                            {errors.image && <p className="text-red-500 text-sm">Image URL is required</p>}
                        </div>
                    </div>

                    <div className="space-y-5">

                        {/* Price */}
                        <div>
                            <label className="font-semibold">Entry Fee (Price)</label>
                            <input
                                type="number"
                                className="input input-bordered w-full mt-1"
                                {...register("price", { required: true })}
                            />
                            {errors.price && <p className="text-red-500 text-sm">Price is required</p>}
                        </div>

                        {/* Prize Money */}
                        <div>
                            <label className="font-semibold">Prize Money</label>
                            <input
                                type="number"
                                className="input input-bordered w-full mt-1"
                                {...register("prizeMoney", { required: true })}
                            />
                            {errors.prizeMoney && <p className="text-red-500 text-sm">Prize money is required</p>}
                        </div>

                        {/* Deadline */}
                        <div>
                            <label className="font-semibold block">Deadline</label>
                            <Controller
                                name="deadline"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <DatePicker
                                        selected={field.value}
                                        onChange={field.onChange}
                                        className="input input-bordered w-full mt-1"
                                    />
                                )}
                            />
                            {errors.deadline && (
                                <p className="text-red-500 text-sm">Deadline is required</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="font-semibold">Description</label>
                    <textarea
                        className="textarea textarea-bordered w-full mt-1"
                        rows={4}
                        {...register("description", { required: true })}
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
                </div>

                {/* Task Instruction */}
                <div>
                    <label className="font-semibold">Task Instruction</label>
                    <textarea
                        className="textarea textarea-bordered w-full mt-1"
                        rows={3}
                        {...register("taskInstruction", { required: true })}
                    ></textarea>
                    {errors.taskInstruction && (
                        <p className="text-red-500 text-sm">Task instruction is required</p>
                    )}
                </div>

                {/* Submit */}
                <div className="text-center pt-4">
                    <button className="btn btn-primary w-full">Update Contest</button>
                </div>
            </form>
        </div>
    );
};

export default EditContest;