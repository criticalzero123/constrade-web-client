import React, { useState } from "react";
import GoogleButtonSignUp from "../../../components/sign-up/GoogleButtonSignUp";
import {
  checkEmail,
  requestOtpEmail,
  verifyOtp,
} from "../../../redux/action/authActions";
import { Spinner } from "flowbite-react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [success, setSuccess] = useState(false);
  const [sendingcode, setSendingCode] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleGenerateOtp = async (e) => {
    e.preventDefault();
    setSendingCode(true);

    const emailExist = await checkEmail(email);

    if (emailExist) {
      alert("Email already exist");
      setSendingCode(false);

      return;
    }

    const sent = await requestOtpEmail(email);

    setSuccess(sent);
    setSendingCode(false);
  };

  const handleVerifyOtp = async (e) => {
    setVerifyingCode(true);
    e.preventDefault();

    const isSuccess = await verifyOtp(email, code);

    if (isSuccess) {
      setVerified(isSuccess);
    } else {
      alert("Wrong otp Code");
    }

    setVerifyingCode(false);
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
          {verified ? (
            <Link to="/register/details" state={email}>
              Proceed
            </Link>
          ) : (
            <button disabled={verifyingCode}>
              {verifyingCode ? <Spinner /> : "Verify"}
            </button>
          )}
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
          <button disabled={sendingcode}>
            {sendingcode ? <Spinner /> : "Send OTP"}
          </button>
        </form>
      )}
    </div>
  );
};

export default SignUp;
