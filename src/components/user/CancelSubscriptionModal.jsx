import { Button, Modal, Spinner } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { cancelSubscription } from "../../redux/action/subscriptionAction";
import { useUserInfo } from "../../hooks/useUserInfo";
import { getUserInfo } from "../../redux/action/userActions";
import Swal from "sweetalert2";

const CancelSubscriptionModal = ({ show, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { user, person } = useUserInfo();
  const dispatch = useDispatch();

  const handleCancelSubscribe = async () => {
    setLoading(true);
    const res = await cancelSubscription(user.userId);

    if (res) {
      const userInfo = {
        user: {
          ...user,
          userType: "verified",
        },
        person: {
          ...person,
        },
      };
      Swal.fire("Success!", `Cancelling subscription successfully.`, "success");
      dispatch(getUserInfo({ user: userInfo.user, person: userInfo.person }));
      onClose();
    } else {
      alert("Something went wrong in cancelling the subscription");
    }
    setLoading(false);
  };
  return (
    <>
      <Modal show={show} onClose={onClose}>
        <Modal.Header>Subscription</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Are you sure you want to cancel the subscription?
            </p>
            <p className="text-[#CC481F] font-semibold">
              This is not refundable.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCancelSubscribe}>
            {loading ? <Spinner /> : "Yes"}
          </Button>
          <Button color="gray" onClick={onClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CancelSubscriptionModal;
