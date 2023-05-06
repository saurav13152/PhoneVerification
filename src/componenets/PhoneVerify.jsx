import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const PhoneVerify = ({ show, setShow }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  function handleInputChange(index, event) {
    event.preventDefault();
    const value = event.target.value;
    if (/^[0-9]*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (
        inputRefs.current[index + 1] &&
        value &&
        index < inputRefs.current.length - 1
      ) {
        inputRefs.current[index + 1].focus();
      }
      if (inputRefs.current[index - 1] && !value && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  }

  function handlePaste(event) {
    event.preventDefault();
    const clipboardData = event.clipboardData.getData("Text");
    if (/^[0-9]{6}$/.test(clipboardData)) {
      const newOtp = clipboardData.split("").slice(0, 6);
      setOtp(newOtp);
      inputRefs.current.forEach((input, index) => {
        input.value = newOtp[index];
      });
    }
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Phone Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3" style={{textAlign: "center"}}>
            Enter the otp you received
          </div>
          <div className="otp-input-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                type="text"
                maxLength="1"
                className="otp-input"
                value={digit}
                onChange={(event) => handleInputChange(index, event)}
                onKeyDown={(event) => {
                  if (
                    inputRefs.current[index - 1] &&
                    event.key === "ArrowLeft" &&
                    index > 0
                  ) {
                    inputRefs.current[index - 1].focus();
                  } else if (
                    event.key === "ArrowRight" &&
                    index < inputRefs.current.length - 1 &&
                    inputRefs.current[index + 1]
                  ) {
                    inputRefs.current[index + 1].focus();
                  } else if (
                    inputRefs.current[index - 1] &&
                    event.key === "Backspace" &&
                    !digit &&
                    index > 0
                  ) {
                    inputRefs.current[index - 1].focus();
                  }
                }}
                onPaste={handlePaste}
              />
            ))}
          </div>
          <div className="form-links">
            <a href="#" style={{textDecoration: "none"}}>Change Number</a>
            <a href="#" style={{textDecoration: "none"}}>Re-send OTP</a>
          </div>
        </Modal.Body>
        <Modal.Footer className="phone-footer">
          <Button variant="success">Verify Phone Number</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PhoneVerify;
