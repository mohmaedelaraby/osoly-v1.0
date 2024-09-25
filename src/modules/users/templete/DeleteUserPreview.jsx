import { useFormik } from "formik";
import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import "../../../assets/styels/components/forms.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../components/shared/PageHeader";
import { useDynamicColors } from "../../../hooks/useDynamicColors";
import { useDeleteUser } from "../hooks/useDeleteUser";
import useUsers from "../hooks/useUsers";
import { DeleteUserPreviewValidation } from "../validation/schema";

const DeleteUserPreview = () => {
  const { t } = useTranslation();
  const { primary, secondry } = useDynamicColors();
  const [userNameError, setUserNameError] = useState("");
  const navigate = useNavigate();
  const { mutate, isSuccess, isDeleteLoading } = useDeleteUser();

  const { usersData, usersRefetch } = useUsers({
    pageNo: 1,
    limit: 1000,
    count: 12,
  });
  useEffect(() => {
    usersRefetch();
  }, []);

  const initialValues = {
    userName: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: DeleteUserPreviewValidation,

    onSubmit: (values) => {
      let user = usersData?.users?.find(
        (i) =>
          i.firstNameEn == values.userName || i.firstNameAr == values.userName
      );
      if (user) {
        mutate(user?.id);
      } else {
        setUserNameError("errors.usernamerror");
      }

      //mutate({ body: data });
    },
  });

  useEffect(() => {
    if (isSuccess) navigate("/home");
  }, [isSuccess]);

  useEffect(() => {
    setUserNameError("");
  }, [formik.values.userName]);

  return (
    <div className="page">
      <div className="page_container">
        <div className="page_container_header">
          <PageHeader title={t("sidebar.users")}></PageHeader>
        </div>

        <div className="page_container_table">
          <Card>
            <div className="from__card from__card__full">
              <div className="from__card from__card__full">
                <form onSubmit={formik.handleSubmit} className="form">
                  <div className="form__header">
                    <div className="form__header_text fo_primary">
                      {t("deletePreview.username")}
                    </div>
                  </div>

                  <div className="form_scroll">
                    <div className="form__input form__input__flex">
                      <FormControl className="form__input__container">
                        <FormLabel>
                          <Text className="form__input__container__label fo_primary">
                            {t("deletePreview.textlabel")}
                          </Text>
                        </FormLabel>
                        <Input
                          name="userName"
                          size="lg"
                          type="text"
                          className="form__input__container__input"
                          placeholder={t("deletePreview.textlabel")}
                          _placeholder={{ color: "#77797E" }}
                          value={formik.values.userName}
                          onChange={formik.handleChange}
                          isInvalid={
                            formik.touched.userName && !!formik.errors.userName
                          }
                        />

                        <div className="form__input__container__warn">
                          {formik.touched.userName && formik.errors.userName ? (
                            <Text
                              color="#EE2E2E"
                              fontSize="sm"
                              className="mt-2"
                            >
                              {t(formik.errors.userName)}
                            </Text>
                          ) : null}
                        </div>

                        <div className="form__input__container__warn">
                          {userNameError ? (
                            <Text
                              color="#EE2E2E"
                              fontSize="sm"
                              className="mt-2"
                            >
                              {t(userNameError)}
                            </Text>
                          ) : null}
                        </div>
                      </FormControl>
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
                        isLoading={isDeleteLoading}
                      >
                        {t("general.delete")}
                      </Button>
                      <Button
                        onClick={() => {
                          navigate("/home");
                        }}
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
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserPreview;
