import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import MiniMapPicker from "../../components/MiniMapPicker";


const UpdateLostAndFound = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [types, setTypes] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/lostandfounditems/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setCategory(data.category);
        setTypes(data.types);
        const [lat, lng] = data.location.split(",").map(Number);
        setCoordinates({ lat, lng });
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedData = Object.fromEntries(formData.entries());

    const updatePost = {
      ...updatedData,
      category,
      types,
      location: `${coordinates.lat}, ${coordinates.lng}`,
      name: user?.displayName || "",
      email: user?.email || "",
    };

    fetch(`${import.meta.env.VITE_API_URL}/lostandfounditems/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatePost),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0 || data.acknowledged) {
          Swal.fire("Success!", "Item updated successfully!", "success").then(
            () => {
              navigate("/manageitem");
            }
          );
        }
      });
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="p-8 md:p-24">
      <h1 className="text-center mb-14 text-3xl text-orange-500 font-bold">
        Update Lost or Found Item
      </h1>

      <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <fieldset className="fieldset p-4">
            <label className="label font-bold text-orange-400">Title</label>
            <input
              type="text"
              name="title"
              className="input w-full"
              defaultValue={post.title}
              required
            />
          </fieldset>

          <fieldset className="fieldset p-4">
            <label className="label font-bold text-orange-400">Image URL</label>
            <input
              type="text"
              name="imageurl"
              className="input w-full"
              defaultValue={post.imageurl}
              required
            />
          </fieldset>

          <fieldset className="fieldset p-4">
            <label className="label font-bold text-orange-400">Your Name</label>
            <p className="input w-full">{user?.displayName}</p>
          </fieldset>

          <fieldset className="fieldset p-4">
            <label className="label font-bold text-orange-400">
              Your Email
            </label>
            <p className="input w-full">{user?.email}</p>
          </fieldset>

          <fieldset className="fieldset p-4">
            <label className="label font-bold text-orange-400">Date</label>
            <input
              type="date"
              name="date"
              className="input w-full"
              defaultValue={post.date}
              required
            />
          </fieldset>

          <fieldset className="fieldset p-4">
            <label className="label font-bold text-orange-400">
              Description
            </label>
            <textarea
              className="textarea w-full"
              name="description"
              defaultValue={post.description}
              required
            ></textarea>
          </fieldset>
        </div>

        <fieldset className="fieldset rounded-box p-4 col-span-2">
          <label className="label font-bold text-orange-400">
            Update Location on Map
          </label>
          <MiniMapPicker value={coordinates} onChange={setCoordinates} />
          {coordinates && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {coordinates.lat.toFixed(5)},{" "}
              {coordinates.lng.toFixed(5)}
            </p>
          )}
        </fieldset>

        {/* Dropdowns */}
        <div className="grid grid-cols-2">
          <div className="flex flex-col items-center mt-6">
            <p className="text-lg font-semibold text-orange-400 mb-2">
              Selected Type: <span className="text-blue-700">{types}</span>
            </p>
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdown(!dropdown)}
                className="btn"
              >
                {types ? `Change Type (${types})` : "Select Type"}
              </button>
              {dropdown && (
                <ul className="absolute top-full mt-2 bg-orange-400 text-black w-52 p-2 shadow-lg rounded-box z-10">
                  {["Lost", "Found"].map((type) => (
                    <li key={type}>
                      <button
                        type="button"
                        onClick={() => {
                          setTypes(type);
                          setDropdown(false);
                        }}
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

          <div className="flex flex-col items-center mt-6">
            <p className="text-lg font-semibold text-orange-400 mb-2">
              Selected Category:{" "}
              <span className="text-blue-700">{category}</span>
            </p>
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="btn"
              >
                {category ? `Change Category (${category})` : "Select Category"}
              </button>
              {dropdownOpen && (
                <ul className="absolute top-full mt-2 bg-orange-400 text-black w-52 p-2 shadow-lg rounded-box z-10">
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
                        onClick={() => {
                          setCategory(cat);
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left hover:bg-gray-100 px-2 py-1 rounded"
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

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn btn-outline btn-success mt-10 rounded-xl w-50"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateLostAndFound;
