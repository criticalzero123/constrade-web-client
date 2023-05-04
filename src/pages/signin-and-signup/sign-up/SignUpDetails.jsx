import React, { useState } from "react";
import { useLocation } from "react-router";
import passwordValidator, {
  passwordMeterChecker,
  passwordMeterColor,
  passwordMeterWord,
} from "../../../utilities/passwordValidator";
import { Progress, Spinner } from "flowbite-react";
import { createWithEmailAndPassword } from "../../../firebase/firebaseAuth";
import { emailAndPasswordRegister } from "../../../redux/action/authActions";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../../../redux/action/userActions";

const SignUpDetails = () => {
  // email
  const { state } = useLocation();

  if (state === null) window.location.href = "/register";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [onLoading, setOnLoading] = useState(false);
  const dispatch = useDispatch();
  const image =
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

  const valid = passwordValidator.validate(password) ? true : false;

  const meterValue = passwordMeterChecker(password);
  const meterColor = passwordMeterColor(meterValue);
  const meterWord = passwordMeterWord(meterValue);

  const validateEmpty = () => {
    return firstName.trim() === "" || lastName.trim() === "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validateEmpty()) {
      alert("Please input all required fields");
      return;
    }

    if (!valid) {
      alert(
        "Please input atleast 8 characters and 1 small and upper case and number"
      );
      return;
    }

    setOnLoading(true);
    const user = {
      userType: "semi-verified",
      authProviderType: "email",
      userStatus: "active",
      email: state,
      password: password,
      imageUrl: image,
    };
    const person = {
      firstname: firstName,
      lastname: lastName,
    };
    try {
      const gResult = await createWithEmailAndPassword(user, person);
      const res = await emailAndPasswordRegister(gResult);

      if (res) {
        setOnLoading(false);
        dispatch(getUserInfo(res.user));
        localStorage.setItem("ApiKey", JSON.stringify(res.apiKey));
        localStorage.setItem("Authorization", JSON.stringify(res.token));

        window.location.href = "/discover";
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.log(error.code, error.message);
    }
  };

  return (
    <div className="container px-4">
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="first name..."
          className="p-4 rounded-md"
        />

        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="last name..."
          className="p-4 rounded-md"
        />
        <div>
          <input
            placeholder="Enter password"
            value={password}
            type="password"
            security="*"
            onChange={(e) => setPassword(e.target.value)}
            className={`border rounded ${
              password.length !== 0
                ? valid
                  ? "border-green-500 bg-green-100"
                  : "border-red-500 bg-red-100"
                : "border-gray-500"
            }`}
          />
          {meterValue !== 0 && (
            <div>
              <p className={`mb-2 text-base`} style={{ color: meterColor }}>
                {meterWord}
              </p>
              <Progress
                progress={meterValue}
                color={meterColor}
                className="rounded"
              />
            </div>
          )}
        </div>
        <button disabled={onLoading}>
          {onLoading ? <Spinner /> : "Register"}
        </button>
      </form>
    </div>
  );
};

export default SignUpDetails;
