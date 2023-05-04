import { Button, Modal, Spinner } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { subscribeUser } from "../../redux/action/subscriptionAction";
import { useUserInfo } from "../../hooks/useUserInfo";
import { getUserInfo } from "../../redux/action/userActions";
import Swal from "sweetalert2";

const SubscriptionModal = ({ show, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { user, person } = useUserInfo();
  const dispatch = useDispatch();

  const handleSubscribe = async () => {
    setLoading(true);
    const res = await subscribeUser(user.userId);

    if (res) {
      if (res.toLowerCase() === "success") {
        const userInfo = {
          user: {
            ...user,
            userType: "premium",
          },
          person: {
            ...person,
          },
        };

        Swal.fire("Success!", `You are now a premium member.`, "success");
        dispatch(getUserInfo({ user: userInfo.user, person: userInfo.person }));
        onClose();
        return true;
      } else {
        Swal.fire("Warning!", `${res}.`, "warning");
      }
    } else {
      alert("Something went wrong in subscribing");
    }
    setLoading(false);
    return false;
  };
  return (
    <>
      <Modal show={show} onClose={onClose}>
        <Modal.Header>Be a subscriber now!</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Access to all features be a premium member now.{" "}
            </p>
            <p className="text-[#CC481F] font-semibold">For only 100.</p>
            <ul className="list-disc px-4">
              <li>Good for 1 month.</li>
              <li>Discount boosting product</li>
              <li>Change user preferences</li>
              <li>Additional 10 post counts</li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubscribe}>
            {loading ? <Spinner /> : "Subscribe"}
          </Button>
          <Button color="gray" onClick={onClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SubscriptionModal;
