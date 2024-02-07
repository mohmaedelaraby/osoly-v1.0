import { useFormik } from "formik";
import React, { useState } from "react";
import { userEnterpraiseValidation } from "../validation/schema";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import "../../../assets/styels/components/forms.scss";

const CreateEnterpraiseUser = () => {
  const initialValues = {
    name: "",
    numOfUnits: "",
    duration: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: userEnterpraiseValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const [duration, setDuration] = useState("1");

  return (
    <div className="from__card from__card__full">
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="form__header">Create Enterpraise User</div>

        <div className="form__input form__input__flex">
          <FormControl className="form__input__container">
            <FormLabel>
              <Text className="form__input__container__label">
                Enterpraise Name
              </Text>
            </FormLabel>

            <Input
              name="name"
              type="text"
              className="form__input__container__input"
              placeholder="enter your Enterpraise name "
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
              <Text className="form__input__container__label">
                {" "}
                Number Of Units{" "}
              </Text>
            </FormLabel>

            <Input
              name="numOfUnits"
              type="text"
              className="form__input__container__input"
              placeholder="enter your Number Of Units"
              value={formik.values.numOfUnits}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.numOfUnits && !!formik.errors.numOfUnits
              }
            />

            <div classeName="form__input__container__warn">
              {formik.touched.numOfUnits && formik.errors.numOfUnits ? (
                <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                  {formik.errors.numOfUnits}
                </Text>
              ) : null}
            </div>
          </FormControl>
        </div>

        <div className="form__input form__input__flex">
          <FormControl className="form__input__container">
            <FormLabel>
              <Text className="form__input__container__label">
                Enterpraise Duration
              </Text>
            </FormLabel>

            <RadioGroup onChange={setDuration} value={duration} marginTop='16px'>
              <Stack direction="row">
                <Radio value="1" marginRight='12px'>3 Months</Radio>
                <Radio value="2" marginRight='12px'>6 Months</Radio>
                <Radio value="3" marginRight='12px'>9 Months</Radio>
                <Radio value="4" marginRight='12px'>12 Months</Radio>
              </Stack>
            </RadioGroup>
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

export default CreateEnterpraiseUser;
