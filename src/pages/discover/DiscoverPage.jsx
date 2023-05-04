import React from "react";
import UpperCard from "../../components/discover/UpperCard";
import MightLikeThese from "../../components/discover/MightLikeThese";
import JustForYou from "../../components/discover/JustForYou";
import SuggestedCommunities from "../../components/discover/SuggestedCommunities";
import FooterLandingPage from "../../components/footer/FooterLandingPage";
import BrowseCategories from "../../components/home/BrowseCategories";

const DiscoverPage = () => {
  return (
    <div className="container">
      <div className="px-16">
        <BrowseCategories />
        <UpperCard />
        <MightLikeThese />
        <JustForYou />
        <div className="my-10">
          <img
            src="https://revealbot.com/blog/content/images/2021/01/07_fb_ads_2_tiny.jpg"
            alt="ads"
            className="w-full h-32 object-cover rounded"
          />
        </div>
        <SuggestedCommunities />
        <div className="mt-10"></div>
      </div>

      <FooterLandingPage />
    </div>
  );
};

export default DiscoverPage;
