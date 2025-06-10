import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router";

const AllPostCard = ({ post }) => {
  const { _id, imageurl, title } = post;
  return (
    <>
      <motion.div
        className="card   shadow-xl bg-gradient-to-r from-orange-300 from-10% via-red-300 via-30% to-orange-300 to-90%"
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
        <figure className="p-5 ">
          <img src={imageurl} alt="Shoes" className=" w-100 h-70" />
        </figure>
        <div className=" items-center text-center">
          <h2 className=" text-lg ">
            <span className="font-bold primary">Title:</span> {title}
          </h2>

          <div className="p-5">
            <button className="btn  secondary">
              <Link to={`/postdetails/${_id}`}>See Details</Link>{" "}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AllPostCard;
