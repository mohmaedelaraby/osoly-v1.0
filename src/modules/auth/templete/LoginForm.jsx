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
import whiteLogo from "../../../assets/images/whiteLogo.png";

function LoginForm() {
  const [show, setShow] = useState(false);
  const [removeReadOnly , setRemoveReadOnly]=useState(true)
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
    <>
      <div className="login_page">
        <div className="login_page_form">
          <form onSubmit={formik.handleSubmit} className="login_form"  autoComplete="false">
            <div className="login__form__icon__text">مرحباً بك في أصولي</div>
            <div className="login__form__icon__login_field">
              <Input
                type="text"
                name="username"
                dir="rtl"
                readOnly={removeReadOnly}
                onFocus={()=>{setRemoveReadOnly(false)}}
                placeholder="البريد الإلكتروني"
                className="login_form_input"
                bg={"white"}
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
            </div>
            <div className="login__form__icon__login_field">
              <Input
                name="password"
                dir="rtl"
                pr="4.5rem"
                className="login_form_input mb-0"
                type={show ? "text" : "password"}
                placeholder="كلمة المرور"
                bg={"white"}
                value={formik.values.password}
                onChange={formik.handleChange}
                isInvalid={formik.touched.password && !!formik.errors.password}
              />

              <div className="login_form_warn">
                {formik.touched.password && formik.errors.password ? (
                  <Text color="#EE2E2E" fontSize="sm" className="">
                    {formik.errors.password}
                  </Text>
                ) : null}
              </div>
            </div>
            <div className="login__form__icon__login_field_start ">
            <div className="login_form_forget">نسيت كلمة المرور؟</div>
            </div>
           
            <div className="login__form__icon__login_field">
              <Button
                className="login_form_btn"
                type="submit"
                isLoading={isLoading}
              >
                تسجيل الدخول
              </Button>
            </div>
          </form>
        </div>
        <div className="login_page_image">
          <img src={whiteLogo} alt="logo" />
        </div>
      </div>
    </>
  );
}

export default LoginForm;
