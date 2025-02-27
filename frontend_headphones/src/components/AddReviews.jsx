import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const AddReviews = () => {
  const [ratings, setRatings] = useState({
    overall: 0,
    batteryBackup: 0,
    buildQuality: 0,
    valueForMoney: 0,
    bassQuality: 0,
  });

  const [hoverRatings, setHoverRatings] = useState({
    overall: 0,
    batteryBackup: 0,
    buildQuality: 0,
    valueForMoney: 0,
    bassQuality: 0,
  });

  const [reviewText, setReviewText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(ratings).some((rating) => rating === 0)) {
      alert("Please provide ratings for all categories.");
      return;
    }

    const reviewData = { rating: ratings.overall, comment: reviewText };
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You need to be logged in to submit a review.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/v1/reviews/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) throw new Error("Failed to submit review. Please try again.");
      
      alert("Thank you for your review!");
      setRatings({ overall: 0, batteryBackup: 0, buildQuality: 0, valueForMoney: 0, bassQuality: 0 });
      setHoverRatings({ overall: 0, batteryBackup: 0, buildQuality: 0, valueForMoney: 0, bassQuality: 0 });
      setReviewText("");
      navigate("/");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const renderStars = (category) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={32}
          className={`cursor-pointer transition-transform duration-200 ${
            (hoverRatings[category] || ratings[category]) >= star
              ? "text-yellow-400 scale-125"
              : "text-gray-300"
          }`}
          onClick={() => setRatings((prev) => ({ ...prev, [category]: star }))}
          onMouseEnter={() => setHoverRatings((prev) => ({ ...prev, [category]: star }))}
          onMouseLeave={() => setHoverRatings((prev) => ({ ...prev, [category]: 0 }))}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Your Valuable Feedback</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Ratings Section */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Battery Backup:</label>
                {renderStars("batteryBackup")}
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Build Quality:</label>
                {renderStars("buildQuality")}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Value for Money:</label>
                {renderStars("valueForMoney")}
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Bass Quality:</label>
                {renderStars("bassQuality")}
              </div>
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Overall Rating:</label>
              {renderStars("overall")}
            </div>
          </div>

          {/* Review Text Area */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Your Review:</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your detailed review here..."
              className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm transition-shadow"
              rows="2"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-yellow-500 text-white py-3 px-8 rounded-lg shadow-md font-medium text-lg hover:bg-blue-600 hover:scale-105 transition-transform"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviews;
