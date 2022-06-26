import React from "react";
import { Col, Row } from "reactstrap";

const MainLayout = ({ children }) => {
  return (
    <Row>
      <Col md="2"></Col>
      <Col md="8">
        <h2 className="bg-success text-center text-light py-3 font-weight-bold mb-0 background-hd">
          Calories App
        </h2>
        {children}
      </Col>
      <Col md="2"></Col>
    </Row>
  );
};

export default MainLayout;
