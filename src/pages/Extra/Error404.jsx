
import { FaHome, FaSearch, FaTrophy } from "react-icons/fa";
import { Link } from "react-router";

const Error404 = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="text-center max-w-lg">

                {/* Big 404 */}
                <h1 className="text-9xl font-extrabold text-primary drop-shadow">
                    404
                </h1>

                {/* Message */}
                <h2 className="text-3xl font-bold mt-4">
                    Oops! Page Not Found
                </h2>

                <p className="text-gray-600 mt-3">
                    Looks like you're lost 😅
                    The page you're trying to reach has been moved, deleted,
                    or never created.
                </p>

                {/* Illustration */}
                <div className="flex justify-center mt-6">
                    <FaTrophy className="text-7xl text-warning opacity-80" />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <Link to="/" className="btn btn-primary gap-2">
                        <FaHome /> Go Home
                    </Link>

                    <Link to="/all-contests" className="btn btn-outline gap-2">
                        <FaSearch /> Browse Contests
                    </Link>
                </div>

                {/* Footer Text */}
                <p className="text-sm text-gray-400 mt-8">
                    Creative Arena © {new Date().getFullYear()}
                </p>
            </div>
        </div>
    );
};

export default Error404;
