import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { propertyCreateValidation } from "../validation/schema";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import "../../../assets/styels/components/forms.scss";
import { useCreatePropertey } from "../hooks/useCreatePropertey";
import useUsers from "../../users/hooks/useUsers";
import { USER_ROLES } from "../../../enums/UserRoles";
import close from "../../../assets/icons-svgs/close.svg";
import bell from "../../../assets/images/bell.png";
import CreateUnit from "../../units/templete/CreateUnit";
import { useTranslation } from "react-i18next";
import { useDynamicColors } from "../../../hooks/useDynamicColors";
import {
  Select as SelectMultiOption,
  CreatableSelect,
  AsyncSelect,
} from "chakra-react-select";

const CreateProperty = ({ onClose, propOwenerId }) => {
  const { t } = useTranslation();
  const { primary, secondry } = useDynamicColors();

  const [selectedOwnerId, setSelectedOwnerId] = useState(0);
  const [selectedOwnerIdArr, setSelectedOwnerIdArr] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { usersData, usersRefetch } = useUsers({
    pageNo: 1,
    limit: 1000,
    count: 12,
  });

  const [multiOptions, setMultiOption] = useState([]);

  useEffect(() => {
    const list = usersData?.users
      .filter((s) => s.role == USER_ROLES.OWNER)
      .map((i, index) => ({
        label: i.firstNameAr,
        value: i.id,
      }));

    setMultiOption(list);
  }, [usersData, setMultiOption]);

  useEffect(() => {
    usersRefetch();
  }, []);
  const { mutate, isLoading, isSuccess } = useCreatePropertey();

  const initialValues = {
    name: "",
    address: "",
    unitsCount: 0,
    instrumentNumber: "",
    postalCode: "",
    blockNumber: " ",
    street: " ",
    district: " ",
    city: " ",
    ownerId: " ",
    image: " ",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: propertyCreateValidation,
    onSubmit: (values) => {
      formik.values.ownerId = selectedOwnerIdArr;
      const formData = new FormData();
      if (selectedImage) {
        formData.append("image", selectedImage, selectedImage.name);
      }
      formData.append("name", formik.values.name);
      formData.append("address", formik.values.address);
      formData.append("blockNumber", formik.values.blockNumber);
      formData.append("city", formik.values.city);
      formData.append("district", formik.values.district);
      formData.append("instrumentNumber", formik.values.instrumentNumber);
      formData.append("ownersIds", selectedOwnerIdArr);
      formData.append("postalCode", formik.values.postalCode);
      formData.append("street", formik.values.street);
      formData.append("unitsCount", formik.values.unitsCount);
      mutate({ body: formData });
    },
  });
  useEffect(() => {
    if (isSuccess && !isLoading) {
      onClose();
    }
  }, [isSuccess]);

  const {
    isOpen: isOpenUnitModal,
    onOpen: onOpenUnitModal,
    onClose: onCloseUnitModal,
  } = useDisclosure();

  const openUnitPopup = () => {
    onOpenUnitModal();
  };

  return (
    <>
      <div className="from__card from__card__full">
        <div className="from__card from__card__full">
          <form onSubmit={formik.handleSubmit} className="form">
            <div className="form__header">
              <div className="form__header_text fo_primary">
                {t("propreties.create.title")}
              </div>
              <div className="form__header_close">
                <img src={close} alt="" width="40px" onClick={onClose} />
              </div>
            </div>

            <div className="form_scroll">
              <div className="form__input form__input__flex">
                {!selectedImage ? (
                  <div className="form__input__flex_fileUpload">
                    <img src={bell} alt="" width={"66px"} />
                    <p className="form__input__flex_fileUpload_text">
                      {t("general.add_image")}
                    </p>
                    <p className="form__input__flex_fileUpload_desc">
                      {t("general.image_disclaimer")}
                    </p>
                    <Input
                      className="form__input__flex_fileUpload_input"
                      type="file"
                      name="image"
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => {
                        setSelectedImage(e.target.files[0]);
                      }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      padding: `${selectedImage ? "0px" : ""}`,
                      borderRadius: "12px",
                    }}
                    className="form__input__flex_fileUpload"
                  >
                    <div className="form__input__flex_fileUpload_image">
                      <img
                        alt="not found"
                        width={"auto"}
                        height={"285px"}
                        src={URL.createObjectURL(selectedImage)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="form__input form__input__flex">
                <FormControl className="form__input__container">
                  <FormLabel>
                    <Text className="form__input__container__label fo_primary">
                      {t("general.property_name")}
                    </Text>
                  </FormLabel>
                  <Input
                    name="name"
                    size="lg"
                    type="text"
                    className="form__input__container__input"
                    placeholder={t("general.property_name")}
                    _placeholder={{ color: "#77797E" }}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.name && !!formik.errors.name}
                  />

                  <div className="form__input__container__warn">
                    {formik.touched.name && formik.errors.name ? (
                      <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                        {t(formik.errors.name)}
                      </Text>
                    ) : null}
                  </div>
                </FormControl>
              </div>

              <div className="form__input form__input__flex">
                <FormControl className="form__input__container">
                  <FormLabel>
                    <Text className="form__input__container__label fo_primary">
                      {t("general.address")}
                    </Text>
                  </FormLabel>
                  <Input
                    name="address"
                    size="lg"
                    type="text"
                    className="form__input__container__input"
                    placeholder={t("general.address")}
                    _placeholder={{ color: "#77797E" }}
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.address && !!formik.errors.address
                    }
                  />

                  <div className="form__input__container__warn">
                    {formik.touched.address && formik.errors.address ? (
                      <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                        {t(formik.errors.address)}
                      </Text>
                    ) : null}
                  </div>
                </FormControl>
              </div>

              {/*  <div className="form__input form__input__flex">
              <FormControl className="form__input__container">
                <FormLabel>
                  <Text className="form__input__container__label fo_primary">
                    مساحة العقار
                  </Text>
                </FormLabel>
                <InputGroup>
                  <Input
                    name="unitsCount"
                    size="lg"
                    type="text"
                    className="form__input__container__input"
                    placeholder="مساحة العقار   "
                    _placeholder={{ color: "#77797E" }}
                    value={formik.values.unitsCount}
                    padding={"8px"}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.unitsCount && !!formik.errors.unitsCount
                    }
                  />
                  <InputRightElement
                    color={"#77797E"}
                    width={"100px"}
                    height="100%"
                    justifyContent="center"
                    borderRadius={"12px"}
                  >
                    متر مربع
                  </InputRightElement>
                </InputGroup>

                <div className="form__input__container__warn">
                  {formik.touched.unitsCount && formik.errors.unitsCount ? (
                    <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                      {formik.errors.unitsCount}
                    </Text>
                  ) : null}
                </div>
              </FormControl>
            </div> */}

              <div className="form__input form__input__flex mb-24">
                <FormControl className="">
                  <FormLabel>
                    <Text className="form__input__container__label fo_primary">
                      {t("general.property_owner")}
                    </Text>
                  </FormLabel>
                  <SelectMultiOption
                    isMulti
                    name="owners"
                    className="form__input__container__multiSelect"
                    onChange={(e) => {
                      setSelectedOwnerIdArr(e.map((i) => i.value));
                    }}
                    size={'lg'}
                    options={multiOptions}
                    placeholder={t("general.property_owner")}
                    closeMenuOnSelect={false}
                  />
                </FormControl>
              </div>

              <div className="form__input form__input__flex">
                <FormControl className="form__input__container">
                  <FormLabel>
                    <Text className="form__input__container__label fo_primary">
                      {t("general.postal_code")}
                    </Text>
                  </FormLabel>
                  <Input
                    name="postalCode"
                    size="lg"
                    type="number"
                    className="form__input__container__input"
                    placeholder={t("general.postal_code")}
                    _placeholder={{ color: "#77797E" }}
                    value={formik.values.postalCode}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.postalCode && !!formik.errors.postalCode
                    }
                  />

                  <div className="form__input__container__warn">
                    {formik.touched.postalCode && formik.errors.postalCode ? (
                      <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                        {t(formik.errors.postalCode)}
                      </Text>
                    ) : null}
                  </div>
                </FormControl>

                <FormControl className="form__input__container">
                  <FormLabel>
                    <Text className="form__input__container__label fo_primary">
                      {t("general.sk_number")}
                    </Text>
                  </FormLabel>
                  <Input
                    name="instrumentNumber"
                    size="lg"
                    type="text"
                    className="form__input__container__input"
                    placeholder={t("general.sk_number")}
                    _placeholder={{ color: "#77797E" }}
                    value={formik.values.instrumentNumber}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.instrumentNumber &&
                      !!formik.errors.instrumentNumber
                    }
                  />

                  <div className="form__input__container__warn">
                    {formik.touched.instrumentNumber &&
                    formik.errors.instrumentNumber ? (
                      <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                        {t(formik.errors.instrumentNumber)}
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

      <Modal isOpen={isOpenUnitModal} onClose={onCloseUnitModal}>
        <ModalOverlay />
        <ModalContent maxWidth="700px">
          <ModalBody>
            <CreateUnit onClose={onCloseUnitModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProperty;
