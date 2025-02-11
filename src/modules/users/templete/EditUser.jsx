import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ownerEditValidation, userEditValidation } from "../validation/schema";
import { USER_ROLES } from "../../../enums/UserRoles";
import close from "../../../assets/icons-svgs/close.svg";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useGetUser from "../hooks/useGetUser";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useTranslation } from "react-i18next";
import { useDynamicColors } from "../../../hooks/useDynamicColors";

const EditUser = ({ onClose, id, userRule }) => {
  const { t } = useTranslation();
  const { primary, secondry } = useDynamicColors();

  const [showpassword, setShowPassword] = useState(false);

  const {
    userData: usersData,
    userisLoading: userDataLodaing,
    userRefetch: userDataReftech,
  } = useGetUser(id);

  const { mutate, isLoading, isSuccess } = useUpdateUser();

  useEffect(() => {
    userDataReftech();
  }, []);

  const initialValues = {
    firstNameEn: usersData?.firstNameEn || " ",
    lastNameEn: " ",
    lastNameAr: " ",
    firstNameAr: usersData?.firstNameAr || " ",
    password: "0000000000",
    phoneNumber: usersData?.phoneNumber || " ",
    email: usersData?.email || " ",
    identityId: usersData?.identityId || " ",
    contractNumber: usersData?.contractNumber || " ",
    role: userRule,
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema:
      userRule == USER_ROLES.TENANT ? userEditValidation : ownerEditValidation,
    onSubmit: (values) => {
      values.phoneNumber = values.phoneNumber.toString()
      let sentData = {
        id: id,
        body: {
          firstNameEn: values.firstNameEn,
          lastNameEn: " ",
          firstNameAr: values.firstNameAr,
          lastNameAr: " ",
          identityId:values.identityId,
          password:values.password,
          phoneNumber: values.phoneNumber,
          email: values.email,
        },
      };
      mutate(sentData);
    },
  });
  useEffect(() => {
    if (isSuccess && !isLoading) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <>
      <div className="from__card from__card__full">
        <div className="from__card from__card__full">
          {usersData && !userDataLodaing ? (
            <>
               
              <form onSubmit={formik.handleSubmit} className="form">
                <div className="form__header">
                  <div className="form__header_text fo_primary">
                    {userRule == USER_ROLES.OWNER
                      ? t("users.create.title_owner_edit")
                      : t("users.create.title_edit")}
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
                        {
                    userRule == USER_ROLES.TENANT
                      ? t("users.create.name_ar")
                      : t("users.create.name_ar_owner")
                  }
                        </Text>
                      </FormLabel>
                      <Input
                        name="firstNameAr"
                        size="lg"
                        type="text"
                        className="form__input__container__input"
                        placeholder={
                          userRule == USER_ROLES.OWNER
                            ? t("users.create.name_ar")
                            : t("users.create.name_ar_owner")
                        }
                        _placeholder={{ color: "#77797E" }}
                        value={formik.values.firstNameAr}
                        onChange={formik.handleChange}
                        isInvalid={
                          formik.touched.firstNameAr &&
                          !!formik.errors.firstNameAr
                        }
                      />

                      <div className="form__input__container__warn">
                        {formik.touched.firstNameAr &&
                        formik.errors.firstNameAr ? (
                          <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                            {t(formik.errors.firstNameAr)}
                          </Text>
                        ) : null}
                      </div>
                    </FormControl>

                    <FormControl className="form__input__container">
                      <FormLabel>
                        <Text className="form__input__container__label fo_primary">
                          {userRule == USER_ROLES.OWNER
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
                          userRule == USER_ROLES.TENANT
                            ? t("users.create.name_en")
                            : t("users.create.name_en_owner")
                        }
                        _placeholder={{ color: "#77797E" }}
                        value={formik.values.firstNameEn}
                        onChange={formik.handleChange}
                        isInvalid={
                          formik.touched.firstNameEn &&
                          !!formik.errors.firstNameEn
                        }
                      />

                      <div className="form__input__container__warn">
                        {formik.touched.firstNameEn &&
                        formik.errors.firstNameEn ? (
                          <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                            {t(formik.errors.firstNameEn)}
                          </Text>
                        ) : null}
                      </div>
                    </FormControl>
                  </div>

                  <div className="form__input form__input__flex">
                    <FormControl className="form__input__container ">
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
                        isInvalid={
                          formik.touched.email && !!formik.errors.email
                        }
                      />

                      <div className="form__input__container__warn">
                        {formik.touched.email && formik.errors.email ? (
                          <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                            {t(formik.errors.email)}
                          </Text>
                        ) : null}
                      </div>
                    </FormControl>

                    <FormControl className="form__input__container ">
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
                          formik.touched.phoneNumber &&
                          !!formik.errors.phoneNumber
                        }
                      />

                      <div className="form__input__container__warn">
                        {formik.touched.phoneNumber &&
                        formik.errors.phoneNumber ? (
                          <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                            {t(formik.errors.phoneNumber)}
                          </Text>
                        ) : null}
                      </div>
                    </FormControl>
                  </div>

                  <div className="form__input form__input__flex">
                    <FormControl className="form__input__container ">
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
                        <InputRightElement width="4.5rem" height={'100%'}>
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
                          formik.touched.identityId &&
                          !!formik.errors.identityId
                        }
                      />

                      <div className="form__input__container__warn">
                        {formik.touched.identityId &&
                        formik.errors.identityId ? (
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
                            placeholder={t("general.national_id")}
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
                              <Text
                                color="#EE2E2E"
                                fontSize="sm"
                                className="mt-2"
                              >
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
                      {t("general.edit")}
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
            </>
          ) : (
            <>
              <div className="flex-center form-spinner">
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EditUser;
