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
import React, { useState } from "react";
import { useEnterprisesUpdateUser } from "../hooks/useUpdateEnterprisesUser";
import { userEnterpraiseValidationEdit } from "../validation/schema";
import close from "../../../assets/icons-svgs/close.svg";
import goldCrown from "../../../assets/icons-svgs/goldCrown.svg";
import silverCrown from "../../../assets/icons-svgs/silverCrown.svg";
import blueCrown from "../../../assets/icons-svgs/blueCrown.svg";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const EditEnterpraiseUser = ({ onClose, plans, item }) => {
  const [removeReadOnly, setRemoveReadOnly] = useState(true);

  const initialValues = {
    username: item.username,
  };

  const [showpassword, setShowPassword] = useState(false);
  const [plan, setPlan] = useState(item?.plan?.id);
  const { mutate } = useEnterprisesUpdateUser();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: userEnterpraiseValidationEdit,
    onSubmit: (values) => {
      let data = { id: item.id, body: { ...values } };
      mutate(data);
      onClose();
    },
  });

  return (
    <div className="from__card from__card__full">
      <form
        onSubmit={formik.handleSubmit}
        className="form"
        autoComplete="false"
      >
        <div className="form__header">
          <div className="form__header_text">إضافة مؤسس جديد</div>
          <div className="form__header_close">
            <img src={close} alt="" width="40px" onClick={onClose} />
          </div>
        </div>

        <div className="form__input form__input__flex">
          <FormControl className="form__input__container">
            <FormLabel>
              <Text className="form__input__container__label">اسم المؤسس</Text>
            </FormLabel>
            <Input
              id="enterpraiseName"
              name="username"
              size="lg"
              type="text"
              className="form__input__container__input"
              placeholder="اسم المؤسس "
              value={formik.values.username}
              onChange={formik.handleChange}
              isInvalid={formik.touched.username && !!formik.errors.username}
            />

            <div className="form__input__container__warn">
              {formik.touched.username && formik.errors.username ? (
                <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                  {formik.errors.username}
                </Text>
              ) : null}
            </div>
          </FormControl>
        </div>

        <div className="form__input form__input__flex">
          <FormControl className="form__input__container">
            <FormLabel>
              <Text className="form__input__container__label">كلمة المرور</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                id="enterpraisePassword"
                pr="4.5rem"
                disabled
                type={showpassword ? "text" : "password"}
                placeholder="**********"
                size="lg"
                readOnly={removeReadOnly}
                onFocus={() => {
                  setRemoveReadOnly(false);
                }}
                className="form__input__container__input"
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
          </FormControl>
        </div>

        <div className="from__card_plans disabled">
          <div className="from__card_plans_title">حدد الباقة</div>
          <div className="from__card_plans_cards">
            {plans ? (
              <>
                <div
                  key={plans[0]?.id}
                  onClick={() => {
                    setPlan(plans[0]?.id);
                  }}
                  className="from__card_plans_cards_planCard not_allow"
                  style={{
                    background: `${plan == plans[0]?.id ? "#EFF9FF" : ""}`,
                  }}
                >
                  <div className="from__card_plans_cards_planCard_contianer">
                    <div
                      className="from__card_plans_cards_planCard_contianer_img"
                      style={{ backgroundColor: "#FEF9E2" }}
                    >
                      <img
                        src={goldCrown}
                        alt="gold"
                        width={"32px"}
                        height={"32px"}
                      />
                    </div>
                    <div className="from__card_plans_cards_planCard_contianer_name">
                      {plans[0]?.name}
                    </div>
                    <div className="from__card_plans_cards_planCard_contianer_desc">
                      {plans[0]?.desc
                        ? plans[0]?.desc
                        : "  هذه الخطه تسمحلك ب اضافه" +
                          plans[0]?.numberOfUsers +
                          " مستخدم في خلال " +
                          plans[0]?.duration +
                          " اشهر"}
                    </div>
                  </div>
                </div>

                <div
                  key={plans[1]?.id}
                  onClick={() => {
                    setPlan(plans[1]?.id);
                  }}
                  className="from__card_plans_cards_planCard not_allow"
                  style={{
                    background: `${plan == plans[1]?.id ? "#EFF9FF" : ""}`,
                  }}
                >
                  <div className="from__card_plans_cards_planCard_contianer">
                    <div
                      className="from__card_plans_cards_planCard_contianer_img"
                      style={{ backgroundColor: "#EDEEF2" }}
                    >
                      <img
                        src={silverCrown}
                        alt="gold"
                        width={"32px"}
                        height={"32px"}
                      />
                    </div>
                    <div className="from__card_plans_cards_planCard_contianer_name">
                      {plans[1]?.name}
                    </div>
                    <div className="from__card_plans_cards_planCard_contianer_desc">
                      {plans[1]?.desc
                        ? plans[1]?.desc
                        : "  هذه الخطه تسمحلك ب اضافه" +
                          plans[1]?.numberOfUsers +
                          " مستخدم في خلال " +
                          plans[1]?.duration +
                          " اشهر"}
                    </div>
                  </div>
                </div>

                <div
                  key={plans[2]?.id}
                  onClick={() => {
                    setPlan(plans[2]?.id);
                  }}
                  className="from__card_plans_cards_planCard not_allow"
                  style={{
                    background: `${plan == plans[2]?.id ? "#EFF9FF" : ""}`,
                  }}
                >
                  <div className="from__card_plans_cards_planCard_contianer">
                    <div
                      className="from__card_plans_cards_planCard_contianer_img"
                      style={{ backgroundColor: "#EFF9FF" }}
                    >
                      <img
                        src={blueCrown}
                        alt="gold"
                        width={"32px"}
                        height={"32px"}
                      />
                    </div>
                    <div className="from__card_plans_cards_planCard_contianer_name">
                      {plans[2]?.name}
                    </div>
                    <div className="from__card_plans_cards_planCard_contianer_desc">
                      {plans[2]?.desc
                        ? plans[2]?.desc
                        : "  هذه الخطه تسمحلك ب اضافه" +
                          plans[2]?.numberOfUsers +
                          " مستخدم في خلال " +
                          plans[2]?.duration +
                          " اشهر"}
                    </div>
                  </div>
                </div>
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
  );
};

export default EditEnterpraiseUser;
