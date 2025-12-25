import React from "react";
import { FaUserPlus, FaBookOpen, FaGraduationCap } from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <FaUserPlus size={24} />,
    title: "Sign Up",
    description: "Create your free eduCircle account to start your learning journey.",
  },
  {
    icon: <FaBookOpen size={24} />,
    title: "Browse Assignments",
    description: "Explore courses and assignments tailored to your interests.",
  },
  {
    icon: <FaGraduationCap size={24} />,
    title: "Learn & Achieve",
    description: "Complete assignments and reach your learning goals.",
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-[#020617] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Start Your Journey in <span className="text-indigo-600">3 Steps</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            We’ve simplified the process so you can focus on what matters: your education.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Desktop Connecting Line: 
            Adjusted top-12 (half of w-24) to hit the center of the icon box perfectly.
          */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 dark:bg-gray-800 z-0" />
          
          {/* Mobile Connecting Line:
            Aligned with the left-aligned icons.
          */}
          <div className="md:hidden absolute left-[31px] top-0 w-0.5 h-full bg-gray-100 dark:bg-gray-800 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex md:flex-col items-start md:items-center gap-6 md:gap-0 group"
              >
                {/* Icon Circle Container */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 md:w-24 md:h-24 relative flex items-center justify-center bg-white dark:bg-[#020617]">
                    
                    {/* WATERMARK NUMBER - Positioned behind icon */}
                    <span className="absolute inset-0 flex items-center justify-center text-7xl md:text-8xl font-black text-gray-50 dark:text-gray-900 select-none pointer-events-none -z-10 transition-colors group-hover:text-indigo-50 dark:group-hover:text-indigo-900/20">
                      {index + 1}
                    </span>

                    {/* THE ICON BOX */}
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white dark:bg-gray-800 border-2 border-indigo-600 flex items-center justify-center text-indigo-600 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white">
                      {step.icon}
                    </div>

                    {/* MOBILE BADGE */}
                    <div className="md:hidden absolute -top-1 -left-1 w-6 h-6 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-950">
                      {index + 1}
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="md:text-center md:mt-6 pt-2 md:pt-0">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;