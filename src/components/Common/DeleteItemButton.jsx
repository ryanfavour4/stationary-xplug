import { Button } from "react-bootstrap";

const DeleteItemButton = ({ onClick }) => {
  return (
    <Button variant="danger" onClick={onClick}>
      Delete
    </Button>
  );
};

export default DeleteItemButton;
