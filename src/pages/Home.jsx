import React from "react";
import Banner from "../components/Banner";
import LatestFindAndLost from "../components/LatestFindAndLost";
import FaqSection from "../components/FaqSection";
import ReviewSection from "../components/ReviewSection";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title className="primary">Home | Lost & Found</title>
      </Helmet>
      <div>
        <Banner></Banner>
        <LatestFindAndLost></LatestFindAndLost>
        <FaqSection></FaqSection>
        <ReviewSection></ReviewSection>
      </div>
    </>
  );
};

export default Home;
