import {
  Button,
  Card,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useLoginMutation } from "../hooks/useLoginMutation";
import { loginValidation } from "../validation/loginValidation";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import "../style/login.scss";
import logo from "../../../assets/originallogo.png";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [show, setShow] = useState(false);
  //const nav = useNavigate()

  const { mutate, isLoading } = useLoginMutation();

  const handleClick = () => setShow(!show);

  const initialValues = {
    username: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidation,
    onSubmit: (values) => {
      mutate({ username: values.username, password: values.password });
      console.log(values);
      //nav('/home')
    },
  });
  return (
    <Card padding="36px">
      <form onSubmit={formik.handleSubmit} className="login_form">
        <div className="login__form__icon__container">
          <img src={logo} alt="logo" className="login__form__icon" />
        </div>
        <FormControl>
          <Input
            type="text"
            name="username"
            placeholder="Enter username"
            className="login_form_input"
            value={formik.values.username}
            onChange={formik.handleChange}
            isInvalid={formik.touched.username && !!formik.errors.username}
          ></Input>
          <div className="login_form_warn">
            {formik.touched.username && formik.errors.username ? (
              <Text color="#EE2E2E" fontSize="sm" className="">
                {formik.errors.username}
              </Text>
            ) : null}
          </div>
        </FormControl>
        <FormControl marginTop='12px'>
          <InputGroup>
            <Input
              name="password"
              pr="4.5rem"
              className="login_form_input"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              value={formik.values.password}
              onChange={formik.handleChange}
              isInvalid={formik.touched.password && !!formik.errors.password}
            />
            <InputRightElement>
              <Button size="sm" variant="unstyled" onClick={handleClick}>
                {!show ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <div className="login_form_warn">
            {formik.touched.password && formik.errors.password ? (
              <Text color="#EE2E2E" fontSize="sm" className="">
                {formik.errors.password}
              </Text>
            ) : null}
          </div>
        </FormControl>
        <Button className="login_form_btn" type="submit" isLoading={isLoading}>
          Login
        </Button>
      </form>
    </Card>
  );
}

export default LoginForm;
