import React from 'react';
import Logo from '../../../components/Shared/Logo';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Brand */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">

                    <Logo className="w-14 mb-3" />

                    <h2 className="text-2xl font-bold text-primary">
                        Creative Arena
                    </h2>

                    <p className="text-sm opacity-80 mt-2 max-w-xs">
                        A modern contest hub where creativity meets opportunity.
                        Participate, compete, and win exciting prizes.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="text-center">
                    <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li className="hover:text-primary cursor-pointer"><Link to='/all-contests'>All Contests</Link></li>
                        <li className="hover:text-primary cursor-pointer"><Link to='/leaderboard'>Leaderboard</Link></li>
                        <li className="hover:text-primary cursor-pointer"><Link to='/about-us'>About Us</Link></li>
                        <li className="hover:text-primary cursor-pointer"><Link to='/dashboard'>Dashboard</Link></li>




                    </ul>
                </div>

                {/* Social + Contact */}
                <div className="text-center md:text-right">
                    <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>

                    <p className="text-sm opacity-70">
                        support@creativearena.com
                    </p>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-base-300 py-4 text-center text-sm opacity-70">
                © {new Date().getFullYear()} Creative Arena — All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
