import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router";

const AllPostCard = ({ post }) => {
  const { _id, imageurl, title, date, types } = post;
  return (
    <>
      <motion.div
        className="card shadow-blue-300 rounded-2xl  shadow-md "
        whileHover={{
          scale: [null, 1, 1.05],
          transition: {
            duration: 0.5,
            times: [0, 0.6, 1],
            ease: ["easeInOut", "easeOut"],
          },
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
      >
        <figure className=" ">
          <img src={imageurl} alt="Shoes" className=" w-full h-70  object-cover"/>
        </figure>
        <div className=" items-center text-center p-5">
          <h2 className=" text-lg  primary ">
            <span className="font-bold text-left secondary">Title:</span> {title}
          </h2>
          <h2 className="text-lg mb-2  primary">
            <span className="font-bold secondary">Type: </span>
            {types}
          </h2>
          <p className="secondary">
            <strong className="font-bold ">Date: </strong>
            {date}
          </p>
          <div className="p-5">
            <button className="bg-blue-600 rounded-full px-6 py-2 text-white hover:bg-blue-700">
              <Link to={`/postdetails/${_id}`}>See Details</Link>{" "}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AllPostCard;
