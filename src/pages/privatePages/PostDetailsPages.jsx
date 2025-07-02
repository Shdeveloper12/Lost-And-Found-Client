import React, { useState, useContext } from "react";
import {
  Navigate,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

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
      <div  className="text-red-500 text-center font-bold text-4xl secondary">
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
        credentials: "include",
        body: JSON.stringify(recoveryData),
      });

      const result = await res.json();

      if (result.success) {
        Swal.fire({
          title: "Recover Successfully!",
          icon: "success",
        });
        setShowModal(false);
        navigate("/allrecovered");
      } else {
        alert("Failed to submit. Please try again.");
      }
    } catch (err) {
      alert("Something went wrong.");
      console.error(err);
    }
  };

  return (
    <>
    <Helmet>
        <title className="primary">Post Details | Lost & Found</title>
      </Helmet>
    <div className="p-5">
      <div className=" max-w-3xl mx-auto shadow-blue-300 shadow-md  overflow-hidden transition ease-in-out rounded-2xl">
        <img
          src={imageurl}
          alt="postImg"
          className=" w-full h-90 object-cover "
        />
        <div className=" space-y-2 px-8 p-5">
          <h1 className="text-2xl font-bold mb-3 primary">{title}</h1>
          <p className="secondary">
            <strong className="font-semibold ">Type:</strong> {types}
          </p>
          <p className="secondary">
            <strong className="font-semibold">Name:</strong> {name}
          </p>
          <p className="secondary">
            <strong className="font-semibold">Email:</strong> {email}
          </p>
          <p className="secondary">
            <strong className="font-semibold">Location:</strong> {location}
          </p>
          <p className="secondary">
            <strong className="font-semibold">Category:</strong> {category}
          </p>
          <p className="secondary">
            <strong className="font-semibold">Date:</strong> {date}
          </p>
          <p className="secondary">
            <strong className="font-semibold">Description:</strong>{" "}
            {description}
          </p>

          {types === "Lost" && (
            <>
              <div className="flex justify-center">
                <button
                  onClick={() => setShowModal(true)}
                  className="btn btn-success mt-4 primary"
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
                  className="btn btn-success flex justify-center mt-4 primary"
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
        <div className="fixed inset-0 z-50 bg-blue-300/50  flex items-center justify-center">
          <div className=" p-6 bg-black rounded-lg shadow-blue-300 shadow-lg w-full max-w-lg relative">
            <h2 className="text-xl font-bold mb-4 text-center text-blue-500 primary">
              Recovery Confirmation
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block mb-1 font-medium secondary text-blue-400">
                  Recovered Location
                </label>
                <input
                  type="text"
                  name="recoveredLocation"
                  className="input input-bordered w-full"
                  placeholder="Your Location"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1 font-medium secondary text-blue-400">Recovered Date</label>
                <input
                  type="date"
                  name="recoveredDate"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1 font-medium secondary text-blue-400">Your Info</label>
                <input
                  type="text"
                  value={user?.displayName}
                  readOnly
                  className="input input-bordered w-full mb-2 secodary"
                />
                <input
                  type="email"
                  value={user?.email}
                  readOnly
                  className="input input-bordered w-full mb-2 secondary"
                />
              </div>
              <div className="flex justify-between mt-4">
                <button type="submit" className="btn btn-success primary">
                  Submit
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="btn btn-error"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
    
  );
};

export default PostDetailsPages;
