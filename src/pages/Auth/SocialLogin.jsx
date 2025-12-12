import React from 'react';
import useAuth from '../../hooks/useAuth';
import { FaGoogle } from 'react-icons/fa';

const SocialLogin = () => {

    const { signInWithGoogle } = useAuth();


    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
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