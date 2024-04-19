import { useFormik } from "formik";
import React, { useState } from "react";
import { userCreateValidation } from "../validation/schema";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import "../../../assets/styels/components/forms.scss";
import { useCreateUser } from "../hooks/useCreateUsers";
import { USER_ROLES } from "../../../enums/UserRoles";
import close from "../../../assets/icons-svgs/close.svg";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const CreateUser = ({ onClose }) => {
  const [showpassword, setShowPassword] = useState(false);
  const [removeReadOnly, setRemoveReadOnly] = useState(true);

  const { mutate } = useCreateUser();
  const initialValues = {
    firstNameEn: "",
    lastNameEn: " ",
    lastNameAr: " ",
    firstNameAr: "",
    password: "",
    phoneNumber: "",
    email: "",
    identityId: "",
    role: USER_ROLES.TENANT,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: userCreateValidation,
    onSubmit: (values) => {
      //console.log(values);
      mutate({body:values})
      onClose()
    },
  });
  return (
    <div className="from__card from__card__full">
      <div className="from__card from__card__full">
        <form onSubmit={formik.handleSubmit} className="form">
          <div className="form__header">
            <div className="form__header_text">إضافة مستأجر جديد</div>
            <div className="form__header_close">
              <img src={close} alt="" width="40px" onClick={onClose} />
            </div>
          </div>

          <div className="form__input form__input__flex">
            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label">
                  اسم المستأجر (العربية)
                </Text>
              </FormLabel>
              <Input
                name="firstNameAr"
                size="lg"
                type="text"
                className="form__input__container__input"
                placeholder="اسم المستأجر (العربية)"
                _placeholder={{ color: "#77797E" }}
                value={formik.values.firstNameAr}
                onChange={formik.handleChange}
                isInvalid={
                  formik.touched.firstNameAr && !!formik.errors.firstNameAr
                }
              />

              <div className="form__input__container__warn">
                {formik.touched.firstNameAr && formik.errors.firstNameAr ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {formik.errors.firstNameAr}
                  </Text>
                ) : null}
              </div>
            </FormControl>

            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label">
                  اسم المستأجر (English)
                </Text>
              </FormLabel>
              <Input
                name="firstNameEn"
                size="lg"
                type="text"
                className="form__input__container__input"
                placeholder="اسم المستأجر (English)"
                _placeholder={{ color: "#77797E" }}
                value={formik.values.firstNameEn}
                onChange={formik.handleChange}
                isInvalid={
                  formik.touched.firstNameEn && !!formik.errors.firstNameEn
                }
              />

              <div className="form__input__container__warn">
                {formik.touched.firstNameEn && formik.errors.firstNameEn ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {formik.errors.firstNameEn}
                  </Text>
                ) : null}
              </div>
            </FormControl>
          </div>

          <div className="form__input form__input__flex">
            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label">
                  البريد الإلكتروني
                </Text>
              </FormLabel>
              <Input
                name="email"
                size="lg"
                type="text"
                className="form__input__container__input"
                placeholder="البريد الإلكتروني  "
                _placeholder={{ color: "#77797E" }}
                value={formik.values.email}
                onChange={formik.handleChange}
                isInvalid={formik.touched.email && !!formik.errors.email}
              />

              <div className="form__input__container__warn">
                {formik.touched.email && formik.errors.email ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {formik.errors.email}
                  </Text>
                ) : null}
              </div>
            </FormControl>

            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label">
                  رقم الجوال{" "}
                </Text>
              </FormLabel>
              <Input
                name="phoneNumber"
                size="lg"
                type="text"
                className="form__input__container__input"
                placeholder="رقم الجوال"
                _placeholder={{ color: "#77797E" }}
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                isInvalid={
                  formik.touched.phoneNumber && !!formik.errors.phoneNumber
                }
              />

              <div className="form__input__container__warn">
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {formik.errors.phoneNumber}
                  </Text>
                ) : null}
              </div>
            </FormControl>
          </div>

          <div className="form__input form__input__flex">
            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label">
                  كلمة المرور
                </Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  id="password"
                  pr="4.5rem"
                  type={showpassword ? "text" : "password"}
                  placeholder=" كلمة المرور"
                  name="password"
                  size="lg"
                  readOnly={removeReadOnly}
                  onFocus={() => {
                    setRemoveReadOnly(false);
                  }}
                  className="form__input__container__input"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched.password && !!formik.errors.password
                  }
                />
                <InputLeftElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => {
                      setShowPassword(!showpassword);
                    }}
                  >
                    {showpassword ? (
                      <>
                        <ViewOffIcon></ViewOffIcon>
                      </>
                    ) : (
                      <>
                        <ViewIcon></ViewIcon>
                      </>
                    )}
                  </Button>
                </InputLeftElement>
              </InputGroup>

              <div className="form__input__container__warn">
                {formik.touched.password && formik.errors.password ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {formik.errors.password}
                  </Text>
                ) : null}
              </div>
            </FormControl>
          </div>

          <div className="form__input form__input__flex">
            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label">
                  رقم الهوية الوطنية
                </Text>
              </FormLabel>
              <Input
                name="identityId"
                size="lg"
                type="text"
                className="form__input__container__input"
                placeholder="رقم الهوية الوطنية  "
                _placeholder={{ color: "#77797E" }}
                value={formik.values.identityId}
                onChange={formik.handleChange}
                isInvalid={
                  formik.touched.identityId && !!formik.errors.identityId
                }
              />

              <div className="form__input__container__warn">
                {formik.touched.identityId && formik.errors.identityId ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {formik.errors.identityId}
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
              <Button
                onClick={onClose}
                padding="0px 26px"
                color={"#010B38"}
                variant="outline"
              >
                الغاء
              </Button>
            </Stack>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
