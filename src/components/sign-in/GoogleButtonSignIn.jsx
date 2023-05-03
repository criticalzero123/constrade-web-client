import React from "react";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";

const GoogleButtonSignIn = () => {
  const { login } = useGoogleAuth();

  return (
    <div
      className="p-4 text-center rounded cursor-pointer border hover:bg-[#CC481F] hover:text-white"
      onClick={login}
    >
      <p>Google</p>
    </div>
  );
};

export default GoogleButtonSignIn;
