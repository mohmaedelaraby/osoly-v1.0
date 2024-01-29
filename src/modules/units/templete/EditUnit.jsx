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
import { unitsValidation } from "../validation/schema";


const EditUnit = () => {
  const { state } = useLocation();
  const { id, name, price } = state;

  const initialValues = {
    id: `${id}`,
    name: name,
    price: price,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: unitsValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <Card className="from__card">
        <CardBody>
          <form onSubmit={formik.handleSubmit} className="form">
            <div className="form__header">Edit Unit</div>
            <div className="from__card from__card__full">
              <div className="form__input form__input__flex">
                <FormControl className="form__input__container">
                  <FormLabel>
                    <Text className="form__input__container__label">Name</Text>
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
                    <Text className="form__input__container__label">Price</Text>
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
            </div>
            <div className="form__btn__container">
              <Button className="form__btn " type="submit">
                Edit
              </Button>
              <Button className="form__btn form__btn__delete ">Delete</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default EditUnit;
