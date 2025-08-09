import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { CiViewTable, CiCreditCard1 } from "react-icons/ci";
import { Helmet } from "react-helmet-async";

const MyRecoveredPosts = () => {
  const { user } = useContext(AuthContext);
  const [recoveredPosts, setRecoveredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("table");

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${import.meta.env.VITE_API_URL}/recovered?email=${user.email}`, {
      credentials: 'include', 
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized or failed to fetch");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setRecoveredPosts(data);
        } else {
          setRecoveredPosts([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recovered posts:", error);
        setRecoveredPosts([]);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title className="primary">Recovered Post | Lost & Found</title>
      </Helmet>
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center primary">
          My Recovered Posts
        </h2>

        {/* View Mode Switch */}
        <div className="flex justify-end mt-10 mb-4">
          <button
            onClick={() => setViewMode("table")}
            className={`btn btn-sm mr-2 ${viewMode === "table" ? "bg-orange-400" : "btn-outline"}`}
          >
            <CiViewTable />
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`btn btn-sm ${viewMode === "card" ? "bg-orange-400" : "btn-outline"}`}
          >
            <CiCreditCard1 />
          </button>
        </div>

        {/* Display */}
        {recoveredPosts.length === 0 ? (
          <p className="text-center text-gray-500 secondary">No recovered posts yet.</p>
        ) : viewMode === "table" ? (
          <div className="overflow-x-auto">
            <table className="table w-full border border-gray-200">
              <thead className="bg-base-200">
                <tr className="primary">
                  <th>#</th>
                  <th>Recovered Location</th>
                  <th>Recovered Date</th>
                  <th>Post ID</th>
                </tr>
              </thead>
              <tbody>
                {recoveredPosts.map((item, index) => (
                  <tr key={item._id} className="hover:bg-gray-50 secondary">
                    <td>{index + 1}</td>
                    <td>{item.recoveredLocation}</td>
                    <td>{new Date(item.recoveredDate).toLocaleDateString()}</td>
                    <td className="text-blue-600">{item.postId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4   gap-6">
            {recoveredPosts.map((item, index) => (
              <div key={item._id} className="card bg-base-100 hover:shadow-blue-200 shadow-md hover:ease-in-out border border-gray-200 transition duration-300">
                <div className="card-body">
                  <h3 className="card-title text-lg secondary">
                    Recovered Post {index + 1}
                  </h3>
                  <p className="secondary">
                    <strong>Location:</strong> {item.recoveredLocation}
                  </p>
                  <p className="secondary">
                    <strong>Date:</strong>{" "}
                    {new Date(item.recoveredDate).toLocaleDateString()}
                  </p>
                  <p className="secondary">
                    <strong>Email:</strong>{" "}
                    <span className="text-blue-600">{item.userEmail}</span>
                  </p>
                  <p className="secondary">
                    <strong>Post ID:</strong>{" "}
                    <span className="text-blue-600">{item.postId}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyRecoveredPosts;
