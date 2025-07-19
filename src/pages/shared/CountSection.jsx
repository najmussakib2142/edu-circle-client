import React from 'react';
import CountUp from 'react-countup';
import { FaGraduationCap, FaChalkboardTeacher, FaBookOpen, FaGlobe } from 'react-icons/fa';

const stats = [
  {
    icon: <FaGraduationCap className="text-5xl text-blue-600" />,
    value: 1200,
    label: 'Students Successfully Enrolled',
  },
  {
    icon: <FaChalkboardTeacher className="text-5xl text-green-600" />,
    value: 100,
    label: 'Certified Expert Instructors',
  },
  {
    icon: <FaBookOpen className="text-5xl text-purple-600" />,
    value: 50,
    label: 'Interactive Courses Offered',
  },
  {
    icon: <FaGlobe className="text-5xl text-pink-600" />,
    value: 30,
    label: 'Global Learning Partners',
  },
];

const CountSection = () => {
  return (
    <section className="py-16 bg-transparent">
      <div className="max-w-5xl mx-auto px-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Our Growing Community
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-xl transition-transform hover:scale-105"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="mb-4 flex justify-center">{stat.icon}</div>
              <h3 className="text-4xl font-extrabold text-blue-700 dark:text-white">
                <CountUp end={stat.value} duration={4} />+
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountSection;
