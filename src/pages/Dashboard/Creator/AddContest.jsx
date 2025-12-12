import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';

const AddContest = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [deadline, setDeadline] = useState(new Date());

    const onSubmit = (data) => {
        const contestData = {
            ...data,
            deadline,
            price: parseFloat(data.price),
            prizeMoney: parseFloat(data.prizeMoney),
        };

        console.log("New Contest:", contestData);

        // Reset form
        reset();
        setDeadline(new Date());
    };

    return (
        <div className="max-w-3xl mx-auto p-6 mt-5 bg-base-100 shadow-xl rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Contest</h2>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>

                    <div className="space-y-5">
                        {/* Contest Name */}
                        <div>
                            <label className="font-semibold">Contest Name</label>
                            <input
                                type="text"
                                placeholder="Enter contest name"
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
                                placeholder="Image URL"
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
                                placeholder="Entry fee"
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
                                placeholder="Prize money"
                                className="input input-bordered w-full mt-1"
                                {...register("prizeMoney", { required: true })}
                            />
                            {errors.prizeMoney && <p className="text-red-500 text-sm">Prize money is required</p>}
                        </div>

                        {/* Deadline */}
                        <div>
                            <label className="font-semibold block">Deadline</label>
                            <DatePicker
                                selected={deadline}
                                onChange={(date) => setDeadline(date)}
                                className="input input-bordered w-full mt-1"
                            />
                        </div>
                    </div>
                </div>


                {/* Description */}
                <div>
                    <label className="font-semibold">Description</label>
                    <textarea
                        placeholder="Contest description"
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
                        placeholder="Explain what participants need to do"
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
                    <button className="btn btn-primary w-full">Add Contest</button>
                </div>
            </form>
        </div>
    );
};

export default AddContest;