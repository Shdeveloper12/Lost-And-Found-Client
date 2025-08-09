import React from "react";
import { motion } from "framer-motion";
const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "5 Things To Do After Losing Your Phone",
      excerpt:
        "Losing your phone can be stressful. Here are the steps you should take immediately to secure your data and increase the chances of recovery...",
      author: "Shafayet Hosain",
      date: "June 29, 2025",
      image:
        "https://miro.medium.com/v2/resize:fit:710/1*A9yXS-bTKoKMTE0R0T3wow.png",
    },
    {
      id: 2,
      title: "How One User Found Their Wallet in 2 Days",
      excerpt:
        "Read the inspiring story of Arafat, who found his lost wallet through our platform within just 48 hours.",
      author: "Admin",
      date: "June 25, 2025",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDXmrj-Jcje0Vdd3Ur0I9pF3-Tu-CgSSVRSQ&s",
    },
    {
      id: 3,
      title: "Tips to Prevent Losing Your Belongings",
      excerpt:
        "Prevention is better than cure. Here are practical tips to avoid losing your essentials in the first place...",
      author: "Shafayet Hosain",
      date: "June 20, 2025",
      image: "https://www.freeiconspng.com/uploads/tips-png-25.png",
    },
      {
      id: "8",
      title: "Your Checklist Before Leaving a Public Place",
      excerpt:
        "Simple reminder habits can help you avoid leaving anything behind.",
      author: "Jannatul Nayeem",
      date: "June 17, 2025",
      image:
        "https://www.shutterstock.com/image-photo/check-list-concept-businessman-tick-600nw-2442962431.jpg",
    },
  ];
  return (
    <section className="py-5 ">
      <div className="card mx-auto px-4 ">
        <h2 className="text-2xl primary font-bold text-center mb-8">
          Latest Blog Posts
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
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
              className=" rounded-2xl shadow-md overflow-hidden hover:cursor-pointer shadow-blue-300 "
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 primary">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-3 secondary">{post.excerpt}</p>
                <div className="text-xs text-gray-500 mb-4">
                  By <span className="font-medium secondary">{post.author}</span> ·{" "}
                  {post.date}
                </div>
                
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href="/blogs"
            className="inline-block bg-green-400 text-white px-6 py-2 rounded-md hover:bg-green-500 transition"
          >
            See All Blogs
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
