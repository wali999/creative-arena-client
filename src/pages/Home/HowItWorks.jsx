import { FaUserPlus, FaSearch, FaTrophy, FaMoneyBillWave } from 'react-icons/fa';

const steps = [
    {
        icon: <FaUserPlus />,
        title: 'Create an Account',
        desc: 'Sign up and complete your profile to start participating in contests.'
    },
    {
        icon: <FaSearch />,
        title: 'Join Contests',
        desc: 'Browse approved contests and register by paying the entry fee.'
    },
    {
        icon: <FaTrophy />,
        title: 'Submit & Win',
        desc: 'Submit your work before deadline and compete to win prizes.'
    },
    {
        icon: <FaMoneyBillWave />,
        title: 'Get Paid',
        desc: 'Creators declare winners and prize money is rewarded.'
    }
];

const HowItWorks = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold text-center mb-12">
                How It Works
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
                {steps.map((step, i) => (
                    <div
                        key={i}
                        className="card bg-base-100 shadow-xl p-6 text-center hover:scale-105 transition"
                    >
                        <div className="text-4xl text-primary mb-4 flex justify-center">
                            {step.icon}
                        </div>
                        <h3 className="font-semibold text-lg mb-2">
                            {step.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                            {step.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HowItWorks;
