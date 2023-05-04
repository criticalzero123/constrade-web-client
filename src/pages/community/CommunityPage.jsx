import React, { useState } from "react";
import { useUserInfo } from "../../hooks/useUserInfo";
import useCommunityJoined from "../../hooks/community/useCommunityJoined";
import usePopularCommunity from "../../hooks/community/usePopularCommunity";
import CommunityCardDisplay from "../../components/community-card/CommunityCardDisplay";
import UpperCardCommunity from "../../components/community/UpperCardCommunity";
import { BsSearch } from "react-icons/bs";
import FooterLandingPage from "../../components/footer/FooterLandingPage";

const CommunityPage = () => {
  const { user } = useUserInfo();
  const [query, setQuery] = useState("");
  const [joined] = useCommunityJoined(user.userId);
  const [popular] = usePopularCommunity(user.userId);

  if (joined === undefined || popular === undefined) return <p>Loading...</p>;

  const handleSearch = (e) => {
    e.preventDefault();

    window.location.href = `/search/community/${query}`;
  };

  return (
    <div className="container ">
      <div className="px-4 mb-10">
        <form
          onSubmit={handleSearch}
          className="my-5 items-end justify-end flex"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border rounded border-gray-300"
            placeholder="Search Community..."
          />
          <button className="ml-4 border p-3 bg-gray-100 rounded-lg  hover:text-[#CC481F] text-black ">
            <BsSearch />
          </button>
        </form>
        <UpperCardCommunity />

        <p className="font-semibold text-2xl text-gray-800">My Communities</p>
        <p className="text-sm text-gray-400 mb-6">Communities you joined.</p>

        <div className="flex flex-wrap gap-x-4">
          {joined.map((comm, index) => (
            <CommunityCardDisplay
              community={comm.community}
              isJoined={comm.isJoined}
              ownerImage={comm.ownerImage}
              ownerName={comm.ownerName}
              key={index}
            />
          ))}
        </div>

        <div className="mt-10"></div>
        <p className="font-semibold text-2xl text-gray-800">
          Popular communities
        </p>
        <p className="text-sm text-gray-400 mb-6">
          Joined the top growing communities!
        </p>
        <div className="flex flex-wrap gap-x-4">
          {popular.map((comm, index) => (
            <CommunityCardDisplay
              community={comm.community}
              isJoined={comm.isJoined}
              ownerImage={comm.ownerImage}
              ownerName={comm.ownerName}
              key={index}
            />
          ))}
        </div>
      </div>
      <FooterLandingPage />
    </div>
  );
};

export default CommunityPage;
