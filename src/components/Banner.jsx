import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Link } from "react-router";
import img1 from "../assets/banner/lost.jpg";
import img2 from "../assets/banner/found.jpg";
import img3 from "../assets/banner/reconnect.jpg";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade"; // ✅ Required for fade effect

const slides = [
  {
    title: "Lost Something?",
    description: "Post a missing item and let the community help you find it.",
    link: "/addlostandfounditemspage",
    buttonText: "Report Lost Item",
    image: img1,
  },
  {
    title: "Found Something?",
    description: "Be a good citizen. Report what you’ve found.",
    link: "/addlostandfounditemspage",
    buttonText: "Post Found Item",
    image: img2,
  },
  {
    title: "Reconnect People with Their Belongings",
    description: "Browse listings of lost and found items around your area.",
    link: "/manageitem",
    buttonText: "View Listings",
    image: img3,
  },
];

const Banner = () => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        effect="fade" // ✅ Add fade effect here
        fadeEffect={{ crossFade: true }}
        loop={true}
        className="h-[400px] w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full bg-cover bg-center flex items-center justify-center text-white"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="bg-black bg-opacity-60 p-6 rounded-xl text-center max-w-xl">
                <h2 className="text-4xl font-bold mb-2 text-green-400">
                  {slide.title}
                </h2>
                <p className="mb-4">{slide.description}</p>
                <Link
                  to={slide.link}
                  className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-full transition duration-300"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
