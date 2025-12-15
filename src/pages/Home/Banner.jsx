import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Banner = () => {
    const [searchType, setSearchType] = useState('');
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data: contests = [] } = useQuery({
        queryKey: ['searchContests', searchType],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/search-contests?type=${searchType}`
            );
            return res.data;
        },
        enabled: searchType.length >= 2,
    });

    const suggestions = useMemo(() => {
        const types = contests.map(c => c.contestType);
        return [...new Set(types)].slice(0, 6);
    }, [contests]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchType) return;
        navigate(`/contests?type=${searchType}`);
    };

    return (
        <div className="relative w-full h-[500px] overflow-hidden flex items-center justify-center">
            <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80"
                alt="Creative Banner"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
            />

            <div className="relative z-10 text-center text-black px-4 w-full">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Welcome to Creative Arena
                </h1>
                <p className="text-lg md:text-2xl mb-8">
                    Discover, participate, and win amazing creative contests
                </p>

                {/* Search */}
                <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
                    <input
                        type="text"
                        placeholder="Search by contest type..."
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                        className="w-full bg-gray-200 px-4 py-3 rounded-lg text-gray-800 focus:outline-none"
                    />

                    {/* Suggestions dropdown */}
                    {suggestions.length > 0 && (
                        <ul className="absolute top-full left-0 right text-gray-800 rounded-lg shadow-lg mt-1 z-20">
                            {suggestions.map((type, index) => (
                                <li
                                    key={index}
                                    onClick={() => navigate(`/all-contests?type=${encodeURIComponent(type)}`)}
                                    className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                                >
                                    {type}
                                </li>
                            ))}
                        </ul>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Banner;
