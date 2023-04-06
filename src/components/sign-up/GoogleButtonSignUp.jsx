import React from "react";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";

const GoogleButtonSignUp = () => {
  const { register } = useGoogleAuth();

  return (
    <div
      className="p-4 hover:border hover:text-[#CC481F] hover:border-[#CC481F] hover:bg-white max-w-fit rounded cursor-pointer bg-[#CC481F] text-white"
      onClick={register}
    >
      <p> Sign up with Google</p>
    </div>
  );
};

export default GoogleButtonSignUp;
