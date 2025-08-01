// AddLostAndFound.jsx
import React, { useContext, useState } from "react";

import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthProvider";
import MiniMapPicker from "../../components/MiniMapPicker";
import { Helmet } from "react-helmet-async";

const AddLostAndFound = () => {
  const [category, setCategory] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [types, setTypes] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSelectTypes = (rat) => {
    setTypes(rat);
    setDropdown(false);
  };

  const handleSelectCategory = (cat) => {
    setCategory(cat);
    setDropdownOpen(false);
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    const form = e.target;

    if (!types) {
      return Swal.fire({
        icon: "warning",
        title: "Please select a type!",
        confirmButtonText: "OK",
      });
    }

    if (!category) {
      return Swal.fire({
        icon: "warning",
        title: "Please select a category!",
        confirmButtonText: "OK",
      });
    }

    if (!coordinates) {
      return Swal.fire({
        icon: "warning",
        title: "Please select a location on the map!",
        confirmButtonText: "OK",
      });
    }

    const formData = new FormData(form);
    const postData = Object.fromEntries(formData.entries());

    const newPost = {
      ...postData,
      category,
      types,
      location: `${coordinates.lat}, ${coordinates.lng}`,
      name: user?.displayName || "",
      email: user?.email || "",
    };
    console.log(newPost);

    fetch(`${import.meta.env.VITE_API_URL}/lostandfounditems`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId || data.acknowledged) {
          Swal.fire({
            title: "Post Added Successfully!",
            icon: "success",
          }).then(() => {
            form.reset();
            setTypes("");
            setCategory("");
            setCoordinates(null);
            navigate("/lostandfound");
          });
        }
      })
      .catch(() => {
        Swal.fire("Error!", "Failed to create post.", "error");
      });
  };

  return (
    <>
      <Helmet>
        <title className="primary">Add Post | Lost & Found</title>
      </Helmet>
      <div className="p-8 ">
        <h1 className="text-center mb-14 text-2xl primary font-bold">
          Post a Lost or Found Item
        </h1>

        <form onSubmit={handleCreateGroup}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <fieldset className="fieldset rounded-box p-4">
              <label className="label font-bold text-gray-600 secondary">Title</label>
              <input
                type="text"
                name="title"
                className="input w-full"
                placeholder="Enter title"
                required
              />
            </fieldset>

            <fieldset className="fieldset rounded-box p-4">
              <label className="label font-bold text-gray-600 secondary">
                Image URL
              </label>
              <input
                type="text"
                name="imageurl"
                className="input w-full"
                placeholder="Enter image URL"
                required
              />
            </fieldset>

            <fieldset className="fieldset rounded-box p-4">
              <label className="label font-bold text-gray-600 secondary">
                Your Name
              </label>
              <p className="input w-full">{user?.displayName}</p>
            </fieldset>

            <fieldset className="fieldset rounded-box p-4">
              <label className="label font-bold text-gray-600 secondary">
                Your Email
              </label>
              <p className="input w-full">{user?.email}</p>
            </fieldset>

            <fieldset className="fieldset rounded-box p-4">
              <label className="label font-bold text-gray-600 secondary">Date</label>
              <input
                type="date"
                name="date"
                className="input w-full"
                required
              />
            </fieldset>
            <fieldset className="fieldset rounded-box p-4"> 
              <label className="label font-bold text-gray-600 secondary">
                Description
              </label>
              <textarea
                className="textarea w-full"
                name="description"
                placeholder="Write a description"
                required
              ></textarea>
            </fieldset>
          </div>

          <fieldset className="fieldset rounded-box p-4 col-span-2">
            <label className="label font-bold text-gray-600 secondary">
              Select Location on the Map
            </label>
            <MiniMapPicker value={coordinates} onChange={setCoordinates} />
            {coordinates && (
              <p className="mt-2 font-semibold text-gray-600 secondary">
                Selected: {coordinates.lat.toFixed(5)},{" "}
                {coordinates.lng.toFixed(5)}
              </p>
            )}
          </fieldset>

          {/* Types Dropdown */}
          <div className="grid grid-cols-2">
            <div className="flex flex-col items-center mt-6">
              {types && (
                <p className="text-lg font-semibold text-gray-700 mb-2 secondary">
                  Selected Type: <span className="text-black">{types}</span>
                </p>
              )}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdown(!dropdown)}
                  className="btn primary"
                >
                  {types ? `Change Type (${types})` : "Select Type"}
                </button>
                {dropdown && (
                  <ul className="absolute top-full mt-2 bg-gray-200 text-black w-52 p-2 shadow-lg rounded-box z-10">
                    {["Lost", "Found"].map((type) => (
                      <li key={type}>
                        <button
                          type="button"
                          onClick={() => handleSelectTypes(type)}
                          className="w-full text-left hover:bg-gray-100 px-2 py-1 rounded"
                        >
                          {type}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Category Dropdown */}
            <div className="flex flex-col items-center mt-6">
              {category && (
                <p className="text-lg font-semibold text-gray-700 mb-2 secondary">
                  Selected Category:{" "}
                  <span className="text-black">{category}</span>
                </p>
              )}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="btn primary"
                >
                  {category
                    ? `Change Category (${category})`
                    : "Select Category"}
                </button>
                {dropdownOpen && (
                  <ul className="absolute top-full mt-2 bg-gray-200 text-black w-52 p-2 shadow-lg rounded-box z-10 secondary">
                    {[
                      "Pet",
                      "Documents",
                      "Gadgets",
                      "Vehicle",
                      "Money",
                      "Electronics",
                    ].map((cat) => (
                      <li key={cat}>
                        <button
                          type="button"
                          onClick={() => handleSelectCategory(cat)}
                          className="w-full text-left hover:bg-gray-100 px-2 py-1 rounded primary"
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-green-400 px-6 py-2 font-semibold hover:cursor-pointer hover:bg-green-500 transition rounded-md text-white primary"
            >
              Add Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddLostAndFound;
