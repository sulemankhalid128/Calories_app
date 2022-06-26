import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Form, FormGroup, Button, Input, Label } from "reactstrap";
import AuthLayout from "./AuthLayout";

const SignUp = () => {
  const { register, errors, handleSubmit, watch } = useForm();

  const singUpUser = (value) => {
    debugger;
  };
  return (
    <AuthLayout>
      <Form onSubmit={handleSubmit(singUpUser)}>
        <h1 className="text-center">SignUp!</h1>
        <FormGroup>
          <Label for="email">Email:</Label>

          <Input
            type="email"
            name="email"
            innerRef={register({
              required: { value: true, message: "Please enter the email!" },
            })}
            aria-invalid={errors?.email ? "true" : "false"}
            placeholder="email"
          />
          <small className="text-danger">{errors?.email?.message}</small>
        </FormGroup>

        <FormGroup className="mb-3">
          <Label for="userName">User Name:</Label>

          <Input
            type="userName"
            name="userName"
            innerRef={register({
              required: { value: true, message: "Please enter the userName!" },
            })}
            aria-invalid={errors?.userName ? "true" : "false"}
            placeholder="User Name"
          />
          <small className="text-danger">{errors?.userName?.message}</small>
        </FormGroup>
        <FormGroup className="mb-3">
          <Label for="password">Password:</Label>

          <Input
            type="password"
            name="password"
            innerRef={register({
              required: { value: true, message: "Please enter the password!" },
              minLength: {
                value: 6,
                message: "Password length must be 6!",
              },
            })}
            aria-invalid={errors?.password ? "true" : "false"}
            placeholder="password"
          />
          <small className="text-danger">{errors?.password?.message}</small>
        </FormGroup>
        <FormGroup className="mb-3">
          <Label for="confirmPas">Confirm Password:</Label>
          <Input
            type="password"
            name="confirmPass"
            innerRef={register({
              validate: (value) =>
                value === watch("password") || "Passwords don't match.",
            })}
            aria-invalid={errors?.confirmPass ? "true" : "false"}
            placeholder="Confirm Password"
          />
        </FormGroup>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-danger">{errors?.confirmPass?.message}</small>
          <Link to="/" className="text-dark">
            Have an Account?
          </Link>
        </div>
        <div className="d-flex justify-content-end"></div>
        <Button className="w-100 bg-primary border-0 mt-4">Login</Button>
      </Form>
    </AuthLayout>
  );
};

export default SignUp;
