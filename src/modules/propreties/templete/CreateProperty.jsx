

import { useFormik } from "formik";
import React from "react";
import { propertyValidation } from "../validation/schema";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import "../../../assets/styels/components/forms.scss";

const CreateProperty = () => {
  const initialValues = {
    id: "",
    name: "",
    desc: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: propertyValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="from__card from__card__full">
        <form onSubmit={formik.handleSubmit} className="form">
          <div className="form__header">Create Property</div>

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
                <Text className="form__input__container__label"> Desc </Text>
              </FormLabel>

              <Input
                name="desc"
                type="text"
                className="form__input__container__input"
                placeholder="enter your desc"
                value={formik.values.desc}
                onChange={formik.handleChange}
                isInvalid={formik.touched.desc && !!formik.errors.desc}
              />

              <div className="form__input__container__warn">
                {formik.touched.desc && formik.errors.desc ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {formik.errors.desc}
                  </Text>
                ) : null}
              </div>
            </FormControl>
          </div>


          <div className="form__btn__container">
            <Button className="form__btn " type="submit">
              Create
            </Button>
          </div>
        </form>
    </div>
  );
};

export default CreateProperty;
