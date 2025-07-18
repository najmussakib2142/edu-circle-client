import { useState } from "react";
import { motion } from "framer-motion";
import { FaFolderOpen } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";


const FeatureSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full py-12  bg-blue-100 dark:bg-gray-700
 ">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-10 text-center"
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
              className="w-full p-6 bg-gray-100 dark:bg-gray-800 rounded-xl text-left text-lg font-semibold shadow hover:shadow-md transition flex items-center justify-between"
            >
              <span className="flex items-center gap-3 text-blue-600">
                <FaFolderOpen className="text-2xl" />
                Open Features Folder
              </span>
              <IoChevronDown className="text-xl text-blue-600" />
            </button>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1, delay: i * 0.1 }}
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm">{feature.description}</p>
                </motion.div>
              ))}
              <button
                onClick={() => setOpen(false)}
                className="text-sm text-blue-600 underline mt-4"
              >
                ▲ Hide Features
              </button>
            </div>
          )}
        </div>

        {/* 💻 Medium and up: Normal grid */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1, delay: i * 0.1 }}
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    icon: "📚",
    title: "Create & Manage Assignments",
    description:
      "Easily create assignments with detailed inputs including difficulty levels and due dates. Great for structured group study.",
  },
  {
    icon: "✅",
    title: "Peer Review & Grading",
    description:
      "Submit assignments and let your friends review and provide constructive feedback to boost collaborative learning.",
  },
  {
    icon: "🕵️",
    title: "Secure Auth with JWT + Firebase",
    description:
      "Enjoy a secure login system using Firebase and JWT with protected routes for authenticated access only.",
  },
  {
    icon: "🔍",
    title: "Filter & Search Assignments",
    description:
      "Find the right tasks with powerful filters based on difficulty levels and keyword search using MongoDB queries.",
  },
  {
    icon: "🌙",
    title: "Dark & Light Theme Support",
    description:
      "Switch seamlessly between dark and light modes for a comfortable user experience, day or night.",
  },
  {
    icon: "📈",
    title: "Progress Tracking",
    description:
      "View your submitted and pending assignments, their status, marks, and feedback in one place.",
  },
];

export default FeatureSection;
