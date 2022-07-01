import React, { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import userProfile from "../assets/images/user.png";
import AdminAuthModal from "../Main/admin/AdminAuthModal";
import { getUserLocal } from "../utils/statics";

const MainLayout = ({ children }) => {
  const [adminModal, setAdminModal] = useState(false);
  let user = getUserLocal();
  let isAdminPenal = window.location.href.split("/");
  return (
    <Row>
      <Col md="2"></Col>
      <Col md="8">
        <div className="background d-flex justify-content-between ">
          <h1 className=" text-center text-light pb-5 pt-5 font-weight-bold ms-2">
            Calories App
          </h1>

          <div className="mt-2 me-3">
            {user?.role !== "admin" && (
              <Button
                className="btn-sm me-2 bg-transparent text-light"
                onClick={() => setAdminModal(!adminModal)}
              >
                As Admin
              </Button>
            )}
            {user?._id &&
              user?.role === "admin" &&
              !isAdminPenal?.includes("admin") && (
                <Button
                  size="sm"
                  className="me-3 bg-transparent"
                  onClick={() => {
                    let ref = window.location.origin;
                    window.location.replace(`${ref}/admin`);
                  }}
                >
                  Admin Penal
                </Button>
              )}
            {user?._id && (
              <>
                <strong className="text-light me-2">User: {user?.name}</strong>
                <img src={userProfile} alt="alt" width={30} height={30} />
              </>
            )}
          </div>
        </div>
        {children}
      </Col>
      <Col md="2"></Col>
      <AdminAuthModal
        toggle={() => setAdminModal(!adminModal)}
        isOpen={adminModal}
      />
    </Row>
  );
};

export default MainLayout;
