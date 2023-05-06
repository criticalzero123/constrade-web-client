import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { stripePaymentIntent } from "../../redux/action/walletActions";
import { useLocation } from "react-router";
import CheckOutForm from "./CheckOutForm";
const stripePromise = loadStripe(
  "pk_test_51Mvx3FC1YMDXJxdtGT6j7vsZwU8By1JbzzWcv8Syh1QRlPK8DbXbtifyE2ouh00bpsJ1U7iy4ImYcxiwEixzLAiE009LNw9w2d"
);
const TopUpWallet = () => {
  // This is the amount
  const { state } = useLocation();
  const [secretClient, setSecretClient] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await stripePaymentIntent(parseInt(state.amount));

      setSecretClient(res.clientSecret);
    };

    fetch();
  }, [state]);

  const options = {
    // passing the client secret obtained from the server
    clientSecret: secretClient,
  };

  if (secretClient === undefined) return;

  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <CheckOutForm state={state} />
      </Elements>
    </div>
  );
};

export default TopUpWallet;
