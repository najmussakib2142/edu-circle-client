import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
import axios from "axios";

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
        const { data } = await axios.get("http://localhost:5000/reviews");
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
    <section className="py-15 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-12">
          What Our Community Says
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedTestimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:scale-105"
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-gray-700 dark:text-gray-300 mb-4">{t.message}</p>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`h-5 w-5 ${
                      i < t.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white">{t.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t.role}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
  {dynamicTestimonials.length > 3 && (
    <button
      onClick={() => setShowAll(!showAll)}
      className="px-6 py-3 bg-indigo-500 dark:bg-indigo-500 text-white rounded-lg font-semibold transition"
    >
      {showAll ? "Show Less" : "Show More"}
    </button>
  )}

  {user && (
    <Link to="/submit-review">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-indigo-500 dark:bg-indigo-500 text-white rounded-lg font-semibold transition"
      >
        Submit Your Review
      </motion.button>
    </Link>
  )}
</div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
