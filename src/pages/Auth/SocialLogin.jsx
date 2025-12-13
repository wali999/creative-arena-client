import React from 'react';
import useAuth from '../../hooks/useAuth';
import { FaGoogle } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useLocation, useNavigate } from 'react-router';

const SocialLogin = () => {

    const { signInWithGoogle } = useAuth();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();


    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);

                //create user in the database
                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL
                }

                axiosSecure.post('/users', userInfo)
                    .then(res => {
                        console.log('user data has been stored', res.data)
                        navigate(location.state || '/')
                    })
            })
            .catch(error => {
                console.log(error)
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