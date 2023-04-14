import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useState } from "react";

export const useXPModal = () => {
  const [isShown, setIsShown] = useState(false);

  const toggle = () => setIsShown(!isShown);

  return { isShown, toggle };
};

const XPModal = (props) => (
  <Modal show={props.isShown} onHide={props.onClose}>
    <Modal.Header closeButton>
      <Modal.Title>{props.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{props.content}</Modal.Body>
    <Modal.Footer>
      <Button variant="info" onClick={props.onClose}>
        Close
      </Button>
      <Button variant="success" onClick={props.onSubmit}>
        Submit
      </Button>
    </Modal.Footer>
  </Modal>
);

export default XPModal;
