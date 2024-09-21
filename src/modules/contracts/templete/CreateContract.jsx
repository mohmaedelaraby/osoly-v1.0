import { useFormik } from "formik";
import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import "../../../assets/styels/components/forms.scss";
import close from "../../../assets/icons-svgs/close.svg";
import { useTranslation } from "react-i18next";
import { useDynamicColors } from "../../../hooks/useDynamicColors";
import { createContractValidation } from "../validation/schema";

const CreateContract = ({ onClose }) => {
  const { t } = useTranslation();
  const { primary, secondry } = useDynamicColors();

 // const [removeReadOnly, setRemoveReadOnly] = useState(true);

  const initialValues = {
    contractLimit: 0,
      ownerName: "",
      ownerNationalId: "",
      renter: "",
      contractsNumber: "",
      commetion: "",
      nationalty: "",
  };


  const [elecChoice, setElecChoice] = useState(false);
  const [kitchenChoice, setKitchenChoice] = useState(false);
  /* const [showpassword, setShowPassword] = useState(false);
  const [plan, setPlan] = useState(plans[0]?.id);
  const { mutate, isLoading, isSuccess } = useEnterPraisesCreateUser(); */

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createContractValidation,
    onSubmit: (values) => {
      //let body = { planId: plan, ...values };
      //mutate(body);
    },
  });

  /* useEffect(() => {
    if (isSuccess && !isLoading) {
      onClose();
    }
  }, [isSuccess]); */

  return (
    <div className="from__card from__card__full">
      <form
        onSubmit={formik.handleSubmit}
        className="form"
        autoComplete="false"
      >
        <div className="form__header">
          <div className="form__header_text fo_primary fo_primary">
            {t("contracts.page.add_contract")}
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
                  {t("contracts.form.owner_name")}
                </Text>
              </FormLabel>
              <Input
                id="owner_name"
                name="owner_name"
                size="lg"
                type="text"
                className="form__input__container__input"
                placeholder={t("contracts.form.owner_name")}
                value={formik.values.ownerName}
                onChange={formik.handleChange}
                isInvalid={formik.touched.ownerName && !!formik.errors.ownerName}
              />

              <div className="form__input__container__warn">
                {formik.touched.ownerName && formik.errors.ownerName ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {t(formik.errors.ownerName)}
                  </Text>
                ) : null}
              </div>
            </FormControl>

            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label fo_primary">
                  {t("contracts.form.owner_id")}
                </Text>
              </FormLabel>
              <Input
                id="owner_id"
                name="owner_id"
                size="lg"
                type="text"
                className="form__input__container__input"
                placeholder={t("contracts.form.owner_id")}
                value={formik.values.ownerNationalId}
                onChange={formik.handleChange}
                isInvalid={formik.touched.ownerNationalId && !!formik.errors.ownerNationalId}
              />

              <div className="form__input__container__warn">
                {formik.touched.ownerNationalId && formik.errors.ownerNationalId ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {t(formik.errors.ownerNationalId)}
                  </Text>
                ) : null}
              </div>
            </FormControl>
          </div>

          <div className="form__input form__input__flex">
            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label fo_primary">
                  {t("contracts.form.renter")}
                </Text>
              </FormLabel>
              <Input
                id="renter"
                name="renter"
                size="lg"
                type="text"
                className="form__input__container__input"
                placeholder={t("contracts.form.renter")}
                value={formik.values.renter}
                onChange={formik.handleChange}
                isInvalid={formik.touched.renter && !!formik.errors.renter}
              />

              <div className="form__input__container__warn">
                {formik.touched.renter && formik.errors.renter ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {t(formik.errors.renter)}
                  </Text>
                ) : null}
              </div>
            </FormControl>

            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label fo_primary">
                  {t("contracts.form.contracts_number")}
                </Text>
              </FormLabel>
              <Input
                id="contracts_number"
                name="contracts_number"
                size="lg"
                type="text"
                className="form__input__container__input"
                placeholder={t("contracts.form.contracts_number")}
                value={formik.values.contractsNumber}
                onChange={formik.handleChange}
                isInvalid={formik.touched.contractsNumber && !!formik.errors.contractsNumber}
              />

              <div className="form__input__container__warn">
                {formik.touched.contractsNumber && formik.errors.contractsNumber ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {t(formik.errors.contractsNumber)}
                  </Text>
                ) : null}
              </div>
            </FormControl>
          </div>

          <div className="form__input form__input__flex">
            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label fo_primary">
                  {t("contracts.table.limit")}
                </Text>
              </FormLabel>
              <Input
                id="limit"
                name="limit"
                size="lg"
                type="text"
                className="form__input__container__input"
                placeholder={t("enterprise.create.limit")}
                value={formik.values.contractLimit}
                onChange={formik.handleChange}
                isInvalid={formik.touched.contractLimit && !!formik.errors.contractLimit}
              />

              <div className="form__input__container__warn">
                {formik.touched.contractLimit && formik.errors.contractLimit ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {t(formik.errors.contractLimit)}
                  </Text>
                ) : null}
              </div>
            </FormControl>

            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label fo_primary">
                  {t("contracts.form.commetion")}
                </Text>
              </FormLabel>
              <Input
                id="commetion"
                name="commetion"
                size="lg"
                type="text"
                className="form__input__container__input"
                placeholder={t("contracts.form.commetion")}
                value={formik.values.commetion}
                onChange={formik.handleChange}
                isInvalid={formik.touched.commetion && !!formik.errors.commetion}
              />

              <div className="form__input__container__warn">
                {formik.touched.commetion && formik.errors.commetion ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {t(formik.errors.commetion)}
                  </Text>
                ) : null}
              </div>
            </FormControl>
          </div>

          <div className="form__input form__input__flex">
            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label fo_primary">
                  {t("contracts.table.nationalty")}
                </Text>
              </FormLabel>
              <Input
                id="nationalty"
                name="nationalty"
                size="lg"
                type="text"
                className="form__input__container__input"
                placeholder={t("contracts.table.nationalty")}
                value={formik.values.nationalty}
                onChange={formik.handleChange}
                isInvalid={formik.touched.nationalty && !!formik.errors.nationalty}
              />

              <div className="form__input__container__warn">
                {formik.touched.nationalty && formik.errors.nationalty ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {t(formik.errors.nationalty)}
                  </Text>
                ) : null}
              </div>
            </FormControl>

            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label fo_primary">
                  {t("contracts.form.contract_Duration")}
                </Text>
              </FormLabel>
              <Select
              height={"56px"}
              name="rent_rate"
              onChange={(e) => {
                //setSelectedRentRate(e.target.value);
                setTimeout(() => {}, 0);
              }}
            >
              <option value={0}> {t("general.rent_rate")} </option>
              <option value={"MONTHLY"}> {t("general.monthly")} </option>
              <option value={"YEARLY"}> {t("general.yearly")} </option>
            </Select>
            </FormControl>
          </div>


          <div className="form__input form__input__flex mb-24">
          <FormControl className="form__input__container">
            <Checkbox
              isChecked={kitchenChoice}
              value={kitchenChoice}
              onChange={(e) => {
                setKitchenChoice(!kitchenChoice);
              }}
            >
              <span className="form__input__container__checkbox_txt">
                 
                {t("general.kitchen")}
              </span>
            </Checkbox>
          </FormControl>

          <FormControl value={elecChoice} className="form__input__container">
            <Checkbox
              isChecked={elecChoice}
              value={elecChoice}
              onChange={(e) => {
                setElecChoice(!elecChoice);
              }}
            >
              <span className="form__input__container__checkbox_txt">
                {t("general.elec")}
              </span>
            </Checkbox>
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
             /*  isDisabled={!plan}
              isLoading={isLoading} */
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
  );
};

export default CreateContract;
