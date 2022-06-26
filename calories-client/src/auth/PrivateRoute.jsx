import React from "react";
import { Route, Navigate, Link } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  //   const { user } = useContext(AppContext);
  let token = localStorage?.getItem("token");

  return (
    <Route
      {...rest}
      render={(props) => {
        // if (!token) {
        //   <Navigate
        //     to={{ pathname: "/login", state: { from: props.location } }}
        //   />;
        // }
        <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
