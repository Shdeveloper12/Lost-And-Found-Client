import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const UserReviewSection = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  
  const callApi = async (url, options = {}) => {
    try {
      const res = await fetch(url, {
        ...options,
        credentials: "include",
      });

      if (res.status === 401 || res.status === 403) {
        const errorData = await res.json();
        Swal.fire({
          icon: "error",
          title: "Authentication Error",
          text: errorData.message || "Please log in again.",
        });
        
        throw new Error("Authentication failed"); 
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to process request.");
      }

      return res.json();
    } catch (error) {
      console.error("API Call Error:", error);
    if (!error.message.includes("Authentication failed")) {
        Swal.fire("Error", error.message || "Something went wrong!", "error");
      }
      throw error;
    }
  };

  const fetchReviews = async () => {
    setLoading(true); 
    try {
     
      const data = await callApi(`${import.meta.env.VITE_API_URL}/reviews`);

    
      const sorted = data.sort(
        (a, b) =>
          new Date(b._id.toString().substring(0, 8) * 1000) -
          new Date(a._id.toString().substring(0, 8) * 1000)
      );

      setReviews(sorted);

      const existing = user
        ? sorted.find((rev) => rev.email === user.email)
        : null;
      if (existing) {
        setUserReview(existing);
        setDescription(existing.description);
      } else {
        setUserReview(null); 
        setDescription(""); 
      }
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   
    fetchReviews();
  }, [user]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire("Error", "You must be logged in to submit a review.", "error");
      return;
    }

    const reviewData = {
      email: user.email,
      name: user.displayName,
      photo: user.photoURL,
      description,
    };

    try {
      let resData;
      if (userReview) {
        // Update existing review
        resData = await callApi(
          `${import.meta.env.VITE_API_URL}/reviews/${userReview._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(reviewData),
          }
        );
      } else {
        // Post new review
        resData = await callApi(`${import.meta.env.VITE_API_URL}/reviews`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reviewData),
        });
      }

      // Check for success acknowledge from backend
      if ((resData && resData.acknowledged) || resData.success) {
       
        Swal.fire({
          icon: "success",
          title: userReview ? "Review updated!" : "Review submitted!",
        });
        setShowForm(false);
        fetchReviews(); 
      } else {
        
        Swal.fire("Error", "Review submission failed acknowledged.", "error");
      }
    } catch (err) {
     
      console.error("Review submission error:", err);
    }
  };

  if (loading) return <div className="text-center">Loading reviews...</div>; 

  return (
    <div className="p-6   mb-8 md:mx-5">
      <h2 className="text-2xl font-bold text-center mb-6 primary">
        What Our Users Say
      </h2>

      {/* Reviews Carousel */}
      {reviews.length > 0 ? (
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={5000}
          className="max-w-3xl mx-auto"
        >
          {reviews.map((r) => (
            <div
              key={r._id}
              className={`p-4 rounded pb-5 shadow mx-4 ${
                r.email === user?.email ? "border-2 border-orange-500" : ""
              } bg-gradient-to-r from-orange-300 via-red-300 to-orange-300`}
            >
              <div className="flex justify-center mb-3">
                <div className="w-24 bg-orange-300 rounded-full p-2">
                  <img src={r.photo} alt="user" className="h-22 rounded-full" />
                </div>
              </div>
              <div>
                <p className="font-semibold primary">{r.name}</p>
                <p className="text-sm text-gray-600 secondary">{r.email}</p>
              </div>
              <p className="text-gray-700 mb-3 secondary">{r.description}</p>
            </div>
          ))}
        </Carousel>
      ) : (
        <p className="text-center text-gray-500 text-xl font-semibold primary">
          No Review Yet Now
        </p>
      )}

      {/* Toggle Form */}
      {user && (
        <div className="text-center mt-8">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="bg-orange-400 px-6 py-2 font-semibold hover:cursor-pointer hover:bg-orange-500 transition rounded-md text-white"
            >
              {userReview ? "Edit My Review" : "Write a Review"}
            </button>
          ) : (
            <div className="max-w-xl mx-auto mt-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder="Write your review here..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="flex justify-center space-x-4">
                  <button type="submit" className="btn btn-success">
                    {userReview ? "Update Review" : "Submit Review"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="btn btn-outline btn-error primary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserReviewSection;
