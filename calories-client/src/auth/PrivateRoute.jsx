import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getUserLocal } from "../utils/statics";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let token = localStorage?.getItem("calories_token");
  let user = getUserLocal();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!token) {
          return <Redirect to="/" />;
        }
        if (user?.role === "admin") {
          return <Component {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
