import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const Banner = () => {
    return (
        <section className=" bg-gradient-to-t dark:bg-gradient-to-b from-blue-100 via-indigo-100 to-purple-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900  ">
            <div className='max-w-5xl mx-auto'>
                <div className="overflow-hidden rounded-xl">
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
                                className="w-full h-[450px] md:h-[550px] object-cover"
                            />
                        </div>
                        <div>
                            <img
                                src="https://i.ibb.co/mCdBL1xd/10276612-4421964.jpg"
                                alt="Slide 2"
                                className="w-full h-[450px] md:h-[550px] object-cover"
                            />
                        </div>
                        <div>
                            <img
                                src="https://i.ibb.co/B2w7Q7dx/10276620-4416626.jpg"

                                alt="Slide 3"
                                className="w-full h-[450px] md:h-[550px] object-cover"
                            />
                        </div>
                    </Carousel>
                </div>


                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center relative pb-10 pt-5 px-5"
                >
                    <motion.h1
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-[#101828] dark:text-gray-200"
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


                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center mt-4"
                    >
                        <form className="join border shadow-2xl rounded-md">
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
                            <button className="btn btn-ghost join-item">Subscribe</button>
                        </form>


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
            </div>
        </section>
    );
};

export default Banner;
