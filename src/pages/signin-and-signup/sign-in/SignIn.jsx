import React, { useState } from "react";
import GoogleButtonSignIn from "../../../components/sign-in/GoogleButtonSignIn";
import { useEmailAuth } from "../../../hooks/useEmailAuth";

import { textWhite, mainColor } from "../../../utilities/colors";

const SignIn = () => {
  const { loginEmail } = useEmailAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginEmail(email, password);
  };

  return (
    <div className="flex flex-col justify-center min-w-fit max-w-xl m-auto gap-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome to Constrade</h1>
        <p className="text-base mt-4">
          Value proposition something to say here edit later
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 p-12">
        <div className="flex flex-col gap-2">
          <p>Email</p>
          <input
            placeholder="email@address.com"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="p-4 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Password</p>
          <input
            placeholder="Enter password"
            value={password}
            type="password"
            security="*"
            onChange={(e) => setPassword(e.target.value)}
            className="p-4 rounded-md"
          />
        </div>
        <button className="py-4 bg-[#CC481F] rounded-md text-[#FCFBFA]">
          Login
        </button>
      </form>

      <div className="flex flex-col gap-12 text-center px-12 rounded-lg">
        <p>or continue using</p>
        <GoogleButtonSignIn />
      </div>
    </div>
  );
};

export default SignIn;
