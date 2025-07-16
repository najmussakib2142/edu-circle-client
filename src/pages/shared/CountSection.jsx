import React from 'react';
import CountUp from 'react-countup';
import { FaGraduationCap, FaChalkboardTeacher, FaBookOpen } from 'react-icons/fa';

const stats = [
  {
    icon: <FaGraduationCap className="text-4xl text-blue-500" />,
    value: 1200,
    label: 'Students Enrolled',
  },
  {
    icon: <FaChalkboardTeacher className="text-4xl text-green-500" />,
    value: 85,
    label: 'Expert Instructors',
  },
  {
    icon: <FaBookOpen className="text-4xl text-purple-500" />,
    value: 250,
    label: 'Courses Available',
  },
];

const CountSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
          Our Impact
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition"
              data-aos="fade-up"
              data-aos-delay={index * 100} // << This is perfectly placed here
            >
              <div className="mb-4 flex justify-center">{stat.icon}</div>
              <h3 className="text-4xl font-extrabold text-blue-600 dark:text-white">
                <CountUp end={stat.value} duration={2.5} />
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountSection;
