import Lottie from "lottie-react";
import React from "react";
import faqanimation from "../assets/lotties/faq.json";

const FaqSection = () => {
  return (
    <>
      <div className="text-center font-bold mt-12 text-3xl">
        <h1 className="text-orange-500">How it Works</h1>
      </div>
      <div className="mx-5 mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        <div className="space-y-5 mt-8">
          <div
            tabIndex={0}
            className="collapse  collapse-plus bg-base-100 border-base-300 border"
          >
            <div className="collapse-title font-semibold">1. Create an Account</div>
            <div className="collapse-content text-sm">
             Sign up with your email or Google to start using the platform.
            </div>
          </div>
          <div
            tabIndex={0}
            className="collapse  collapse-plus bg-base-100 border-base-300 border"
          >
            <div className="collapse-title font-semibold">2. Post a Lost or Found Item</div>
            <div className="collapse-content text-sm">
              Add a description, image, location, and contact info.
            </div>
          </div>
          <div
            tabIndex={0}
            className="collapse  collapse-plus bg-base-100 border-base-300 border"
          >
            <div className="collapse-title font-semibold">
              3.  Search Listings
            </div>
            <div className="collapse-content text-sm">
              Browse through items lost or found by other users.
            </div>
          </div>
          <div
            tabIndex={0}
            className="collapse  collapse-plus bg-base-100 border-base-300 border"
          >
            <div className="collapse-title font-semibold">4. Contact the Owner or Finder</div>
            <div className="collapse-content text-sm">
              Reach out securely through our platform to reconnect with items.
            </div>
          </div>
        </div>

        <div className="ml-0  md:ml-26 lg:ml-32">
          <Lottie
            style={{ width: "400px" }}
            animationData={faqanimation}
            loop={true}
          ></Lottie>
        </div>
      </div>
    </>
  );
};

export default FaqSection;
