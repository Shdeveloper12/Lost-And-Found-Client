import React, { useState, useMemo } from "react";
import { useLoaderData, useNavigation } from "react-router";
import AllPostCard from "./AllPostCard";

const LostAndFoundPages = () => {
  const initialPosts = useLoaderData();
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState("");

  // Sort by most recent date
  const sortedPosts = useMemo(() => {
    return [...initialPosts].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }, [initialPosts]);

  // Filter by title based on search input
  const filteredPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, sortedPosts]);

  const [ setLostAndFoundItems] = useState(sortedPosts);

  if (navigation.state === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center my-8 text-2xl font-bold ">
        All Lost And Found Items
      </h1>

      {/* 🔍 Search Input */}
      <div className="text-center mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center text-xl text-gray-500">
          No matching posts found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-2 p-5">
          {filteredPosts.map((item) => (
            <AllPostCard
              key={item._id}
              post={item}
              setLostAndFoundItems={setLostAndFoundItems}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LostAndFoundPages;
