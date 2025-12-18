import { FaBullseye, FaGavel, FaQuestionCircle, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const AboutUs = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-14 space-y-16">

            {/* 🔷 About Creative Arena */}
            <section className="text-center">
                <h2 className="text-4xl font-bold mb-4">About Creative Arena</h2>
                <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    <span className="font-semibold">Creative Arena</span> is a modern online contest hub
                    where designers, developers, photographers, and creative minds compete in
                    skill-based contests. Our goal is to create opportunities for talent to
                    showcase their creativity, earn rewards, and grow professionally.
                </p>
            </section>

            {/* 🎯 Vision & Future Goal */}
            <section className="grid md:grid-cols-2 gap-8">
                <div className="card bg-base-100 shadow-xl p-6">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <FaBullseye className="text-primary" /> Our Vision
                    </h3>
                    <p className="text-gray-600">
                        To become the leading global platform where creativity meets opportunity,
                        empowering individuals to turn skills into success.
                    </p>
                </div>

                <div className="card bg-base-100 shadow-xl p-6">
                    <h3 className="text-xl font-semibold mb-3">Future Goals 🚀</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Introduce international contests</li>
                        <li>Automated prize distribution system</li>
                        <li>AI-based fair judging support</li>
                        <li>Mobile app for Android & iOS</li>
                    </ul>
                </div>
            </section>

            {/* ⚖️ Contest Rules */}
            <section>
                <h3 className="text-3xl font-bold mb-6 flex items-center gap-2">
                    <FaGavel /> Contest Rules
                </h3>

                <div className="card bg-base-100 shadow-xl p-6">
                    <ul className="list-decimal list-inside text-gray-600 space-y-2">
                        <li>Each participant must register and pay the entry fee before submission.</li>
                        <li>Only one submission per participant per contest is allowed.</li>
                        <li>All submissions must be original and plagiarism-free.</li>
                        <li>Late submissions after the deadline are not accepted.</li>
                        <li>The creator’s decision on winners is final.</li>
                        <li>Violation of rules may result in disqualification.</li>
                    </ul>
                </div>
            </section>

            {/* ❓ FAQ Section */}
            <section>
                <h3 className="text-3xl font-bold mb-6 flex items-center gap-2">
                    <FaQuestionCircle /> Frequently Asked Questions
                </h3>

                <div className="space-y-4">
                    <div className="collapse collapse-arrow bg-base-100 shadow">
                        <input type="checkbox" />
                        <div className="collapse-title font-medium">
                            How do I participate in a contest?
                        </div>
                        <div className="collapse-content text-gray-600">
                            Register an account, choose a contest, pay the entry fee, and submit your work before the deadline.
                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 shadow">
                        <input type="checkbox" />
                        <div className="collapse-title font-medium">
                            Can I join multiple contests at the same time?
                        </div>
                        <div className="collapse-content text-gray-600">
                            Yes, you can participate in multiple contests as long as you meet the requirements.
                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 shadow">
                        <input type="checkbox" />
                        <div className="collapse-title font-medium">
                            How are winners selected?
                        </div>
                        <div className="collapse-content text-gray-600">
                            Winners are selected by the contest creator based on creativity, quality, and task requirements.
                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 shadow">
                        <input type="checkbox" />
                        <div className="collapse-title font-medium">
                            When do winners receive prize money?
                        </div>
                        <div className="collapse-content text-gray-600">
                            Prize money is distributed after the creator declares the winner.
                        </div>
                    </div>
                </div>
            </section>

            {/* 📞 Contact & Support */}
            <section>
                <h3 className="text-3xl font-bold mb-6 flex items-center gap-2">
                    <FaEnvelope /> Contact & Support
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="card bg-base-100 shadow-xl p-6">
                        <h4 className="font-semibold mb-2">Email Support</h4>
                        <p className="text-gray-600">support@creativearena.com</p>
                    </div>

                    <div className="card bg-base-100 shadow-xl p-6">
                        <h4 className="font-semibold mb-2">Office Address</h4>
                        <p className="text-gray-600 flex items-center gap-2">
                            <FaMapMarkerAlt /> Dhaka, Bangladesh
                        </p>
                    </div>

                    <div className="card bg-base-100 shadow-xl p-6">
                        <h4 className="font-semibold mb-2">Help Center</h4>
                        <p className="text-gray-600">
                            Available 24/7 for contest and payment related issues.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutUs;
