import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { ApiService } from "../../axios-config";

const CreateUser = () => {
  const { handleSubmit, errors, register } = useForm();
  const createUser = async (value) => {
    try {
      let res = await ApiService.createUser(value);
    } catch (error) {}
  };
  return (
    <Form onSubmit={handleSubmit(createUser)}>
      <FormGroup>
        <Label for="foodName">
          User Name<span className="text-danger">*</span>
        </Label>
        <Input
          type="text"
          name="userName"
          innerRef={register({
            required: {
              value: true,
              message: "Please enter the user name!",
            },
          })}
          aria-invalid={errors?.userName ? "true" : "false"}
          placeholder="Food Name"
        />
        <small className="text-danger">{errors?.userName?.message}</small>
      </FormGroup>
      <Button color="success">Save Entry</Button>{" "}
    </Form>
  );
};

export default CreateUser;
