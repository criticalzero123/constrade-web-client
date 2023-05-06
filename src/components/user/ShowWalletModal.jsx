import { Modal } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ShowWalletModal = ({ show, onClose, wallet }) => {
  const [amount, setAmount] = useState(0);
  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Be a subscriber now!</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Enter Amount <span className="text-gray-300">(more than 100)</span>
          </p>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount..."
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Link
          to={amount >= 100 && "/wallet/topup"}
          state={{ wallet: wallet, amount: amount }}
          className="hover:text-[#CC481F] px-4 py-2 border border-[#CC481F] rounded "
        >
          Proceed
        </Link>
        <Link color="gray" onClick={onClose}>
          Cancel
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowWalletModal;
