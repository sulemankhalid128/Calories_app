import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Form, FormGroup, Button, Input, Label } from "reactstrap";
import { ApiService } from "../axios-config";
import { EMAIL_PATTERN } from "../utils/statics";
import AuthLayout from "./AuthLayout";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const loginUser = async (value) => {
    debugger;
    try {
      await ApiService.login(value);
    } catch (error) {
      debugger;
    }
  };

  return (
    <AuthLayout>
      <Form onSubmit={handleSubmit(loginUser)}>
        <h1 className="text-center mb-3">Login!</h1>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input
            type="text"
            name="email"
            innerRef={register({
              required: { value: true, message: "Please enter the email!" },
              pattern: {
                value: EMAIL_PATTERN,
                message: "Email is not valid!",
              },
            })}
            aria-invalid={errors?.email ? "true" : "false"}
            placeholder="email"
          />
          <small className="text-danger">{errors?.email?.message}</small>
        </FormGroup>

        <FormGroup className="mb-3">
          <Label for="password">Password:</Label>
          <Input
            type="password"
            name="password"
            innerRef={register({
              required: { value: true, message: "Please enter the password!" },
            })}
            aria-invalid={errors?.password ? "true" : "false"}
            placeholder="email"
          />
          <small className="text-danger">{errors?.password?.message}</small>
        </FormGroup>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Input
              name="isManger"
              type="checkbox"
              innerRef={register({
                required: {
                  value: false,
                  message: "",
                },
              })}
            />
            <Label className="ms-2">Login As Manager?</Label>
          </div>
          <Link to="/signup" className="text-dark">
            Create an Account?
          </Link>
        </div>
        <div className="d-flex justify-content-end"></div>
        <Button type="submit" className="w-100 bg-success border-0 mt-4">
          Login
        </Button>
      </Form>
    </AuthLayout>
  );
};

export default Login;
