import { Button, Modal, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useUserInfo } from "../../hooks/useUserInfo";
import { getHasRequest, submitIdRequest } from "../../redux/action/userActions";
import { ValidIdType } from "../../utilities/enums";

const VerificationModal = ({ show, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { user, person } = useUserInfo();

  const [idNumber, setIdNumber] = useState("");
  const [idType, setIdType] = useState(0);
  const [requestInfo, setRequestInfo] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await getHasRequest(user.userId);

      setRequestInfo(res);
    };

    fetch();
  }, [user.userId]);

  const onPress = async () => {
    setLoading(true);
    if (idNumber.trim() === "") {
      alert("Put some id number..");
      setLoading(false);

      return;
    }

    const info = {
      userName:
        person.firstName.toLowerCase() + " " + person.lastName.toLowerCase(),
      userId: user.userId,
      validationType: idType,
      validIdNumber: idNumber.toLowerCase(),
    };

    const res = await submitIdRequest(info);

    if (res) {
      alert("Successfully submitted!");
    } else {
      alert("Not successful submitted!");
    }

    setLoading(false);
    onClose();
  };

  if (requestInfo && requestInfo.status.toLowerCase() === "accepted")
    return (
      <>
        <Modal show={show} onClose={onClose}>
          <Modal.Header>Verification</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Already Verified
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={onClose}>
              Okay
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );

  if (requestInfo && requestInfo.status.toLowerCase() === "pending")
    return (
      <>
        <Modal show={show} onClose={onClose}>
          <Modal.Header>Verification</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Pending Verification.
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={onClose}>
              Okay
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );

  return (
    <>
      <Modal show={show} onClose={onClose}>
        <Modal.Header>Verification</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <label className="mr-2">Id Number:</label>
            <input
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder="Id Number..."
              className="px-4 py-2 border rounded border-gray-400"
            />
            <br />
            <label className="mr-2">Id Type:</label>

            <select
              value={idType}
              onChange={(e) => setIdType(parseInt(e.target.value))}
              className="px-4 py-2 border rounded border-gray-400"
            >
              {ValidIdType.map((type, index) => (
                <option value={index} label={type} key={index}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onPress}>{loading ? <Spinner /> : "Submit"}</Button>
          <Button color="gray" onClick={onClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default VerificationModal;
