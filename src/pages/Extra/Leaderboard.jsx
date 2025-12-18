import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Leaderboard = () => {
    const axiosSecure = useAxiosSecure();

    const { data: leaderboard = [] } = useQuery({
        queryKey: ['leaderboard'],
        queryFn: async () => {
            const res = await axiosSecure.get('/leaderboard');
            return res.data;
        }
    });

    return (
        <div className="min-h-[69vh] p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center"> Leaderboard</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead className="bg-base-200">
                        <tr>
                            <th>Rank</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Total Wins</th>
                        </tr>
                    </thead>

                    <tbody>
                        {leaderboard.map((user, index) => (
                            <tr key={user.email}>
                                <td className="font-bold">
                                    #{index + 1}
                                </td>

                                <td className="flex items-center gap-3">
                                    <img
                                        src={user.photoURL}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <span className="font-semibold">
                                        {user.displayName}
                                    </span>
                                </td>

                                <td>{user.email}</td>

                                <td>
                                    <span className="badge badge-success">
                                        {user.totalWins} Wins
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {leaderboard.length === 0 && (
                    <p className="text-center mt-6 text-gray-500">
                        No winners yet.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
