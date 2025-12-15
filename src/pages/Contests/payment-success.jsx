import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [params] = useSearchParams();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const sessionId = params.get('session_id');

        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`);
        }
    }, [axiosSecure, params]);

    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <div className="bg-base-100 shadow-xl rounded-xl p-10 text-center">
                <h2 className="text-3xl font-bold text-success mb-4">
                    Payment Successful ✅
                </h2>
                <p className="text-gray-600">
                    You are successfully registered for the contest.
                </p>
            </div>
        </div>
    );
};

export default PaymentSuccess;
