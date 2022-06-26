import React from "react";
import { Spinner } from "reactstrap";

const Loader = ({ errorText, loaderClass }) => {
  return (
    <div className="w-100 justify-content-center align-items-center d-flex loader">
      <Spinner color="Primary" />
    </div>
  );
};
export default Loader;
