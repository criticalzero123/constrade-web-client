import { Button, Modal } from "flowbite-react";
import React from "react";

const EditPostCommunity = ({ show, onClose, onSubmit, value, setValue }) => {
  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Edit Post</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSubmit}>Done</Button>
        <Button color="gray" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPostCommunity;
