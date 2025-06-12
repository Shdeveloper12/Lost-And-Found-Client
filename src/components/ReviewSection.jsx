import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
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

  const fetchReviews = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews`);
    const data = await res.json();

    // Sort by newest
    const sorted = data.sort(
      (a, b) =>
        new Date(b._id.toString().substring(0, 8) * 1000) -
        new Date(a._id.toString().substring(0, 8) * 1000)
    );

    setReviews(sorted);

    const existing = user ? sorted.find((rev) => rev.email === user.email) : null;
    if (existing) {
      setUserReview(existing);
      setDescription(existing.description);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      email: user.email,
      name: user.displayName,
      photo: user.photoURL,
      description,
    };

    try {
      let res;
      if (userReview) {
        res = await fetch(
          `${import.meta.env.VITE_API_URL}/reviews/${userReview._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reviewData),
          }
        );
      } else {
        res = await fetch(`${import.meta.env.VITE_API_URL}/reviews`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reviewData),
        });
      }

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: userReview ? "Review updated!" : "Review submitted!",
        });
        setShowForm(false);
        fetchReviews();
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="p-6 bg-base-100 rounded shadow mb-8 mt-16">
      <h2 className="text-2xl font-bold text-center  mb-6">
        What Our Users Say
      </h2>

      {/* Reviews */}
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
                <div className="w-24 bg-orange-200 rounded-full p-2">
                  <img
                    src={r.photo}
                    alt="user"
                    className="h-22 rounded-full"
                  />
                </div>
              </div>
              <div>
                <p className="font-semibold">{r.name}</p>
                <p className="text-sm text-gray-600">{r.email}</p>
              </div>
              <p className="text-gray-700 mb-3">{r.description}</p>
            </div>
          ))}
        </Carousel>
      ) : (
        <p className="text-center text-gray-500 text-xl font-semibold">
          No Review Yet Now
        </p>
      )}

      {/* Toggle Form */}
      {user && (
        <div className="text-center mt-8">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-outline btn-warning"
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
                    className="btn btn-outline btn-error"
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
