import { useState } from "react";
import { motion } from "framer-motion";
import { FaFolderOpen } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { MdOutlineAssignment, MdOutlineDarkMode, MdLeaderboard } from "react-icons/md";
import { FaSearch, FaUserCheck, FaShieldAlt } from "react-icons/fa";

const FeatureSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full py-7 md:py-20 bg-white dark:bg-[#020617]">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white  mb-12 md:mb-20 text-center "
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Features That Empower Learning
        </motion.h2>

        {/* 📱 Small devices: Folder toggle */}
        <div className="sm:hidden">
          {!open ? (
            <button
              onClick={() => setOpen(true)}
              className="w-full p-6 bg-white dark:bg-gray-800 rounded-xl text-left text-lg font-semibold shadow hover:shadow-md transition flex items-center justify-between"
            >
              <span className="flex items-center gap-3 text-primary dark:text-secondary">
                <FaFolderOpen className="text-2xl" />
                Open Features Folder
              </span>
              <IoChevronDown className="text-xl text-primary dark:text-secondary" />
            </button>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  className=" bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1, delay: i * 0.1 }}
                >
                  <div className="text-3xl mb-4 text-primary dark:text-secondary">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-neutral dark:text-gray-100">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
              <button
                onClick={() => setOpen(false)}
                className="text-sm text-primary dark:text-secondary underline mt-4"
              >
                ▲ Hide Features
              </button>
            </div>
          )}
        </div>

        {/* 💻 Medium and up: Normal grid */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-indigo-500/50 transition-all flex flex-col h-full hover:shadow-2xl p-6  shadow-md "
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.1 }}
            >
              <div className="text-4xl mb-4 text-gray-700 dark:text-gray-500">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-neutral dark:text-gray-100">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    icon: <MdOutlineAssignment />,
    title: "Create & Manage Assignments",
    description:
      "Easily create assignments with detailed inputs, deadlines, and difficulty levels for structured learning.",
  },
  {
    icon: <FaUserCheck />,
    title: "Peer Review & Collaboration",
    description:
      "Submit assignments and receive feedback from peers to boost collaborative learning and engagement.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Auth System",
    description:
      "Safe login using Firebase + JWT with protected routes for authenticated access only.",
  },
  {
    icon: <FaSearch />,
    title: "Smart Search & Filtering",
    description:
      "Quickly find assignments using keyword search and filters for difficulty levels and categories.",
  },
  {
    icon: <MdOutlineDarkMode />,
    title: "Dark & Light Mode",
    description:
      "Switch seamlessly between dark and light themes for a comfortable experience anytime.",
  },
  {
    icon: <MdLeaderboard />,
    title: "Progress Tracking",
    description:
      "Track submitted and pending assignments, marks, and feedback in one centralized dashboard.",
  },
];

export default FeatureSection;
