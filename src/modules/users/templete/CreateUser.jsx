import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  ownerCreateValidation,
  userCreateValidation,
} from "../validation/schema";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import "../../../assets/styels/components/forms.scss";
import { useCreateUser } from "../hooks/useCreateUsers";
import { USER_ROLES } from "../../../enums/UserRoles";
import close from "../../../assets/icons-svgs/close.svg";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { useDynamicColors } from "../../../hooks/useDynamicColors";

const CreateUser = ({ onClose, userRule }) => {
  const { t } = useTranslation();
  const { primary, secondry } = useDynamicColors();

  const [showpassword, setShowPassword] = useState(false);
  const [removeReadOnly, setRemoveReadOnly] = useState(true);

  const { mutate, isLoading, isSuccess } = useCreateUser();
  const initialValues = {
    firstNameEn: "",
    lastNameEn: " ",
    lastNameAr: " ",
    firstNameAr: "",
    password: "",
    phoneNumber: "",
    email: "",
    identityId: "",
    contractNumber: "",
    role: userRule,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema:
      userRule == USER_ROLES.TENANT
        ? userCreateValidation
        : ownerCreateValidation,
    onSubmit: (values) => {
      let data;
      if (userRule == USER_ROLES.OWNER) {
        data = values;
      } else {
        delete values.contractNumber;
        data = values;
      }
      mutate({ body: data });
    },
  });
  useEffect(() => {
    if (isSuccess && !isLoading) {
      onClose();
    }
  }, [isSuccess]);
  return (
    <div className="from__card from__card__full">
      <div className="from__card from__card__full">
        <form onSubmit={formik.handleSubmit} className="form">
          <div className="form__header">
            <div className="form__header_text fo_primary">
              {userRule == USER_ROLES.OWNER
                ? t("users.create.title_owner")
                : t("users.create.title")}
            </div>
            <div className="form__header_close">
              <img src={close} alt="" width="40px" onClick={onClose} />
            </div>
          </div>

          <div className="form_scroll">
            <div className="form__input form__input__flex">
              <FormControl className="form__input__container">
                <FormLabel>
                  <Text className="form__input__container__label fo_primary">
                    {userRule == USER_ROLES.OWNER
                      ? t("users.create.name_ar")
                      : t("users.create.name_ar_owner")}
                  </Text>
                </FormLabel>
                <Input
                  name="firstNameAr"
                  size="lg"
                  type="text"
                  className="form__input__container__input"
                  placeholder={
                    userRule == USER_ROLES.TENANT
                      ? t("users.create.name_ar")
                      : t("users.create.name_ar_owner")
                  }
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
                      {t(formik.errors.firstNameAr)}
                    </Text>
                  ) : null}
                </div>
              </FormControl>

              <FormControl className="form__input__container">
                <FormLabel>
                  <Text className="form__input__container__label fo_primary">
                    {userRule == USER_ROLES.TENANT
                      ? t("users.create.name_en")
                      : t("users.create.name_en_owner")}
                  </Text>
                </FormLabel>
                <Input
                  name="firstNameEn"
                  size="lg"
                  type="text"
                  className="form__input__container__input"
                  placeholder={
                    userRule == USER_ROLES.OWNER
                      ? t("users.create.name_en")
                      : t("users.create.name_en_owner")
                  }
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
                      {t(formik.errors.firstNameEn)}
                    </Text>
                  ) : null}
                </div>
              </FormControl>
            </div>

            <div className="form__input form__input__flex">
              <FormControl className="form__input__container">
                <FormLabel>
                  <Text className="form__input__container__label fo_primary">
                    {t("general.email")}
                  </Text>
                </FormLabel>
                <Input
                  name="email"
                  size="lg"
                  type="text"
                  className="form__input__container__input"
                  placeholder={t("general.email")}
                  _placeholder={{ color: "#77797E" }}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  isInvalid={formik.touched.email && !!formik.errors.email}
                />

                <div className="form__input__container__warn">
                  {formik.touched.email && formik.errors.email ? (
                    <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                      {t(formik.errors.email)}
                    </Text>
                  ) : null}
                </div>
              </FormControl>

              <FormControl className="form__input__container">
                <FormLabel>
                  <Text className="form__input__container__label fo_primary">
                    {t("general.phone")}
                  </Text>
                </FormLabel>
                <Input
                  name="phoneNumber"
                  size="lg"
                  type="text"
                  className="form__input__container__input"
                  placeholder={t("general.phone")}
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
                      {t(formik.errors.phoneNumber)}
                    </Text>
                  ) : null}
                </div>
              </FormControl>
            </div>

            <div className="form__input form__input__flex">
              <FormControl className="form__input__container">
                <FormLabel>
                  <Text className="form__input__container__label fo_primary">
                    {t("general.password")}
                  </Text>
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    id="password"
                    pr="4.5rem"
                    type={showpassword ? "text" : "password"}
                    placeholder={t("general.password")}
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
                  <InputRightElement height="56px" width="4.5rem">
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
                  </InputRightElement>
                </InputGroup>

                <div className="form__input__container__warn">
                  {formik.touched.password && formik.errors.password ? (
                    <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                      {t(formik.errors.password)}
                    </Text>
                  ) : null}
                </div>
              </FormControl>
            </div>

            <div className="form__input form__input__flex">
              <FormControl className="form__input__container">
                <FormLabel>
                  <Text className="form__input__container__label fo_primary">
                    {t("general.national_id")}
                  </Text>
                </FormLabel>
                <Input
                  name="identityId"
                  size="lg"
                  type="text"
                  className="form__input__container__input"
                  placeholder={t("general.national_id")}
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
                      {t(formik.errors.identityId)}
                    </Text>
                  ) : null}
                </div>
              </FormControl>
            </div>

            <div className="form__input form__input__flex">
              {userRule == USER_ROLES.OWNER ? (
                <>
                   
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label fo_primary">
                        {t("general.contractNumber")}
                      </Text>
                    </FormLabel>
                    <Input
                      name="contractNumber"
                      size="lg"
                      type="text"
                      className="form__input__container__input"
                      placeholder={t("general.contractNumber")}
                      _placeholder={{ color: "#77797E" }}
                      value={formik.values.contractNumber}
                      onChange={formik.handleChange}
                      isInvalid={
                        formik.touched.contractNumber &&
                        !!formik.errors.contractNumber
                      }
                    />

                    <div className="form__input__container__warn">
                      {formik.touched.contractNumber &&
                      formik.errors.contractNumber ? (
                        <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                          {t(formik.errors.contractNumber)}
                        </Text>
                      ) : null}
                    </div>
                  </FormControl>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="form__btn__container">
            <Stack direction="row" width="100%" justify="space-between">
              <Button
                padding="0px 49px"
                variant="solid"
                color={secondry}
                bg={primary}
                type="submit"
                isLoading={isLoading}
              >
                {t("general.add")}
              </Button>
              <Button
                onClick={onClose}
                padding="0px 26px"
                color={"#010B38"}
                variant="outline"
              >
                {t("general.cancel")}
              </Button>
            </Stack>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
