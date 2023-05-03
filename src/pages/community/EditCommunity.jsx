import React, { useState } from "react";
import { useLocation } from "react-router";
import useCommunity from "../../hooks/community/useCommunity";
import { Button, Spinner } from "flowbite-react";

const EditCommunity = () => {
  const { state } = useLocation();
  const [name, setName] = useState(state.name);
  const [description, setDescription] = useState(state.description);
  const [visibility, setVisibility] = useState(state.visibility);
  const [loading, setLoading] = useState(false);
  const { edit } = useCommunity();

  const handleSubmit = async () => {
    setLoading(true);
    const info = {
      ...state,
      name,
      description,
      visibility,
    };

    const res = await edit(info);

    if (res) {
      window.location.href = `/community/details/${state.communityId}`;
    } else {
      alert("Something went wrong in updating the community.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="w-1/4 h-1/2 shadow-2xl">
        <label>Community Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-5"
        />
        <br />
        <label>Community Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-5"
        />
        <br />
        <label>Community Visibility: </label>
        <br />
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="w-1/3 my-2"
        >
          <option value="public" label="Public">
            Public
          </option>
          {/* <option value="private" label="private" >private</option> */}
        </select>

        <Button onClick={handleSubmit}>{loading ? <Spinner /> : "Edit"}</Button>
      </div>
    </div>
  );
};

export default EditCommunity;
