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
        <section className=" py-16 w-full min-h-[90vh] flex items-center bg-gray-50 dark:bg-gray-950 overflow-hidden">
           <div className="relative max-w-6xl mx-auto   w-full">
             {/* Background Decorative Circles */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

            <div className="container px-8 grid md:grid-cols-2 gap-12 mx-auto items-center z-10">
                {/* Left Column: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-indigo-600 font-semibold tracking-widest uppercase text-sm">
                        Future-Proof Your Career
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mt-4">
                        Unlock Your Potential with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">EduCircle</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-lg">
                        Join over 15,000+ students mastering new skills through interactive assignments and world-class mentorship.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <Link to="/assignments" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-center transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                            Explore Courses
                        </Link>
                        <button className="px-8 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all">
                            Watch Demo
                        </button>
                    </div>

                    {/* Trust Badge */}
                    <div className="flex mt-8  4 flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map((i) => (
                                <img
                                    key={i}
                                    className="w-12 h-12 rounded-full border-4 border-white dark:border-gray-950 object-cover"
                                    src={`https://i.pravatar.cc/150?u=${i + 20}`}
                                    alt="User"
                                />
                            ))}
                            <div className="w-12 h-12 rounded-full border-4 border-white dark:border-gray-950 bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                                +2k
                            </div>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex text-yellow-500 mb-1">
                                {"★".repeat(5)}
                            </div>
                            <p>Trusted by <span className="font-bold text-gray-900 dark:text-white">2,000+</span> global learners</p>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Visual Component */}
                <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative flex-1 flex justify-center items-center mt-12 lg:mt-0"
                    >
                        {/* Main Image Decoration */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
                        
                        <div className="relative z-10 w-full max-w-[500px]">
                            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-[8px] border-white dark:border-gray-800 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                <img 
                                    src="https://i.ibb.co/SXHXph8F/12063795-4884785.jpg" 
                                    alt="Student Learning" 
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Floating Card 1: New Course */}
                            <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-8 -left-8 bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-2xl z-20 hidden md:flex items-center gap-4 border border-gray-100 dark:border-gray-700"
                            >
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-600 text-xl font-bold">
                                    ✓
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Just Added</p>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">UI/UX Masterclass</p>
                                </div>
                            </motion.div>

                            {/* Floating Card 2: Student Stats */}
                            <motion.div 
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-6 -right-6 bg-indigo-600 p-4 rounded-2xl shadow-xl z-20 hidden md:block"
                            >
                                <p className="text-white text-center">
                                    <span className="block text-2xl font-black italic">500+</span>
                                    <span className="text-[10px] uppercase font-medium opacity-80">Courses Online</span>
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
            </div>
           </div>
        </section>
    );
};

export default Banner;
