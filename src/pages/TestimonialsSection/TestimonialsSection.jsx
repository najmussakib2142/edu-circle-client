import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaQuoteLeft, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
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
  // const [showAll, setShowAll] = useState(false);
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

  // const displayedTestimonials = showAll
  //   ? dynamicTestimonials.slice(0, 6) // Show up to 6 cards
  //   : dynamicTestimonials.slice(0, 3); // Initially show 3

  return (
    <section className="py-20 bg-white dark:bg-[#020617] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 lg:px-16 relative">
        {/* Decorative Background Element */}
        {/* <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-400/10 blur-3xl rounded-full" /> */}

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            What Our <span className="text-indigo-600">Community</span> Says
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real stories from people who have transformed their workflow with our platform.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {dynamicTestimonials.map((t, index) => (
              <CarouselItem
                key={t.id || index}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="group relative bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-indigo-500/50 transition-all flex flex-col h-full hover:shadow-2xl  p-8    duration-300 shadow-sm "
                >
                  <FaQuoteLeft className="text-indigo-200 dark:text-indigo-900/40 text-4xl absolute top-6 right-8" />

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`h-4 w-4 ${i < t.rating
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-700"
                          }`}
                      />
                    ))}
                  </div>

                  {/* Message */}
                  <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed mb-8 grow">
                    "{t.message}"
                  </p>

                  {/* User */}
                  <div className="flex items-center gap-4 mt-auto">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/20"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {t.name}
                      </h3>
                      <p className="text-sm text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>


        <div className="pt-16 flex flex-col sm:flex-row justify-center items-center gap-6">
          {/* {dynamicTestimonials.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-2 text-gray-600 dark:text-gray-300 font-semibold hover:dark:text-gray-400 hover:text-gray-700  transition-colors"
            }>
              <span className="border-2 px-8 py-4 rounded-lg border-gray-500 group-hover:border-gray-700 transition-all">
                {showAll ? "Show fewer stories" : "Read all stories"}
              </span>
            </button>
          )} */}

          {user && (
            <Link to="/submit-review">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.02)" }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 border border-slate-200 dark:border-white/10 dark:text-white rounded-full text-sm font-medium tracking-wide transition-colors flex items-center gap-3 group"
              >
                Share Your Experience
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  className="text-indigo-500"
                >
                  <FaArrowRight />
                </motion.span>
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </section >

  );
};

export default TestimonialsSection;
