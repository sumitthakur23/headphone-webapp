import React, { useState, useEffect } from "react";

const ReviewsManage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch reviews from the API
  const fetchReviews = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/reviews/all");
      if (!response.ok) {
        throw new Error("Failed to fetch reviews.");
      }
      // console.log(response)
      const data = await response.json();
      console.log(data)
      setReviews(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Handle delete review
  const handleDelete = async (id) => {
    try {
      // Retrieve the token (assuming it's stored in localStorage or cookies)
      const token = localStorage.getItem("token") || ""; // or get from cookies
      console.log(id)
      // Send DELETE request with token in Authorization header
      const response = await fetch(
        `http://localhost:5000/api/v1/reviews/review/${id}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
  
      console.log(response);
  
      if (!response.ok) {
        throw new Error("Failed to delete the review.");
      }
  
      setReviews(reviews.filter((review) => review._id !== id));
      alert("Review has been deleted successfully.");
    } catch (err) {
      alert(err.message);
    }
  };
  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-800">Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Manage Reviews</h1>
          <p className="text-gray-600 mt-2">View and manage user-submitted reviews for products.</p>
        </div>

        {/* Reviews Section */}
        {reviews.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No reviews available.</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Review ID */}
                <div className="mb-2">
                  <strong className="text-gray-800">Review ID:</strong> {review._id}
                </div>

                {/* Ratings */}
                <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <strong className="text-gray-800">Overall Rating:</strong>{" "}
                    {renderStars(review.rating)}
                  </div>
                  <div>
                    <strong className="text-gray-800">Battery Backup:</strong>{" "}
                    {renderStars(review.rating)}
                  </div>
                  <div>
                    <strong className="text-gray-800">Build Quality:</strong>{" "}
                    {renderStars(review.rating)}
                  </div>
                  <div>
                    <strong className="text-gray-800">Value for Money:</strong>{" "}
                    {renderStars(review.rating)}
                  </div>
                  <div>
                    <strong className="text-gray-800">Bass Quality:</strong>{" "}
                    {renderStars(review.rating)}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-base italic border-t pt-4">
                  "{review.comment}"
                </p>

                {/* Delete Button */}
                <div className="mt-0 text-right">
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Render stars based on rating
const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i}>
        <svg
          className={`w-5 h-5 inline ${
            i <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 .587l3.668 7.571 8.332 1.151-6.065 5.857 1.432 8.234-7.367-3.868-7.367 3.868 1.432-8.234-6.065-5.857 8.332-1.151z" />
        </svg>
      </span>
    );
  }
  return stars;
};

export default ReviewsManage;
