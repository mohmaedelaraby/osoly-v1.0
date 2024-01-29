

import { useFormik } from "formik";
import React from "react";
import { unitsValidation } from "../validation/schema";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import "../../../assets/styels/components/forms.scss";

const CreateUnit = () => {
  const initialValues = {
    id: "",
    name: "",
    price: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: unitsValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="from__card from__card__full">
        <form onSubmit={formik.handleSubmit} className="form">
          <div className="form__header">Create Unit</div>

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
                <Text className="form__input__container__label"> Price </Text>
              </FormLabel>

              <Input
                name="price"
                type="text"
                className="form__input__container__input"
                placeholder="enter your price"
                value={formik.values.price}
                onChange={formik.handleChange}
                isInvalid={formik.touched.price && !!formik.errors.price}
              />

              <div className="form__input__container__warn">
                {formik.touched.price && formik.errors.price ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {formik.errors.price}
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

export default CreateUnit;
