import React, { useState, useMemo } from "react";
import { useLoaderData, useNavigation } from "react-router";
import AllPostCard from "./AllPostCard";
import { Helmet } from "react-helmet-async";

const LostAndFoundPages = () => {
  const initialPosts = useLoaderData();
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("recent");
  const [selectedCategory, setSelectedCategory] = useState("all");

 
  const categories = useMemo(() => {
    const all = initialPosts.map((post) => post.category || "Unknown");
    return ["all", ...new Set(all)];
  }, [initialPosts]);

 
  const sortedPosts = useMemo(() => {
    const posts = [...initialPosts];
    switch (sortOption) {
      case "recent":
        return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
      case "oldest":
        return posts.sort((a, b) => new Date(a.date) - new Date(b.date));
      case "title":
        return posts.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return posts;
    }
  }, [initialPosts, sortOption]);

 
  const filteredPosts = useMemo(() => {
    return sortedPosts.filter((post) => {
      const matchesTitle = post.title.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;
      return matchesTitle && matchesCategory;
    });
  }, [searchText, selectedCategory, sortedPosts]);

  if (navigation.state === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Lost and Found Items | Lost & Found</title>
      </Helmet>

      <div>
        <h1 className="text-center my-8 text-2xl font-bold primary">
          All Lost And Found Items
        </h1>

        <div className="flex flex-col md:flex-row flex-wrap justify-between items-center gap-4 mb-6 px-4">
          
          <input
            type="text"
            placeholder="Search by title..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="input input-bordered w-full md:max-w-sm"
          />

      
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select select-bordered w-full md:w-48"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="select select-bordered w-full md:w-48"
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>

       
        {filteredPosts.length === 0 ? (
          <div className="text-center text-xl text-gray-500 secondary">
            No matching posts found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-2 p-5">
            {filteredPosts.map((item) => (
              <AllPostCard
                key={item._id}
                post={item}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default LostAndFoundPages;
