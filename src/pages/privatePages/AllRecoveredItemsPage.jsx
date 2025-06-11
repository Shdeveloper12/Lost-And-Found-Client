import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const MyRecoveredPosts = () => {
  const { user } = useContext(AuthContext);
  const [recoveredPosts, setRecoveredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${import.meta.env.VITE_API_URL}/recovered?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setRecoveredPosts(data);
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
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-orange-500 ">My Recovered Posts</h2>

      {recoveredPosts.length === 0 ? (
        <p className="text-center text-gray-500">No recovered posts yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th>#</th>
                <th>Recovered Location</th>
                <th>Recovered Date</th>
                <th>Post ID</th>
              </tr>
            </thead>
            <tbody>
              {recoveredPosts.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td>{index + 1}</td>
                  <td>{item.recoveredLocation}</td>
                  <td>{item.recoveredDate}</td>
                  <td>{item.postId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyRecoveredPosts;
