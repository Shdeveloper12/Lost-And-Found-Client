import React, { useState, useContext } from "react";
import { Navigate, useLoaderData, useNavigate, useNavigation } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

const PostDetailsPages = () => {
  const post = useLoaderData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  if (navigation.state === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-red-500 text-center font-bold text-4xl">
        Post details not found
      </div>
    );
  }

  const {
    _id,
    title,
    name,
    email,
    location,
    category,
    description,
    date,
    types,
    imageurl,
  } = post;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const recoveredLocation = form.recoveredLocation.value;
    const recoveredDate = form.recoveredDate.value;

    const recoveryData = {
      postId: _id,
      userEmail: user?.email,
      userName: user?.displayName,
      userPhoto: user?.photoURL,
      recoveredLocation,
      recoveredDate,
    };

    try {
      const checkRes = await fetch(
        `${import.meta.env.VITE_API_URL}/recovered/check?postId=${_id}&email=${
          user.email
        }`
      );
      const checkData = await checkRes.json();

      if (checkData?.alreadyRecovered) {
        Swal.fire({
          icon: "error",
          title: "Already Recovered!",
          text: "Something went wrong!",
        });
        navigate("/");
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/recovered`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recoveryData),
      });

      const result = await res.json();

      if (result.success) {
        Swal.fire({
          title: "Recover Successfully!",
          icon: "success",
        });
        setShowModal(false);
        navigate( "/allrecovered");
      } else {
        alert("Failed to submit. Please try again.");
      }
    } catch (err) {
      alert("Something went wrong.");
      console.error(err);
    }
  };

  return (
    <div className="p-16">
      <div className="bg-green-300 max-w-3xl mx-auto  shadow-2xl rounded-xl">
        <img
          src={imageurl}
          alt="postImg"
          className="rounded w-full h-full object-cover p-5"
        />
        <div className=" space-y-2 px-8 pb-5">
          <h1 className="text-3xl font-bold mb-3">{title}</h1>
          <p>
            <strong className="font-semibold">Type:</strong> {types}
          </p>
          <p>
            <strong className="font-semibold">Name:</strong> {name}
          </p>
          <p>
            <strong className="font-semibold">Email:</strong> {email}
          </p>
          <p>
            <strong className="font-semibold">Location:</strong> {location}
          </p>
          <p>
            <strong className="font-semibold">Category:</strong> {category}
          </p>
          <p>
            <strong className="font-semibold">Date:</strong> {date}
          </p>
          <p>
            <strong className="font-semibold">Description:</strong>{" "}
            {description}
          </p>

          {types === "Lost" && (
            <>
              <div className="flex justify-center">
                <button
                  onClick={() => setShowModal(true)}
                  className="btn btn-info mt-4 "
                >
                  Found This
                </button>
              </div>
            </>
          )}

          {types === "Found" && (
            <>
              <div className="flex justify-center">
                <button
                  onClick={() => setShowModal(true)}
                  className="btn btn-success flex justify-center mt-4"
                >
                  This is Mine
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-green-200 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <h2 className="text-xl font-bold mb-4 text-center">Recovery Confirmation</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block mb-1 font-medium">
                  Recovered Location
                </label>
                <input
                  type="text"
                  name="recoveredLocation"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1 font-medium">Recovered Date</label>
                <input
                  type="date"
                  name="recoveredDate"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1 font-medium">Your Info</label>
                <input
                  type="text"
                  value={user?.displayName}
                  readOnly
                  className="input input-bordered w-full mb-2"
                />
                <input
                  type="email"
                  value={user?.email}
                  readOnly
                  className="input input-bordered w-full mb-2"
                />
                
              </div>
              <div className="flex justify-between mt-4">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetailsPages;
