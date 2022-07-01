import React from "react";
import { Alert } from "reactstrap";

const WarningPenal = ({ message, isOpen, toggle }) => {
  console.log("----------->", message);

  return (
    <Alert color="danger" isOpen={isOpen} toggle={toggle} id="alertPenal">
      {message}
    </Alert>
  );
};

export default WarningPenal;
