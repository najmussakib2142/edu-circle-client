import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
import axios from "axios";
// import { FaStar,  } from "react-icons/fa";

// Static fallback testimonials
const fallbackTestimonials = [
  {
    name: "Alice Johnson",
    role: "Student",
    message: "EduCircle helped me understand concepts clearly and excel in my courses!",
    avatar: "https://i.ibb.co/3x5XbBk/jonas-kakaroto-KIPqvv-TOC1s-unsplash-1.jpg",
    rating: 5,
  },
  {
    name: "Michael Smith",
    role: "Instructor",
    message: "I enjoy teaching on EduCircle. The platform makes it easy to reach students worldwide.",
    avatar: "https://i.ibb.co/GKCyC22/20597.jpg",
    rating: 5,
  },
  {
    name: "Sofia Lee",
    role: "Student",
    message: "Assignments are well structured and the feedback is always helpful!",
    avatar: "https://i.ibb.co/zWg8KhYQ/15519.jpg",
    rating: 4,
  },
];

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const TestimonialsSection = () => {
  const [dynamicTestimonials, setDynamicTestimonials] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const user = useAuth();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get("https://edu-circle-server-seven.vercel.app/reviews");
        const mappedReviews = data.map((r) => ({
          name: r.userName,
          role: r.userEmail, // or role if available
          message: r.message,
          avatar: r.userPhoto || "https://i.ibb.co/default-avatar.png",
          rating: r.rating,
        }));
        // Combine dynamic and fallback and shuffle
        const combined = shuffleArray([...mappedReviews, ...fallbackTestimonials]);
        setDynamicTestimonials(combined);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        // fallback only
        setDynamicTestimonials(shuffleArray(fallbackTestimonials));
      }
    };
    fetchReviews();
  }, []);

  const displayedTestimonials = showAll
    ? dynamicTestimonials.slice(0, 6) // Show up to 6 cards
    : dynamicTestimonials.slice(0, 3); // Initially show 3

  return (
    <section className="py-20 bg-white/60 dark:bg-gray-950/60 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Decorative Background Element */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-400/10 blur-3xl rounded-full" />

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            What Our <span className="text-indigo-600 dark:text-indigo-400">Community</span> Says
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real stories from people who have transformed their workflow with our platform.
          </p>
        </div>

        {/* Grid with auto row heights to handle varying content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
          <AnimatePresence mode="popLayout">
            {displayedTestimonials.map((t, index) => (
              <motion.div
                key={t.id || index}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 p-8 rounded-3xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col h-full"
              >
                <FaQuoteLeft className="text-indigo-200 dark:text-indigo-900/40 text-4xl absolute top-6 right-8" />

                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`h-4 w-4 ${i < t.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-700"}`}
                    />
                  ))}
                </div>

                <p className="relative z-10 text-gray-700 dark:text-gray-300 italic leading-relaxed mb-8 flex-grow">
                  "{t.message}"
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="relative">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/20"
                    />
                    <div className="absolute inset-0 rounded-full shadow-inner" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white leading-tight">
                      {t.name}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-500 font-medium">
                      {t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-6">
          {dynamicTestimonials.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-2 text-gray-600 dark:text-gray-300 font-semibold hover:dark:text-gray-400 hover:text-gray-700  transition-colors"
            >
              <span className="border-2 px-8 py-4 rounded-lg border-gray-500 group-hover:border-gray-700 transition-all">
                {showAll ? "Show fewer stories" : "Read all stories"}
              </span>
            </button>
          )}

          {user && (
            <Link to="/submit-review">
              <motion.button
                whileHover={{ scale: 1.03, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gray-700 dark:bg-gray-500  text-white rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                Share Your Experience
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </section>

  );
};

export default TestimonialsSection;
