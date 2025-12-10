import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import SocialLogin from './SocialLogin';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();


    const handleRegistration = (data) => {
        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then((result) => {
                console.log(result.user);

                const formData = new FormData();
                formData.append('image', profileImg);
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url
                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log('user profile updated');

                            })
                            .catch(error => console.log(error)
                            )

                    })

            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl text-center">Welcome to Creative Arena</h3>
            <p className='text-center'>Please Register</p>
            <form onSubmit={handleSubmit(handleRegistration)} className="card-body">
                <fieldset className="fieldset">
                    {/* name field */}
                    <label className="label">Name</label>
                    <input type="text" {...register('name', { required: true })} className="input" placeholder="Your Name" />
                    {
                        errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>
                    }

                    {/* Photo image field */}
                    <label className="label">Photo</label>
                    <input type="file" {...register('photo', { required: true })} className="file-input" placeholder="Your Photo" />
                    {
                        errors.photo?.type === 'required' && <p className='text-red-500'>Photo is required</p>
                    }

                    {/* email field */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                    }

                    {/* password field */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', {
                        required: true,
                        minLength: 6,
                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                    })} className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or Longer</p>
                    }
                    {
                        errors.password?.type === 'pattern' && <p className='text-red-500'>Password must have at least one uppercase, at least one lowercase, at least one number and at least one special characters</p>
                    }

                    <div><a className="link link-hover">Forgot password?</a></div>

                    <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>
                <p> Already have an account <Link className='text-blue-400 underline' to='/login'>Login</Link> </p>
            </form>
            <SocialLogin />
        </div>
    );
};

export default Register;  