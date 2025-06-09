import React from "react";
import { Link } from "react-router";

const AllPostCard = ({ post }) => {
  const { _id, imageurl, title } = post;
  return (
    <>
      <div className="card bg-base-100  shadow-xl">
        <figure className="px-10 pt-10 ">
          <img src={imageurl} alt="Shoes" className="rounded-xl w-100 h-70" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-lg ">
            <span className="font-bold primary">Title:</span> {title}
          </h2>

          <div className="card-actions">
            <button className="btn  secondary">
              <Link to={`/postdetails/${_id}`}>See Details</Link>{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPostCard;
