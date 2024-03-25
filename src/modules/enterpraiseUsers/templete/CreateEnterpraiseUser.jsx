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
import close from "../../../assets/icons-svgs/close.svg";

const CreateEnterpraiseUser = () => {
  const initialValues = {
    name: "",
    date: "",
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
        <div className="form__header">
          <div className="form__header_text">إضافة مؤسس جديد</div>
          <div className="form__header_close">
            <img src={close} alt="" width="40px" />
          </div>
        </div>
        <div></div>
        <div className="form__input form__input__flex">
          <FormControl className="form__input__container">
            <Input
              name="name"
              type="text"
              className="form__input__container__input"
              placeholder="اسم المؤسس "
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
        </div>

        <div className="form__input form__input__flex">
          <FormControl className="form__input__container">
            <Input
              name="numOfUnits"
              type="number"
              className="form__input__container__input"
              placeholder="عدد الوحدات"
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

          <FormControl className="form__input__container">
            <Input
              name="numOfUnits"
              type="date"
              className="form__input__container__input"
              placeholder="موعد الإنتهاء"
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

        <div className="form__btn__container">
         

          <Stack direction="row" width='100%' justify='space-between'>
            <Button padding='0px 49px' variant="solid" color='white' bg='#194C81' type="submit">
              اضافه
            </Button>
            <Button padding='0px 26px' color={'#010B38'} variant="outline">
              الغاء
            </Button>
          </Stack>
        </div>
      </form>
    </div>
  );
};

export default CreateEnterpraiseUser;
