import React from "react";
import { Alert } from "reactstrap";

const WarningPenal = ({ message }) => {
  return <Alert color="danger">{message}</Alert>;
};

export default WarningPenal;
