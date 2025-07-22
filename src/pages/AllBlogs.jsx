import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
const AllBlogs = () => {
  const allBlogs = [
    {
      id: "1",
      title: "How I Found My Lost Bag at a Bus Stand",
      excerpt:
        "It felt impossible, but I found my bag thanks to this platform. Here's how it happened...",
      author: "Sumaiya Rahman",
      date: "June 10, 2025",
      image:
        "https://img.airhelp.com/blog/lost-luggage-blog.jpg?updatedAt=1724837096332",
    },
    {
      id: "2",
      title: "Top 5 Safety Tips to Prevent Losing Your Items",
      excerpt:
        "Prevention is always better than cure. These 5 habits will help you stay organized...",
      author: "Rashedul Hasan",
      date: "June 11, 2025",
      image:
        "https://media.istockphoto.com/id/957360682/vector/male-hand-holding-megaphone-with-top-tips-speech-bubble-loudspeaker-banner-for-business.jpg?s=612x612&w=0&k=20&c=31s1snFnXAmnINeR_Ya6WLhgH6BLSHUtRHE_tAQJQUc=",
    },
    {
      id: "3",
      title: "What To Do Right After You Lose Something",
      excerpt:
        "Losing something is stressful. Here's a step-by-step plan you should follow right away.",
      author: "Admin",
      date: "June 12, 2025",
      image:
        "https://notlost.com/wp-content/uploads/man-showing-distress-3777572-1-1080x675.jpg",
    },
    {
      id: "4",
      title: "My Lost Phone Story: Recovered in 6 Hours",
      excerpt:
        "Losing a phone can be a nightmare, but quick actions made all the difference.",
      author: "Mahin Khan",
      date: "June 13, 2025",
      image:
        "https://www.digitaltrends.com/wp-content/uploads/2015/11/lost-phone.jpg?p=1",
    },
    {
      id: "5",
      title: "Why Community Platforms Matter in 2025",
      excerpt:
        "In this digital age, people-powered platforms like Lost & Found are the future.",
      author: "Admin",
      date: "June 14, 2025",
      image:
        "https://img.freepik.com/premium-vector/community-care-icons-team-help-illustration_911078-7846.jpg",
    },
    {
      id: "6",
      title: "How to Write a Clear Lost Item Description",
      excerpt:
        "Details matter. Learn how to write a perfect lost/found post to get results fast.",
      author: "Shafayet Hosain",
      date: "June 15, 2025",
      image: "https://i.ytimg.com/vi/lI_nTy35PAM/maxresdefault.jpg",
    },
    {
      id: "7",
      title: "The Most Commonly Lost Items in 2025",
      excerpt:
        "Wallets, phones, IDs — here’s what people lose the most and why.",
      author: "Sadia Akter",
      date: "June 16, 2025",
      image:
        "https://www.seinxon.com/cdn/shop/articles/14-most-commonly-lost-items_520x500_c34db83c-a994-4491-8b3e-c8df9837b80d.webp?v=1736587944",
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
    {
      id: "9",
      title: "The Role of Local Communities in Lost Item Recovery",
      excerpt:
        "Sometimes it takes a village. Why neighborhoods are key to finding lost items.",
      author: "Admin",
      date: "June 18, 2025",
      image:
        "https://img.freepik.com/premium-vector/man-explains-list-rule-guidelines_112255-2204.jpg",
    },
    {
      id: "10",
      title: "Lost Something? These Are the First 3 Things to Do",
      excerpt:
        "Quick action matters. Here’s what to do in the first hour of losing something.",
      author: "Zarif Ahsan",
      date: "June 19, 2025",
      image:
        "https://www.thenet.org/wp-content/uploads/2019/07/blog_frontpage_crying.jpg",
    },
    {
      id: "11",
      title: "Meet the Team Behind Lost & Found",
      excerpt:
        "Get to know the developers and designers making the platform possible.",
      author: "Shafayet Hosain",
      date: "June 20, 2025",
      image:
        "https://media.istockphoto.com/id/2189540556/vector/meet-the-team.jpg?s=612x612&w=0&k=20&c=T0LUYYTp7aXkzhYY22g7vPZ0S5lmo6O15Htzt5i-6lY=",
    },
    {
      id: "12",
      title: "Lost Pets: How This Platform Helped Reunite Families",
      excerpt:
        "Pets are family. Read how real users found their missing furry friends.",
      author: "Arifa Sultana",
      date: "June 21, 2025",
      image:
        "https://images.contentstack.io/v3/assets/blt6f84e20c72a89efa/blt220908e216c946ce/64adb1166664b63a3bbf8356/article-how_find_lost_cat-header@1.5x.jpg",
    },
  ];

  return (
    <>
    <Helmet>
        <title className="primary">All Blogs | Lost and Found</title>
    </Helmet>
      <section className="my-8" id="all-blogs">
        <div className="max-w-8xl mx-auto px-4 card">
          <h2 className="text-2xl font-bold text-center mb-10">
            All Blog Posts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-2">
            {allBlogs.map((post) => (
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
                className="rounded-2xl shadow-md overflow-hidden hover:cursor-pointer shadow-blue-300"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-1  primary">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm secondary">
                    {post.excerpt}
                  </p>
                  <div className="text-xs text-gray-500 mt-3">
                    By{" "}
                    <span className="font-semibold secondary">
                      {post.author}
                    </span>{" "}
                    · {post.date}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="text-center mt-8">
          <h2 className="text-lg text-gray-500">Coming Soon More Blogs.....</h2>
        </div>
      </section>
    </>
  );
};

export default AllBlogs;
