import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-toastify/dist/ReactToastify.css";

const Banner = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email.trim()) {
            toast.error("Please enter a valid email.", { position: "top-right" });
            return;
        }
        toast.success("🎉 Successfully subscribed!", { position: "top-right", autoClose: 2500 });
        setEmail("");
    };

    return (
        <section className="relative  w-full h-[100vh] overflow-hidden">
            {/* ===== Carousel Background ===== */}
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                showArrows={false}
                interval={5000}
                transitionTime={1200}
                className="absolute top-0 left-0 w-full h-full"
            >
                {[
                    "https://i.ibb.co/SXHXph8F/12063795-4884785.jpg",
                    "https://i.ibb.co/mCdBL1xd/10276612-4421964.jpg",
                    "https://i.ibb.co/B2w7Q7dx/10276620-4416626.jpg",
                ].map((src, i) => (
                    <div className="w-full h-[100vh] md:h-[100vh]">
                        <img
                            src={src}
                            alt={`Slide ${i + 1}`}
                            className="w-full h-full object-cover brightness-75 dark:brightness-50"
                        />
                    </div>
                ))}
            </Carousel>

            {/* ===== Gradient Overlay ===== */}
            <div className="bg-gradient-to-r from-[var(--color-primary)]/30 via-[var(--color-secondary)]/20 to-[var(--color-accent)]/30
dark:from-[var(--color-primary)]/40 dark:via-[var(--color-secondary)]/30 dark:to-[var(--color-accent)]/30
"></div>

            {/* ===== Hero Content ===== */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center h-full px-4 md:px-10">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text
               bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)]
               drop-shadow-lg"
                >
                    Welcome to eduCircle
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-lg md:text-2xl text-gray-100 dark:text-gray-200 mt-4 max-w-3xl leading-relaxed"
                >
                    Learn, grow, and achieve with top instructors. Empower your education journey and take your skills to the next level.
                </motion.p>

                {/* ===== Glassmorphic Form Card ===== */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-8 bg-white/20 dark:bg-gray-800/30 backdrop-blur-md rounded-xl shadow-xl p-6 flex flex-col md:flex-row items-center gap-4 w-full max-w-xl"
                >
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email..."
                        className="flex-1 px-4 py-3 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none bg-white/50 dark:bg-gray-700/50"
                    />
                    <button
                        onClick={handleSubscribe}
                        className="px-6 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-lg transition-transform transform hover:scale-105"
                    >
                        Subscribe
                    </button>
                </motion.div>

                {/* ===== CTA Button ===== */}
                <Link to="/assignments">
                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "#7F3DFF" }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold shadow-xl hover:shadow-2xl transition-all"
                    >
                        Discover Your Circle
                    </motion.button>
                </Link>
            </div>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover />
        </section>
    );
};

export default Banner;
