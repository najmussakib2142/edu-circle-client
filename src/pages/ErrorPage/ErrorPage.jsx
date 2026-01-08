import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import errorIllustration from '../../assets/lotties/errorIllustration.json';
import Lottie from 'lottie-react';

const ErrorPage = () => {
    const navigate = useNavigate();
console.log("🧭 Router source:", useNavigate.toString());

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#cfe2ff] via-white to-[#e0e7ff] dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-6">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl bg-white shadow-xl rounded-xl p-8 text-center"
            >
                {/* <img
          src={errorIllustration}
          alt="Error Illustration"
          className="mx-auto w-72 h-72 object-contain mb-6"
        /> */}
                <Lottie className='mx-auto w-72 h-72 object-contain mb-6' style={{  }} animationData={errorIllustration} loop={true} ></Lottie>


                <h1 className="text-4xl font-bold text-primary mb-2">Oops! Something went wrong</h1>
                <p className="text-gray-600 mb-6">
                    The page you're looking for doesn't exist or something broke.
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGoHome}
                    className="btn btn-primary"
                >
                    Go Back Home
                </motion.button>
            </motion.div>
        </div>
    );
};

export default ErrorPage;
