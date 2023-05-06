import React, { useState } from "react";
import { useUserInfo } from "../../hooks/useUserInfo";
import useCommunity from "../../hooks/community/useCommunity";
import { Spinner } from "flowbite-react";
const AddCommunity = () => {
  const { user } = useUserInfo();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/the-amazing-aerial-view-of-the-paradise-bora-bora-royalty-free-image-1620658687."
  );
  const [visibility, setVisibility] = useState("public");
  const [loading, setLoading] = useState(false);
  const { create } = useCommunity();

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const info = {
      ownerUserId: user.userId,
      name: name,
      description: description,
      imageUrl: image,
      visibility: visibility,
    };
    const res = await create(info);
    if (res.toString().toLowerCase().includes("success")) {
      window.location.href = "/community";
    } else {
      alert(res);
    }
    setLoading(false);
  };

  return (
    <div className="container px-4 flex items-center justify-center h-[90vh]">
      <form
        className="w-1/4 h-1/2 border shadow-2xl rounded"
        onSubmit={handleCreate}
      >
        <div className="p-4">
          <p className="text-center">Add Community</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Community Name..."
            className="w-full my-4"
          />
          <br />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Community Description..."
            className="w-full my-4"
          />
          <br />
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="w-1/3 my-2"
          >
            <option value="public" label="Public">
              Public
            </option>
            {/* <option value="private" label="Private">
              Private
            </option> */}
          </select>
          <br />
          <button className="text-center w-full bg-[#CC481F] text-white my-4 py-3 rounded">
            {loading ? <Spinner /> : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCommunity;
