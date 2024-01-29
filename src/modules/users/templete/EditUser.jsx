import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import { useLocation } from "react-router-dom";
import { userValidation } from "../validation/schema";

const EditUser = () => {
  const { state } = useLocation();
  const { id, name, email } = state;

  const initialValues = {
    name: name,
    email: email,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: userValidation,
    onSubmit: (values) => {
      console.log(values ,id);
    },
  });
  return (
    <Card className="from__card ">
      <CardBody>
        <form onSubmit={formik.handleSubmit} className="form">
          <div className="form__header">Edit User</div>

          <div className="form__input form__input__flex">
            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label"> Name </Text>
              </FormLabel>

              <Input
                name="name"
                type="text"
                className="form__input__container__input"
                placeholder="enter your name"
                value={formik.values.name}
                onChange={formik.handleChange}
                isInvalid={formik.touched.name && !!formik.errors.name}
              />

              <div className="form__input__container__warn">
                {formik.touched.name && formik.errors.name ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {formik.errors.name}
                  </Text>
                ) : null}
              </div>
            </FormControl>

            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label"> Email </Text>
              </FormLabel>

              <Input
                name="email"
                type="text"
                classemail="form__input__container__input"
                placeholder="enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                isInvalid={formik.touched.email && !!formik.errors.email}
              />

              <div classemail="form__input__container__warn">
                {formik.touched.email && formik.errors.email ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {formik.errors.email}
                  </Text>
                ) : null}
              </div>
            </FormControl>
          </div>

          <div className="form__btn__container">
            <Button className="form__btn " type="submit">
              Edit 
            </Button>
            <Button className="form__btn form__btn__delete ">
              Delete
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default EditUser;
