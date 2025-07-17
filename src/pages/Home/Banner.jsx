import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router'; // fixed import
import { motion } from 'framer-motion'; // fixed import

const Banner = () => {
    return (
        <section className="max-w-5xl mx-auto">
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

            {/* Animated Text Block */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center py-12 px-5"
            >
                <motion.h1
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-[#101828] dark:text-gray-300"
                >
                    Welcome to eduCircle
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-gray-600 dark:text-gray-500 text-lg md:text-xl mt-4 max-w-3xl mx-auto"
                >
                    Learn, grow, and achieve with the best courses and instructors. <br className="hidden md:block" />
                </motion.p>

                {/* Search & CTA Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center mt-4"
                >
                    <form className="join border rounded-md">
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
                                <input type="text" placeholder="Your email here" required />
                            </label>
                            <div className="validator-hint hidden">Enter valid email address</div>
                        </div>
                        <button  className="btn btn-ghost join-item">Subscribe</button>
                    </form>

                    {/* CTA Button with hover animation */}
                    <Link to={'/assignments'}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-4 hover:border-primary  hover:border-s-4 hover:border-b-4 bg-gray-800 dark:bg-base-700 dark:border dark:border-primary  hover:bg-base-100 hover:border text-white font-semibold px-6 py-3 rounded-lg transition"
                        >
                            Discover Your Circle
                        </motion.button>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Banner;
