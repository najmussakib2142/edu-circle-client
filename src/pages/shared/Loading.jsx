import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#020617] transition-colors duration-500">
      {/* Animated logo or brand text */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-6"
      >
        EduCircle
      </motion.h1>

      {/* Animated loading dots */}
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className="w-3 h-3 bg-indigo-500 dark:bg-indigo-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-3 h-3 bg-indigo-500 dark:bg-indigo-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-3 h-3 bg-indigo-500 dark:bg-indigo-300 rounded-full animate-bounce"></span>
      </motion.div>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-gray-600 dark:text-gray-400 text-sm"
      >
        Preparing your learning space...
      </motion.p>
    </div>
  );
};

export default Loading;
