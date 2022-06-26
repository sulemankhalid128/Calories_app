import React, { useState } from "react";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";

const ConfirmPopUp = ({
  confirmText,
  confirmAction,
  isOpen,
  toggle,
  modalHeading,
  btnText,
  btnColor,
  extraProp,
  secondaryText,
  className,
  loading,
  disabled = false,
}) => {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={() => toggle()} className={className}>
        <ModalHeader toggle={() => toggle()}>{modalHeading}</ModalHeader>
        <ModalBody>
          <Row>
            <Col xs="12">
              <p>
                {confirmText} <b>{extraProp}</b> {secondaryText}
              </p>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => toggle()}
            size="sm"
            className="bg-default mr-3 border-0"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              confirmAction();
            }}
            size="sm"
            className="bg-danger border-0"
            disabled={disabled}
          >
            {loading && <Spinner size="sm" className="mr-2" />}
            {btnText || "Yes, Delete"}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ConfirmPopUp;
