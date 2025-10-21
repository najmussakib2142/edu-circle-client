import React, { useState } from "react";
import { motion } from "framer-motion";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    // Here you can call your backend to save subscription
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000); // hide message after 3 sec
  };

  return (
    <section className="py-20 bg-indigo-600 dark:bg-indigo-800 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="mb-8 text-lg sm:text-xl">
          Get updates on new courses, assignments, and community news directly in your inbox.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <input
            type="email"
            placeholder="Your email here"
            className="w-full sm:w-auto flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-yellow-400 text-indigo-900 font-semibold rounded-lg transition"
          >
            Subscribe
          </motion.button>
        </form>

        {subscribed && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-green-200 font-medium"
          >
            🎉 Thank you for subscribing!
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
