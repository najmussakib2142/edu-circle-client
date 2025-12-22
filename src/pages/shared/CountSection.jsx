import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { FaGraduationCap, FaChalkboardTeacher, FaBookOpen, FaGlobe } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const CountSection = () => {
  const [stats, setStats] = useState({
    students: 0,
    instructors: 0,
    courses: 0,
    partners: 0,
  });

  // Intersection Observer to trigger CountUp when visible
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Fetch stats from backend
  useEffect(() => {
    fetch("https://edu-circle-server-seven.vercel.app/stats") // Change to your deployed backend URL
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  // Prepare data for mapping
  const statsData = [
    {
      icon: <FaGraduationCap className="text-5xl text-gray-700 dark:text-gray-500" />,
      value: stats.students,
      label: "Students Successfully Enrolled",
    },
    {
      icon: <FaChalkboardTeacher className="text-5xl text-gray-700 dark:text-gray-500" />,
      value: stats.instructors,
      label: "Certified Expert Instructors",
    },
    {
      icon: <FaBookOpen className="text-5xl text-gray-700 dark:text-gray-500" />,
      value: stats.courses,
      label: "Interactive Courses Offered",
    },
    {
      icon: <FaGlobe className="text-5xl text-gray-700 dark:text-gray-500" />,
      value: stats.partners,
      label: "Global Learning Partners",
    },
  ];

  return (
    <section className="py-7 md:py-20 ">
      <div className="max-w-6xl mx-auto px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-16">
          Our Growing Community
        </h2>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500/50 transition-transform hover:scale-102 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <motion.div whileHover={{ scale: 1.2, rotate: 10 }} className="mb-4 flex justify-center">
                {stat.icon}
              </motion.div>
              <h3 className="text-4xl sm:text-5xl font-bold text-indigo-600 dark:text-indigo-400  ">
                {inView ? <CountUp end={stat.value} duration={3} /> : 0}+
              </h3>
              <p className="mt-3 text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountSection;
