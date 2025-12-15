import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const WinnerAdvertisement = () => {
    const axiosSecure = useAxiosSecure();

    const { data } = useQuery({
        queryKey: ['recent-winners'],
        queryFn: async () => {
            const res = await axiosSecure.get('/winners/recent');
            return res.data;
        }
    });

    const winners = data?.winners || [];
    const totalWinners = data?.totalWinners || 0;

    return (
        <section className="py-16 bg-linear-to-r from-indigo-50 to-pink-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-3">
                        Our Winners Are Winning Big!
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        🚀 You Could Be Next!
                        Join contests, showcase your skills, and become our next winner!
                    </p>

                    <div className="mt-6">
                        <span className="badge badge-success badge-lg">
                            {totalWinners}+ Winners 👑
                        </span>
                    </div>
                </div>

                {/* Winners Card */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {winners.map(winner => (
                        <div
                            key={winner._id}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition"
                        >

                            <img
                                src={winner.contestImage}
                                className="h-44 w-full object-cover"
                            />

                            <div className="p-5">
                                <div className="flex items-center gap-3 mb-3">
                                    <img
                                        src={winner.participant.photoURL}
                                        className="w-12 h-12 rounded-full border-2 border-primary"
                                    />
                                    <div>
                                        <p className="font-semibold">
                                            {winner.participant.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Winner 🏆
                                        </p>
                                    </div>
                                </div>

                                <h4 className="font-semibold text-lg mb-1">
                                    {winner.contestName}
                                </h4>

                                <p className="text-sm text-gray-600 mb-3">
                                    Prize Money
                                </p>

                                <span className="badge badge-primary badge-lg">
                                    ${winner.prizeMoney}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WinnerAdvertisement;
