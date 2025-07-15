import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router';
import { motion } from "motion/react"

const Banner = () => {
    return (
        <section className="max-w-7xl mx-auto">
            <div className="overflow-hidden">
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
                            src="https://i.ibb.co/MkLJ0jjV/9632519-4190402.jpg"
                            alt="Slide 1"
                            className="w-full h-[450px] md:h-[550px] object-cover"
                        />
                    </div>
                    <div>
                        <img
                            src="https://i.ibb.co/xtBw6w1q/2148419502.jpg"
                            alt="Slide 2"
                            className="w-full h-[450px] md:h-[550px] object-cover"
                        />
                    </div>
                    <div>
                        <img
                            src="https://i.ibb.co/F44bhR2r/13741376-2011-i203-016-hobby-cartoon.jpg"
                            alt="Slide 3"
                            className="w-full h-[450px] md:h-[550px] object-cover"
                        />
                    </div>
                </Carousel>
            </div>
            <div className="text-center py-12 px-5">
                <motion.h1
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, transition: { duration: 1 } }}
                    className="text-4xl md:text-5xl font-bold text-[#101828] dark:text-gray-300">
                    Discover Your Hobby Tribe
                </motion.h1>
                <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, transition: { duration: 2 } }}
                    className="text-gray-600 dark:text-gray-500 text-lg md:text-xl mt-4 max-w-3xl mx-auto">
                    Join vibrant hobby groups, meet like-minded people, and fuel <br className="hidden md:block" /> your passion.
                </motion.p>

                <div className='flex flex-col items-center mt-4'>
                    <div className="join border rounded-md">
                        <div>
                            <label className="input validator join-item">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
                                <input type="text" placeholder="" required />
                            </label>
                            <div className="validator-hint hidden">Enter valid email address</div>
                        </div>
                        <button className="btn btn-ghost join-item">Search</button>
                    </div>

                    <Link to={'/allGroups'}>
                        <button className="mt-4 border-blue-600 border-s-8 border-b-8  bg-primary hover:text-primary hover:bg-base-100  hover:border hover:border-primary text-white font-semibold px-6 py-3 rounded-lg transition">
                            Browse Hobby Groups
                        </button>
                        {/* <button className="mt-8 bg-primary dark:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg transition hover:text-primary dark:hover:text-secondary hover:bg-base-100 dark:hover:bg-gray-700 hover:border hover:border-primary dark:hover:border-secondary">
                        Browse Hobby Groups
                    </button> */}

                    </Link>

                </div>
            </div>
        </section>);
};

export default Banner;