import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="justify-content-center align-items-center d-flex auth-layout background">
      <div className="auth-with">{children}</div>
    </div>
  );
};

export default AuthLayout;
