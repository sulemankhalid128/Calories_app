import React from "react";
import { Col, Row } from "reactstrap";

const MainLayout = ({ children }) => {
  return (
    <Row>
      <Col md="2"></Col>
      <Col md="8">
        <h1 className="bg-success text-center text-light py-5 font-weight-bold mb-0 background-hd">
          Calories App
        </h1>
        {children}
      </Col>
      <Col md="2"></Col>
    </Row>
  );
};

export default MainLayout;
