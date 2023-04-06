import React from "react";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";

const GoogleButtonSignIn = () => {
  const { login } = useGoogleAuth();

  return (
    <div
      className="p-4 border max-w-fit rounded cursor-pointer hover:bg-[#CC481F] hover:text-white"
      onClick={login}
    >
      <p> Sign in with Google</p>
    </div>
  );
};

export default GoogleButtonSignIn;
