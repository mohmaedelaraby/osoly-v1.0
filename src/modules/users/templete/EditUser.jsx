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
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { userEditValidation } from "../validation/schema";
import { USER_ROLES } from "../../../enums/UserRoles";
import close from "../../../assets/icons-svgs/close.svg";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useGetUser from "../hooks/useGetUser";
import { useUpdateUser } from "../hooks/useUpdateUser";

const EditUser = ({ onClose, id, userRule }) => {
  const [showpassword, setShowPassword] = useState(false);

  const {
    userData: usersData,
    userisLoading: userDataLodaing,
    userRefetch: userDataReftech,
  } = useGetUser(id);

  const { mutate } = useUpdateUser();

  useEffect(() => {
    userDataReftech();
  }, []);

  const initialValues = {
    firstNameEn: usersData?.firstNameEn,
    lastNameEn: " ",
    lastNameAr: " ",
    firstNameAr: usersData?.firstNameAr,
    password: "0000000000",
    phoneNumber: usersData?.phoneNumber,
    email: usersData?.email,
    identityId: usersData?.identityId,
    role: userRule,
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: userEditValidation,
    onSubmit: (values) => {
      let sentData = {
        id: id,
        body: {
          firstNameEn: values.firstNameEn,
          lastNameEn: " ",
          firstNameAr: values.firstNameAr,
          lastNameAr: " ",
        },
      };
      mutate(sentData);
      onClose();
    },
  });

  return (
    <>
      <div className="from__card from__card__full">
        <div className="from__card from__card__full">
          <form onSubmit={formik.handleSubmit} className="form">
            <div className="form__header">
              <div className="form__header_text">
              {userRule == USER_ROLES.OWNER ? ('تعديل مالك جديد'):('تعديل مستاجر جديد')} 
              </div>
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
              <FormControl className="form__input__container disabled">
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

              <FormControl className="form__input__container disabled">
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
              <FormControl className="form__input__container disabled">
                <FormLabel>
                  <Text className="form__input__container__label">
                    كلمة المرور
                  </Text>
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    id="password"
                    pr="4.5rem"
                    disabled
                    type="password"
                    placeholder=" 00000000000 "
                    name="password"
                    size="lg"
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
              <FormControl className="form__input__container disabled">
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
    </>
  );
};

export default EditUser;
