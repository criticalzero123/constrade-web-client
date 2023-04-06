import React, { useState } from "react";
import GoogleButtonSignUp from "../../../components/sign-up/GoogleButtonSignUp";
import {
  checkEmail,
  requestOtpEmail,
  verifyOtp,
} from "../../../redux/action/authActions";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [success, setSuccess] = useState(false);

  const handleGenerateOtp = async (e) => {
    e.preventDefault();

    const emailExist = await checkEmail(email);

    if (emailExist) {
      alert("Email already exist");
      return;
    }

    const sent = await requestOtpEmail(email);

    setSuccess(sent);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const isSuccess = await verifyOtp(email, code);

    if (isSuccess) {
      alert("Success");
    } else {
      alert("Wrong otp Code");
    }
  };

  return (
    <div>
      <GoogleButtonSignUp />

      {success ? (
        <form onSubmit={handleVerifyOtp}>
          <input
            placeholder="000000"
            value={code}
            type="number"
            onChange={(e) => setCode(e.target.value)}
            className="border p-4"
          />
          <button>Verifiy</button>
        </form>
      ) : (
        <form onSubmit={handleGenerateOtp}>
          <input
            placeholder="Email..."
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="border p-4"
          />
          <button>Send OTP</button>
        </form>
      )}
    </div>
  );
};

export default SignUp;
