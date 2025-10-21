import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Banner = () => {

    const [email, setEmail] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();

        if (email.trim() === "") {
            toast.error("Please enter a valid email address.", {
                position: "top-right",
            });
            return;
        }

        // Simulate successful subscription
        toast.success("🎉 Congratulations! You’ve successfully subscribed.", {
            position: "top-right",
            autoClose: 2500,
        });

        setEmail("");
    };
    return (
        <section className="bg-gradient-to-t dark:bg-gradient-to-b from-blue-100 via-indigo-100 to-purple-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900">
            <div className="max-w-6xl mx-auto px-4 md:px-7">
                {/* ===== Carousel Section ===== */}
                <div className="overflow-hidden rounded-2xl shadow-lg">
                    <Carousel
                        autoPlay
                        infiniteLoop
                        showThumbs={false}
                        showStatus={false}
                        showArrows={false}
                        interval={4000}
                        transitionTime={1000}
                        emulateTouch
                        stopOnHover={false}
                        swipeable={false}
                    >
                        <div>
                            <img
                                src="https://i.ibb.co/SXHXph8F/12063795-4884785.jpg"
                                alt="Slide 1"
                                className="w-full h-[450px] md:h-[550px] object-cover brightness-90"
                            />
                        </div>
                        <div>
                            <img
                                src="https://i.ibb.co/mCdBL1xd/10276612-4421964.jpg"
                                alt="Slide 2"
                                className="w-full h-[450px] md:h-[550px] object-cover brightness-90"
                            />
                        </div>
                        <div>
                            <img
                                src="https://i.ibb.co/B2w7Q7dx/10276620-4416626.jpg"
                                alt="Slide 3"
                                className="w-full h-[450px] md:h-[550px] object-cover brightness-90"
                            />
                        </div>
                    </Carousel>
                </div>

                {/* ===== Text + Form Section ===== */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center pb-10 pt-8"
                >
                    <motion.h1
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 drop-shadow-sm"
                    >
                        Welcome to <span className="text-indigo-600 dark:text-indigo-400">eduCircle</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-gray-700 dark:text-gray-400 text-lg md:text-xl mt-4 leading-relaxed max-w-2xl mx-auto"
                    >
                        Learn, grow, and achieve with the best courses and instructors.
                        Empower your education journey with <span className="font-semibold text-indigo-600 dark:text-indigo-400">eduCircle</span>.
                    </motion.p>

                    {/* ===== Email Subscription + Button ===== */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center mt-6 gap-4"
                    >
                        <form
                            onSubmit={handleSubscribe}
                            className="join border shadow-lg rounded-lg overflow-hidden"
                        >
                            <div>
                                <label className="input validator join-item flex items-center px-3 bg-white dark:bg-gray-800">
                                    <svg
                                        className="h-[1em] opacity-60 mr-2 text-gray-500 dark:text-gray-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <g
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            strokeWidth="2.5"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                        </g>
                                    </svg>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email here"
                                        required
                                        className="bg-transparent focus:outline-none w-full text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                                    />
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="btn bg-indigo-600 text-white hover:bg-indigo-700 join-item px-6 py-2 font-semibold transition"
                            >
                                Subscribe
                            </button>
                        </form>

                        {/* ===== Toast Container ===== */}
                        <ToastContainer
                            position="top-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            pauseOnHover
                            // theme="colored"
                        />

                        <Link to={"/assignments"}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-1 bg-gray-800 dark:bg-gray-700 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
                            >
                                Discover Your Circle
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Banner;
