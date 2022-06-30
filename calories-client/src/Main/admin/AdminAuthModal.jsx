import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
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

const AdminAuthModal = ({ toggle, isOpen }) => {
  const history = useHistory();
  const { register, errors, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const checkAdmin = async (values) => {
    try {
      setLoading(true);
      let res = await ApiService.validateAdmin({ ...values });
      localStorage.clear();
      localStorage.setItem("calories_token", res?.token);
      localStorage.setItem("user", JSON.stringify(res));
      setLoading(false);
      toast.success("Admin Penal!");
      history.push("/admin");
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
      <ModalHeader toggle={toggle}>Admin Check</ModalHeader>

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
