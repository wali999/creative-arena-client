import React from 'react';
import useAuth from '../../hooks/useAuth';
import { FaGoogle } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const SocialLogin = () => {

    const { signInWithGoogle } = useAuth();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();


    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;

                //create user in the database
                const userInfo = {
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                }

                axiosSecure.post('/users', userInfo)
                    .then(() => {
                        navigate(location.state || '/')
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `Welcome back, ${user.displayName || 'User'}`,
                            showConfirmButton: false,
                            timer: 2500
                        });
                    })
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login failed',
                    text: error.message
                });
            })
    }


    return (
        <div className='text-center pb-8'>
            <p className='mb-2'>OR</p>
            <button
                onClick={handleGoogleSignIn}
                className="btn btn-accent text-black border-[#e5e5e5]">
                <FaGoogle />
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogin;