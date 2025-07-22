import React from "react";
import { Link, useLoaderData } from "react-router";
import AllPostCard from "../pages/AllPostCard";

const LatestFindAndLost = () => {
  const posts = useLoaderData();

  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <div className="p-5 ">
      <h1 className="text-center font-bold  text-3xl my-12 primary">
        Latest Lost and Found Posts
      </h1>

      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8 mx-5 md:mx-5 lg:mx-0">
        {latestPosts.map((post) => (
          <AllPostCard key={post._id} post={post} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/lostandfound" className=" bg-green-400 px-6 py-2 hover:bg-green-500 transition rounded-md text-white">
          View All Post
        </Link>
      </div>
    </div>
  );
};

export default LatestFindAndLost;
