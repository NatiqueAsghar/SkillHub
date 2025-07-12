import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../../util/UserContext";
import { FaStar } from "react-icons/fa";


const Rating = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Rating:", rating);
    console.log("Review:", review);
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (review.trim() === "") {
      toast.error("Please enter a review");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post(`/rating/rateUser`, {
        rating: rating,
        description: review,
        username: user.username,
      });
      console.log(data);
      toast.success(data.message);
      setRating(0);
      setReview("");
    } catch (error) {
      console.error(error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
        if (error.response.data.message === "Please Login") {
          localStorage.removeItem("userInfo");
          setUser(null);
          await axios.get("/auth/logout");
          navigate("/login");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-bgd border border-line rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Give a Rating</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <p className="text-white text-base mb-2">Rate stars out of 5:</p>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    className={`text-3xl cursor-pointer ${value <= rating ? "text-yellow-400" : "text-txt"}`}
                    onClick={() => handleStarClick(value)}
                  >
                    <FaStar />
                  </span>
                ))}
              </div>
            </div>
            <textarea
              placeholder="Write a review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full h-32 p-3 rounded-md border border-line focus:outline-none focus:ring-2 focus:ring-tl"
            ></textarea>
            <button
              type="submit"
              className="w-full border border-line hover:bg-gr text-white font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-tl"></div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Rating;