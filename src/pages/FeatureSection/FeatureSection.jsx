import { motion } from "framer-motion";

const FeatureSection = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-bold mb-10"      
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Features That Empower Learning
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
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
