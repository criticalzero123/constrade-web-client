import React, { useState } from "react";
import UpperCard from "../../components/discover/UpperCard";
import MightLikeThese from "../../components/discover/MightLikeThese";
import JustForYou from "../../components/discover/JustForYou";
import SuggestedCommunities from "../../components/discover/SuggestedCommunities";
import FooterLandingPage from "../../components/footer/FooterLandingPage";
import BrowseCategories from "../../components/home/BrowseCategories";

const DiscoverPage = () => {
  const [query, setQuery] = useState("");

  const handleSearchProduct = (e) => {
    e.preventDefault();

    window.location.href = `/search/products/${query}`;
  };

  return (
    <div className="container px-4">
      <UpperCard />
      <form onSubmit={handleSearchProduct}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find console games"
          className="border py-2 px-4 my-5"
        />
        <button>Search</button>
      </form>
      <MightLikeThese />
      <BrowseCategories />
      <JustForYou />
      <SuggestedCommunities />
      <div className="mt-10"></div>
      <FooterLandingPage />
    </div>
  );
};

export default DiscoverPage;
