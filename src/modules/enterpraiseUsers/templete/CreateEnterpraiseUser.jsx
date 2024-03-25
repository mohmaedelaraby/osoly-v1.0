import { useFormik } from "formik";
import React, { useState } from "react";
import { userEnterpraiseValidation } from "../validation/schema";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import "../../../assets/styels/components/forms.scss";
import close from "../../../assets/icons-svgs/close.svg";

const CreateEnterpraiseUser = ({onClose}) => {
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
            <img src={close} alt="" width="40px" onClick={onClose}/>
          </div>
        </div>
        <div></div>
        <div className="form__input form__input__flex">
          <FormControl className="form__input__container">
            <Input
              name="name"
              size="lg"
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
            <InputGroup>
              {/* <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                flexDirection={'column'}
                gap={'4px'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="7"
                  viewBox="0 0 15 7"
                  fill="none"
                >
                  <path
                    d="M7.02328 0.0023489C7.25694 0.00189257 7.48337 0.0832672 7.66328 0.232348L13.6633 5.23235C13.8675 5.40209 13.9959 5.646 14.0203 5.91043C14.0447 6.17485 13.963 6.43813 13.7933 6.64235C13.6235 6.84657 13.3796 6.97499 13.1152 6.99937C12.8508 7.02375 12.5875 6.94209 12.3833 6.77235L7.02328 2.29235L1.66328 6.61235C1.561 6.69541 1.4433 6.75745 1.31696 6.79488C1.19062 6.83231 1.05813 6.8444 0.927102 6.83046C0.796074 6.81653 0.669091 6.77683 0.553454 6.71365C0.437818 6.65048 0.335806 6.56508 0.253284 6.46235C0.161704 6.35953 0.0923443 6.2389 0.049552 6.10803C0.00675964 5.97715 -0.00854301 5.83885 0.00459957 5.70179C0.0177422 5.56473 0.0590487 5.43185 0.125932 5.3115C0.192815 5.19114 0.283834 5.08589 0.393285 5.00235L6.39328 0.172349C6.57837 0.046833 6.80018 -0.0130219 7.02328 0.0023489Z"
                    fill="#646466"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="7"
                  viewBox="0 0 15 7"
                  fill="none"
                >
                  <path
                    d="M7.00125 7.00485C6.7676 7.00531 6.54116 6.92393 6.36125 6.77485L0.361252 1.77485C0.157036 1.60512 0.0286112 1.3612 0.0042315 1.09678C-0.0201482 0.832351 0.0615137 0.56907 0.231252 0.364853C0.400991 0.160636 0.644902 0.0322123 0.909329 0.00783259C1.17375 -0.0165471 1.43704 0.0651143 1.64125 0.234853L7.00125 4.71485L12.3613 0.394854C12.4635 0.311788 12.5812 0.249756 12.7076 0.212324C12.8339 0.174892 12.9664 0.162799 13.0974 0.176738C13.2285 0.190677 13.3554 0.230374 13.4711 0.293548C13.5867 0.356722 13.6887 0.442127 13.7713 0.544853C13.8628 0.647675 13.9322 0.768301 13.975 0.899175C14.0178 1.03005 14.0331 1.16835 14.0199 1.30541C14.0068 1.44248 13.9655 1.57535 13.8986 1.6957C13.8317 1.81606 13.7407 1.92131 13.6313 2.00485L7.63125 6.83485C7.44617 6.96037 7.22435 7.02022 7.00125 7.00485Z"
                    fill="#646466"
                  />
                </svg>
              </InputLeftElement> */}
              <Input
                name="numOfUnits"
                size="lg"
                type="number"
                padding={'16px'}
                className="form__input__container__input"
                placeholder="عدد الوحدات"
                value={formik.values.numOfUnits}
                onChange={formik.handleChange}
                isInvalid={
                  formik.touched.numOfUnits && !!formik.errors.numOfUnits
                }
              />
            </InputGroup>

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
              size="lg"
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
          <Stack direction="row" width="100%" justify="space-between">
            <Button
              padding="0px 49px"
              variant="solid"
              color="white"
              bg="#194C81"
              type="submit"
            >
              اضافه
            </Button>
            <Button onClick={onClose} padding="0px 26px" color={"#010B38"} variant="outline">
              الغاء
            </Button>
          </Stack>
        </div>
      </form>
    </div>
  );
};

export default CreateEnterpraiseUser;
