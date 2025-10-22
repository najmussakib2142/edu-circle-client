import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-hot-toast";
import useAccessToken from "../../api/useAccessToken";
import useAuth from "../../hooks/useAuth";

const SubmitReview = () => {
    const user = useAuth();
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(5);
    const [hover, setHover] = useState(0);
    const navigate = useNavigate();
    const { accessToken, loading } = useAccessToken()


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const token = await user.getIdToken();
            await axios.post(
                `https://edu-circle-server-seven.vercel.app/reviews`,
                { message, rating },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            toast.success("Review submitted successfully!");
            navigate("/"); // back to home
        } catch (err) {
            toast.error("Failed to submit review");
            console.error(err);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-20 px-4">
            <h2 className="text-3xl font-bold mb-3 text-center">Share Your Experience</h2>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
                Help our community by submitting your honest review. Your feedback will guide future students and instructors.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <textarea
                    className="p-4    rounded-lg border border-gray-300 dark:border-gray-600"
                    placeholder="Write your review here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />

                <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => {
                        const starValue = i + 1;
                        return (
                            <button
                                type="button"
                                key={i}
                                onClick={() => setRating(starValue)}
                                onMouseEnter={() => setHover(starValue)}
                                onMouseLeave={() => setHover(0)}
                            >
                                <FaStar
                                    className={`h-10 w-10 cursor-pointer transition-colors ${starValue <= (hover || rating)
                                        ? "text-yellow-500"
                                        : "text-gray-300 dark:text-gray-600"
                                        }`}
                                />
                            </button>
                        );
                    })}
                </div>

                <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default SubmitReview;
