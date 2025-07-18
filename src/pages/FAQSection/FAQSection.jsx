import React from "react";

const FAQSection = () => {
    return (
        <div className="my-16 px-6 md:px-12 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center dark:text-white">
                Frequently Asked Questions
            </h2>

            <div className="space-y-4">
                <div className="collapse hover:scale-105 transition duration-300 hover:shadow-lg collapse-arrow bg-base-100 border border-base-300 rounded-lg">
                    <input type="radio" name="faq-accordion" defaultChecked />
                    <div
                        tabIndex={0}
                        className="collapse-title font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                    >
                        Who can create assignments?
                    </div>
                    <div className="collapse-content text-base px-4 pb-4">
                        Any logged-in user can create assignments. Each assignment requires a title, description, marks, due date, and difficulty level.
                    </div>
                </div>

                <div className="collapse hover:scale-105 transition duration-300 hover:shadow-lg collapse-arrow bg-base-100 border border-base-300 rounded-lg">
                    <input type="radio" name="faq-accordion" />
                    <div
                        tabIndex={0}
                        className="collapse-title font-semibold"
                    >
                        Can I submit multiple assignments?
                    </div>
                    <div className="collapse-content text-base px-4 pb-4">
                        Yes. Users can submit one assignment per task. Submissions are stored and can be updated before the deadline.
                    </div>
                </div>

                <div className="collapse hover:scale-105 transition duration-300 hover:shadow-lg collapse-arrow bg-base-100 border border-base-300 rounded-lg">
                    <input type="radio" name="faq-accordion" />
                    <div
                        tabIndex={0}
                        className="collapse-title font-semibold"
                    >
                        Can I grade my own assignments?
                    </div>
                    <div className="collapse-content text-base px-4 pb-4">
                        No. You can only evaluate assignments submitted by others to maintain fairness in the peer review process.
                    </div>
                </div>

                <div className="collapse hover:scale-105 transition duration-300 hover:shadow-lg collapse-arrow bg-base-100 border border-base-300 rounded-lg">
                    <input type="radio" name="faq-accordion" />
                    <div
                        tabIndex={0}
                        className="collapse-title font-semibold"
                    >
                        Is the system secure?
                    </div>
                    <div className="collapse-content text-base px-4 pb-4">
                        Yes. All protected routes use JWT-based authentication integrated with Firebase. Unauthorized users are blocked from accessing sensitive routes.
                    </div>
                </div>

                <div className="collapse hover:scale-105 transition duration-300 hover:shadow-lg collapse-arrow bg-base-100 border border-base-300 rounded-lg">
                    <input type="radio" name="faq-accordion" />
                    <div
                        tabIndex={0}
                        className="collapse-title font-semibold"
                    >
                        Can I use the app in dark mode?
                    </div>
                    <div className="collapse-content text-base px-4 pb-4">
                        Absolutely! A theme toggle button allows users to switch between light and dark themes for better accessibility and comfort.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQSection;
