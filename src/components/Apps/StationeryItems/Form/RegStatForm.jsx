import { Form, Row } from "react-bootstrap";
import { useState } from "react";

export const useStatForm = ({ frm }) => {
  const [form, setForm] = useState(frm);
  const [errors, setErrors] = useState({});

  const handleValueChange = (e) => {
    if (e.target.type === "checkbox") {
      if (form[e.target.name] === false) {
        form[e.target.name] = true;
      } else if (form[e.target.name] === true) {
        form[e.target.name] = false;
      } else {
        form[e.target.name] = true;
      }
      setForm({ ...form });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }

    if (!!errors[e.target.name])
      setErrors({
        ...errors,
        [e.target.name]: null,
      });
  };

  const validateForm = () => {
    const { stat_name, stat_type, stat_quantity, stat_price } = form;
    const newErrors = {};

    // Stationery Name errors
    if (!stat_name || stat_name === "")
      newErrors.stat_name = "Kindly Supply Stationery Name!";
    else if (stat_name.length < 3)
      newErrors.stat_name = "Stationery Name is too short!";
    else if (stat_name.length > 50)
      newErrors.stat_name = "Stationery Name is too long!";

    // Stationery Type
    if (!stat_type || stat_type === "")
      newErrors.stat_type = "Kindly Select Stationery Type!";
    else if (stat_type.length < 2)
      newErrors.stat_type = "Invalid Stationery Type!";
    else if (stat_type.length > 50)
      newErrors.stat_type = "Invalid Stationery Type";
    else if (stat_type === "-- Please Select --")
      newErrors.stat_type = "Kindly Select Stationery Type!";

    // Quantity errors
    if (!stat_quantity || stat_quantity === "NaN")
      newErrors.stat_quantity = "Kindly Enter Quantity!";
    else if (stat_quantity.length < 1)
      newErrors.stat_quantity = "Stationery Quantity must be greater than 0";

    // Price errors
    if (!stat_price || stat_price === "NaN")
      newErrors.stat_price = "Kindly Enter Price Per Unit!";
    else if (stat_price.length < 1)
      newErrors.stat_price = "Price Per Unit must be greater than 0";

    return newErrors;
  };

  const initForm = (form) => {
    setForm(form);
  };

  return { form, handleValueChange, initForm, validateForm, setErrors, errors };
};

export const RegStatForm = ({ form, handleValueChange, errors }) => {
  return (
    <Form className="container mb-3 mt-3">
      <input
        type="hidden"
        id="stat_id"
        name="stat_id"
        value={form.stat_id}
        onChange={handleValueChange}
      />
      <Row className="mb-3">
        <Form.Group controlId="stName" className="col col-sm-12">
          <Form.Label>Stationery Name</Form.Label>
          <Form.Control
            type="name"
            name="stat_name"
            value={form.stat_name}
            onChange={handleValueChange}
            className="form-control"
            isInvalid={!!errors["stat_name"]}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors["stat_name"]}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group controlId="stType" className="col col-sm-12">
          <Form.Label>Stationery Type</Form.Label>
          <Form.Select
            //defaultValue="-- Please Select --"
            className="form-control"
            name="stat_type"
            value={form.stat_type}
            onChange={handleValueChange}
            isInvalid={!!errors["stat_type"]}
          >
            <option value="-- Please Select --">-- Please Select --</option>
            <option value="Paper Item">Paper Item</option>
            <option value="Ink Item">Ink Item</option>
            <option value="Staple Item">Staple Item</option>
            <option value="Card Item">Card Item</option>
            <option value="Instruction Panel">Instruction Panel</option>
            <option value="Coloring Item">Coloring Item</option>
            <option value="Business Item">Business Item</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors["stat_type"]}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group controlId="stQuantity" className="col col-sm-6">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            name="stat_quantity"
            value={form.stat_quantity}
            onChange={handleValueChange}
            isInvalid={!!errors["stat_quantity"]}
            className="form-control"
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors["stat_quantity"]}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="stPrice" className="col col-sm-6">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="stat_price"
            value={form.stat_price}
            onChange={handleValueChange}
            isInvalid={!!errors["stat_price"]}
            className="form-control"
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors["stat_price"]}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group controlId="stActive" className="col col-sm-12">
          <Form.Check
            type="checkbox"
            name="stat_active"
            checked={form.stat_active}
            onChange={handleValueChange}
            label="Is Active?"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3"></Row>
    </Form>
  );
};
