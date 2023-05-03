import React, { useState } from "react";
import { useUserInfo } from "../../hooks/useUserInfo";
import useCommunityJoined from "../../hooks/community/useCommunityJoined";
import usePopularCommunity from "../../hooks/community/usePopularCommunity";
import CommunityCardDisplay from "../../components/community-card/CommunityCardDisplay";
import UpperCardCommunity from "../../components/community/UpperCardCommunity";
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
    <div className="container px-4">
      <UpperCardCommunity />
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded"
          placeholder="Search Community..."
        />
        <button className="ml-4">Search</button>
      </form>
      <h6>My Communities</h6>

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
      <h6>Popular Communities</h6>
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
  );
};

export default CommunityPage;
