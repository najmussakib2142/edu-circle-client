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
    fetch("http://localhost:5000/stats") // Change to your deployed backend URL
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  // Prepare data for mapping
  const statsData = [
    {
      icon: <FaGraduationCap className="text-5xl text-blue-600" />,
      value: stats.students,
      label: "Students Successfully Enrolled",
    },
    {
      icon: <FaChalkboardTeacher className="text-5xl text-green-600" />,
      value: stats.instructors,
      label: "Certified Expert Instructors",
    },
    {
      icon: <FaBookOpen className="text-5xl text-purple-600" />,
      value: stats.courses,
      label: "Interactive Courses Offered",
    },
    {
      icon: <FaGlobe className="text-5xl text-pink-600" />,
      value: stats.partners,
      label: "Global Learning Partners",
    },
  ];

  return (
    <section className="py-15 bg-gradient-to-b from-gray-50 dark:from-gray-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-16">
          Our Growing Community
        </h2>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:scale-105 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <motion.div whileHover={{ scale: 1.2, rotate: 10 }} className="mb-4 flex justify-center">
                {stat.icon}
              </motion.div>
              <h3 className="text-4xl sm:text-5xl font-extrabold text-blue-700 dark:text-white">
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
