import React from "react";
import { FaUserPlus, FaBookOpen, FaGraduationCap } from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <FaUserPlus size={30} />,
    title: "Sign Up",
    description: "Create your free eduCircle account to start your learning journey."
  },
  {
    icon: <FaBookOpen size={30} />,
    title: "Browse Assignments",
    description: "Explore courses and assignments tailored to your interests and skills."
  },
  {
    icon: <FaGraduationCap size={30} />,
    title: "Learn & Achieve",
    description: "Complete assignments, track your progress, and achieve your learning goals."
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral dark:text-gray-100 mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12 text-lg max-w-2xl mx-auto">
          Getting started with eduCircle is simple. Follow these easy steps and start learning today!
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform"
            >
              <div className="text-gray-700 dark:text-gray-500 mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-neutral dark:text-gray-100 mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
