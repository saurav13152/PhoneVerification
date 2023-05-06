import React, { useState } from "react";
import "./App.css";
import { Form, Button } from "react-bootstrap";
import PhoneVerify from "./componenets/PhoneVerify";

function App() {
  const [show, setShow] = useState(false);

  const handleShow = (event) => {
    event.preventDefault();
    setShow(true);
  };

  return (
    <>
    <div className="popup-overlay">
      <Form className="phone-form">
        <Form.Group className="mb-3">
          <Form.Label>Please enter your phone number:</Form.Label>
          <Form.Control type="number" placeholder="Enter Phone number" className="form-control" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleShow}>
          Submit
        </Button>
      </Form>
      <PhoneVerify show={show} setShow={setShow} />
    </div>

    <footer>
      Made By: Saurav Chatterjee
    </footer>
  </>
  );
}

export default App;
