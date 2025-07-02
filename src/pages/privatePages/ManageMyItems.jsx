import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";

const ManageMyItems = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");
  const navigate = useNavigate();

  const fetchPosts = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/lostandfounditems?email=${user.email}`
    );
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user?.email) {
      fetchPosts();
    }
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you cannot recover this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/lostandfounditems/${id}`,
        {
          method: "DELETE",
           credentials: "include",
        }
      );

      if (res.ok) {
        setPosts((prev) => prev.filter((item) => item._id !== id));
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
      } else {
        Swal.fire("Error!", "Failed to delete the post.", "error");
      }
    }
  };

  const handleUpdateRedirect = (id) => {
    navigate(`/updatelostandfoundpost/${id}`);
  };

  const filteredPosts = filterDate
    ? posts.filter((post) => post.date === filterDate)
    : posts;

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <>
    <Helmet>
        <title className="primary">Manage My Post | Lost & Found</title>
      </Helmet>
    <div className="p-6 max-w-6xl mx-auto mb-12">
      <h2 className="text-2xl font-bold mb-6 text-center primary">Manage My Items</h2>

      {/* Filter by date */}
      <div className="mb-4 text-center mt-12">
        <label className="font-semibold mr-2 secondary">Filter by Date:</label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="input input-bordered input-sm"
        />
        <button onClick={() => setFilterDate("")} className="btn btn-sm ml-2 primary">
          Clear
        </button>
      </div>

      {/* Table */}
      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-500 secondary">No posts found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-base-200">
            <thead className="bg-base-200">
              <tr className="primary">
                <th>#</th>
                <th>Title</th>
                <th>Type</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((item, index) => (
                <tr  key={item._id}>
                  <td className="secodary">{index + 1}</td>
                  <td className="secondary">{item.title}</td>
                  <td className="secondary">{item.types}</td>
                  <td className="secondary">{item.date}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() => handleUpdateRedirect(item._id)}
                      className="btn btn-sm btn-success primary mb-2 lg:mb-0"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-sm btn-error primary"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
    
  );
};

export default ManageMyItems;
