import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React from "react";
import { topUp } from "../../redux/action/walletActions";

const CheckOutForm = ({ state }) => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmitPayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {},
        redirect: "if_required",
      });

      if (error) {
        alert("Payment in stripe confirmation Error");

        return;
      }

      const result = await topUp(state.wallet.walletId, state.amount);

      if (result) {
        alert("Topup Successful");
        window.location.href = "/wallet";
      } else {
        alert("Something Went wrong in adding balance.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmitPayment} className="px-20">
      <PaymentElement />
      <button className="w-full py-4 rounded bg-[#CC481F] text-white mt-10">
        Submit
      </button>
    </form>
  );
};

export default CheckOutForm;
