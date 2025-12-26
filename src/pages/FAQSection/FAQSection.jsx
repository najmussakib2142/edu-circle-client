import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "Who can create assignments?",
    answer: "Any logged-in user can create assignments. Each assignment requires a title, description, marks, due date, and difficulty level.",
  },
  {
    question: "Can I submit multiple assignments?",
    answer: "Yes. Users can submit one assignment per task. Submissions are stored and can be updated before the deadline.",
  },
  {
    question: "Can I grade my own assignments?",
    answer: "No. You can only evaluate assignments submitted by others to maintain fairness in the peer review process.",
  },
  {
    question: "Is the system secure?",
    answer: "Yes. All protected routes use JWT-based authentication integrated with Firebase. Unauthorized users are blocked from accessing sensitive routes.",
  },
  {
    question: "Can I use the app in dark mode?",
    answer: "Absolutely! A theme toggle button allows users to switch between light and dark themes for better accessibility.",
  },
];

const FAQItem = ({ faq, index, activeIndex, setActiveIndex }) => {
  const isOpen = index === activeIndex;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`border-b md:px-4 border-slate-200 dark:border-slate-800 transition-all duration-300 ${
        isOpen ? "bg-indigo-50/30 dark:bg-indigo-500/5" : ""
      }`}
    >
      <button
        onClick={() => setActiveIndex(isOpen ? null : index)}
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
      >
        <span className={`text-lg font-semibold transition-colors ${
          isOpen ? "text-indigo-600 dark:text-indigo-400" : "text-slate-900 dark:text-slate-200"
        }`}>
          {faq.question}
        </span>
        <div className={`p-2 rounded-full transition-transform duration-300 ${
          isOpen ? "rotate-180 bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
        }`}>
          {isOpen ? <FiMinus /> : <FiPlus />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 bg-white dark:bg-[#020617]">
      <div className="max-w-6xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Static Content */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <span className="text-indigo-600 font-bold tracking-widest text-xs uppercase mb-3 block">
              Support Center
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              Got questions? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-fuchsia-500">
                We have answers.
              </span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8">
              Can't find what you're looking for? Reach out to our technical support team for personalized help.
            </p>
            {/* <button className="px-6 py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-full font-bold text-sm transition-transform hover:scale-105 active:scale-95">
              Contact Support
            </button> */}
          </div>
        </div>

        {/* Right Side: Accordion */}
        <div className="lg:col-span-8">
          <div className="border-t border-slate-200 dark:border-slate-800">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                index={index}
                faq={faq}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;