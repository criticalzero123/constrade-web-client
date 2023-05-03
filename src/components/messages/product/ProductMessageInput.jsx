import React, { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";

const ProductMessageInput = ({ sendMessage }) => {
  const [text, setText] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    sendMessage(text);
    setText("");
  };

  return (
    <div className="w-full p-3 absolute bottom-0 flex place-items-end">
      <form
        onSubmit={handleSend}
        className="bg-white p-2 rounded-lg shadow-xl mb-2 w-full"
      >
        <div className="flex">
          <input
            type="text"
            placeholder="Type something..."
            onChange={(e) => setText(e.target.value)}
            value={text}
            required
            autoFocus
            className="w-full rounded border-0 focus:ring-0  mr-5"
          />
          <button className=" bg-[#2C61F6] px-2 rounded-md mr-2 hover:text-red-500">
            <RiSendPlaneFill size={25} color={"white"} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductMessageInput;
