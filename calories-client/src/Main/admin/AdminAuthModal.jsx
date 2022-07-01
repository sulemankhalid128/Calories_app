import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import { ApiService } from "../../axios-config";
import { setUserLocal } from "../../utils/statics";

// this component is used for the admin authorization
const AdminAuthModal = ({ toggle, isOpen }) => {
  const { register, errors, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  // this method is used for the authenticate the admin with password and set user info in the local storage
  const checkAdmin = async (values) => {
    try {
      setLoading(true);
      let res = await ApiService.validateAdmin({ ...values });
      setUserLocal(res);
      setLoading(false);
      toast.success("Admin Penal!");
      let ref = window.location.origin;
      window.location.replace(`${ref}/admin`);
      toggle();
    } catch (error) {
      setLoading(false);
      let errMsg = error?.response.data?.msg;
      toast.error(errMsg);
      toggle();
    }
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-md">
      <ModalHeader>Admin Check</ModalHeader>
      <Form onSubmit={handleSubmit(checkAdmin)}>
        <ModalBody>
          <FormGroup>
            <Input
              type="password"
              name="password"
              innerRef={register({
                required: {
                  value: true,
                  message: "Please enter the password!",
                },
              })}
              aria-invalid={errors?.password ? "true" : "false"}
              placeholder="Enter Password"
            />
            <small className="text-danger">{errors?.password?.message}</small>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle} size="sm">
            Cancel
          </Button>
          <Button color="success" disabled={loading} size="sm" className="px-4">
            {loading && <Spinner size="sm" />} Go
          </Button>{" "}
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default AdminAuthModal;
