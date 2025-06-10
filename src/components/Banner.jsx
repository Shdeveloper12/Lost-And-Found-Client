
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import img1 from "../assets/banner/lost.jpg";
import img2 from "../assets/banner/found.jpg";
import img3 from "../assets/banner/reconnect.jpg"

import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router';

const slides = [
  {
    title: 'Lost Something?',
    description: 'Post a missing item and let the community help you find it.',
    button: <Link to="/addlostandfounditemspage">Report Lost Item</Link>,
    image: img1,
  },
  {
    title: 'Found Something?',
    description: 'Be a good citizen. Report what you’ve found.',
    button:  <Link to="/addlostandfounditemspage">Post Found Item</Link>,
    image: img2,
  },
  {
    title: 'Reconnect People with Their Belongings',
    description: 'Browse listings of lost and found items around your area.',
    button: <Link to="/manageitem">'View Listings</Link>,
    image: img3,
  },
];

const Banner = () => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-[400px] w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full bg-cover bg-center flex items-center justify-center text-white"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className=" bg-opacity-50 p-6 rounded-xl text-center max-w-xl">
                <h2 className="text-4xl font-bold mb-2 text-orange-600">{slide.title}</h2>
                <p className="mb-4">{slide.description}</p>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-full transition duration-300">
                  {slide.button}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
