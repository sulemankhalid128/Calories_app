import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let token = localStorage?.getItem("calories_token");
  let user = localStorage?.getItem("user");
  user = JSON.parse(user);

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
