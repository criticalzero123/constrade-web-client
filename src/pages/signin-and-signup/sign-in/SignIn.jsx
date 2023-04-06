import React, { useState } from "react";
import GoogleButtonSignIn from "../../../components/sign-in/GoogleButtonSignIn";
import { useEmailAuth } from "../../../hooks/useEmailAuth";

const SignIn = () => {
  const { loginEmail } = useEmailAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginEmail(email, password);
  };

  return (
    <div>
      <GoogleButtonSignIn />
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email..."
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="border p-4"
        />
        <input
          placeholder="Password..."
          value={password}
          type="password"
          security="*"
          onChange={(e) => setPassword(e.target.value)}
          className="border p-4"
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default SignIn;
