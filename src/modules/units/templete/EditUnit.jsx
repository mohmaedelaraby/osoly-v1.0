import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { unitsValidation } from "../validation/schema";
import { useUpdateUnit } from "../hooks/useUpdateUnit";
import useGetUnit from "../hooks/useGetUnit";
import useUsers from "../../users/hooks/useUsers";
import useProperties from "../../propreties/hooks/useAllProperties";
import { USER_ROLES } from "../../../enums/UserRoles";
import close from "../../../assets/icons-svgs/close.svg";
import bell from "../../../assets/images/bell.png";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useDynamicColors } from "../../../hooks/useDynamicColors";
const EditUnit = ({ onClose, id, propOwenerId, propPropertyId }) => {
  const { t } = useTranslation();
  const { primary, secondry } = useDynamicColors();

  const { mutate, isLoading, isSuccess } = useUpdateUnit();

  const { data, refetch } = useGetUnit(id);
  const [selectedOwnerId, setSelectedOwnerId] = useState(propOwenerId);
  const [selectedRenterId, setSelectedRenterId] = useState();
  const [selectedMaintenanceManId, setSelectedMaintenanceManId] = useState();
  const [selectedRentRate, setSelectedRentRate] = useState();
  const [loadedImage, setLoadedImage] = useState(null);

  const [selectedProbertyId, setSelectedPropertyId] = useState(propPropertyId);
  const [loungeChoice, setLoungeChoice] = useState(false);
  const [kitchenChoice, setKitchenChoice] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filterdRenters, setFiltersRenters] = useState();
  const [filterdRentSearch, setFilterdRentSearch] = useState("");

  const { usersData, usersRefetch } = useUsers({
    pageNo: 1,
    limit: 1000,
    count: 12,
  });
  const { PropertiesData, PropertiesRefetch } = useProperties({
    pageNo: 1,
    limit: 1000,
    count: 12,
  });
  useEffect(() => {
    refetch();
    usersRefetch();
    PropertiesRefetch();
    if (usersData) {
      setFiltersRenters(usersData);
    }
  }, [filterdRenters, usersData]);

  useEffect(() => {
    if (data) {
      setSelectedOwnerId(data?.ownerId);
      setSelectedMaintenanceManId(data?.maintenanceMan);
      setSelectedRentRate(data?.rentCollectionRate);
      setSelectedPropertyId(data?.propertyId);
      setSelectedRenterId(data?.tenantId);
      setLoadedImage(data?.image);
      setKitchenChoice(data?.kitchen);
      setLoungeChoice(data?.lounge);
    }
  }, [data]);

  useEffect(() => {}, [kitchenChoice]);
  useEffect(() => {}, [loungeChoice]);

  const initialValues = {
    name: data?.name || " ",
    rent: data?.rent || 0,
    rentCollectionDate: data?.rentCollectionDate || " ",
    electricityAccount: data?.electricityAccount || " ",
    waterAccount: data?.waterAccount || " ",
    address: data?.address || " ",
    space: data?.space || 0,
    rooms: data?.rooms || 0,
    bathrooms: data?.bathrooms || 0,
    conditioners: data?.conditioners || 0,
    ownerId: data?.ownerId || " ",
    tenantId: data?.tenantId || " ",
    propertyId: data?.propertyId || " ",
    image: data?.image || " ",
    maintenanceMan: data?.maintenanceMan || "OWNER",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: unitsValidation,
    onSubmit: (values) => {
      formik.values.ownerId = selectedOwnerId;
      formik.values.propertyId = selectedProbertyId;
      formik.values.maintenanceMan = selectedMaintenanceManId;
      formik.values.tenantId = selectedRenterId;
      const formData = new FormData();

      if (selectedImage) {
        formData.append("image", selectedImage, selectedImage.name);
      } else if (!selectedImage && loadedImage) {
        formData.append("image", loadedImage);
      }

      if (formik.values.name) {
        formData.append("name", formik.values.name);
      }
      if (formik.values.address) {
        formData.append("address", formik.values.address);
      }
      if (formik.values.bathrooms) {
        formData.append("bathrooms", formik.values.bathrooms);
      }
      if (formik.values.conditioners) {
        formData.append("conditioners", formik.values.conditioners);
      }
      if (formik.values.electricityAccount) {
        formData.append("electricityAccount", formik.values.electricityAccount);
      }
      if (formik.values.maintenanceMan) {
        formData.append("maintenanceMan", formik.values.maintenanceMan);
      }
      if (formik.values.ownerId) {
        formData.append("ownerId", formik.values.ownerId);
      }
      if (formik.values.propertyId) {
        formData.append("propertyId", formik.values.propertyId);
      }
      if (formik.values.tenantId) {
        formData.append("tenantId", formik.values.tenantId);
      }
      if (formik.values.rent) {
        formData.append("rent", formik.values.rent);
      }
      if (formik.values.rentCollectionDate) {
        formData.append("rentCollectionDate", formik.values.rentCollectionDate);
      }
      if (formik.values.rooms) {
        formData.append("rooms", formik.values.rooms);
      }
      if (formik.values.space) {
        formData.append("space", formik.values.space);
      }
      if (formik.values.waterAccount) {
        formData.append("waterAccount", formik.values.waterAccount);
      }
      if (kitchenChoice) {
        formData.append("kitchen", kitchenChoice);
      }
      if (loungeChoice) {
        formData.append("lounge", loungeChoice);
      }
      if (selectedRentRate) {
        formData.append("rentCollectionRate", selectedRentRate);
      }
      mutate({ id: id, body: formData });
    },
  });
  useEffect(() => {
    if (isSuccess && !isLoading) {
      onClose();
    }
  }, [isSuccess]);

  useEffect(() => {
    const filterdArr = filterdRenters?.users.filter(
      (i) => i.identityId === filterdRentSearch
    );
    if (filterdArr?.length) {
      setSelectedRenterId(filterdArr[0]?.id);
    } else {
      setSelectedRenterId(data?.tenantId);
    }
  }, [filterdRentSearch]);
  return (
    <>
      <div className="from__card from__card__full">
        {data ? (
          <>
            <form onSubmit={formik.handleSubmit} className="form">
              <div className="form__header">
                <div className="form__header_text fo_primary">
                  {t("units.create.title_edit")}
                </div>
                <div className="form__header_close">
                  <img src={close} alt="" width="40px" onClick={onClose} />
                </div>
              </div>

              <div className="form_scroll">
                <div className="form__input form__input__flex">
                  {!selectedImage && !loadedImage ? (
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
                    <>
                      <div
                        style={{
                          padding: `${
                            selectedImage || loadedImage ? "0px" : ""
                          }`,
                          borderRadius: "12px",
                        }}
                        className="form__input__flex_fileUpload"
                      >
                        <div className="form__input__flex_fileUpload_image">
                          <img
                            alt="not found"
                            width={"auto"}
                            height={"285px"}
                            src={
                              selectedImage
                                ? URL.createObjectURL(selectedImage)
                                : loadedImage
                            }
                          />
                        </div>
                        <div className="form__input__flex_imgUpload_btn">
                          <Button background="transparent" color={secondry}>
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                              >
                                <path
                                  d="M19.4003 7.84376L16.6603 5.10376C16.3027 4.76786 15.8341 4.57512 15.3436 4.56222C14.8532 4.54931 14.3751 4.71713 14.0003 5.03376L5.0003 14.0338C4.67706 14.3597 4.4758 14.787 4.4303 15.2438L4.0003 19.4138C3.98683 19.5602 4.00583 19.7079 4.05596 19.8461C4.10608 19.9844 4.1861 20.1099 4.2903 20.2138C4.38374 20.3064 4.49455 20.3798 4.61639 20.4295C4.73823 20.4793 4.86869 20.5045 5.0003 20.5038H5.0903L9.2603 20.1238C9.71709 20.0783 10.1443 19.877 10.4703 19.5538L19.4703 10.5538C19.8196 10.1847 20.0084 9.69227 19.9953 9.1843C19.9822 8.67633 19.7682 8.19427 19.4003 7.84376ZM9.0803 18.1238L6.0803 18.4038L6.3503 15.4038L12.0003 9.82376L14.7003 12.5238L9.0803 18.1238ZM16.0003 11.1838L13.3203 8.50376L15.2703 6.50376L18.0003 9.23376L16.0003 11.1838Z"
                                  fill="#EFF9FF"
                                />
                              </svg>
                            </span>
                            <Input
                              className="form__input__flex_imgUpload_file"
                              type="file"
                              name="image"
                              accept=".png, .jpg, .jpeg"
                              onChange={(e) => {
                                setSelectedImage(e.target.files[0]);
                              }}
                            />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="form__input form__input__flex">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label fo_primary">
                        {t("general.unit_name")}
                      </Text>
                    </FormLabel>
                    <Input
                      name="name"
                      size="lg"
                      type="text"
                      className="form__input__container__input"
                      placeholder={t("general.unit_name")}
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
                        {t("general.rent_cost")}
                      </Text>
                    </FormLabel>
                    <Input
                      name="rent"
                      size="lg"
                      type="text"
                      className="form__input__container__input"
                      placeholder={t("general.rent_cost")}
                      _placeholder={{ color: "#77797E" }}
                      value={formik.values.rent}
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.rent && !!formik.errors.rent}
                    />

                    <div className="form__input__container__warn">
                      {formik.touched.rent && formik.errors.rent ? (
                        <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                          {t(formik.errors.rent)}
                        </Text>
                      ) : null}
                    </div>
                  </FormControl>

                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label fo_primary">
                        {t("general.rent_collect_date")}
                      </Text>
                    </FormLabel>
                    <Input
                      name="rentCollectionDate"
                      size="lg"
                      type="date"
                      className="form__input__container__input"
                      placeholder={t("general.rent_collect_date")}
                      _placeholder={{ color: "#77797E" }}
                      value={dayjs(
                        new Date(formik.values.rentCollectionDate)
                      ).format("YYYY-MM-DD")}
                      onChange={formik.handleChange}
                      isInvalid={
                        formik.touched.rentCollectionDate &&
                        !!formik.errors.rentCollectionDate
                      }
                    />

                    <div className="form__input__container__warn">
                      {formik.touched.rentCollectionDate &&
                      formik.errors.rentCollectionDate ? (
                        <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                          {formik.errors.rentCollectionDate}
                        </Text>
                      ) : null}
                    </div>
                  </FormControl>
                </div>

                {/* <div className="form__input form__input__flex">
          <FormControl className="form__input__container">
            <InputGroup>
              <Input
                name="name"
                size="lg"
                type="text"
                className="form__input__container__input"
                placeholder="نسبه ربح المكتب    "
                _placeholder={{ color: "#77797E" }}
                value={formik.values.space}
                padding={"8px"}
                onChange={formik.handleChange}
                isInvalid={formik.touched.space && !!formik.errors.space}
              />
              <InputLeftAddon
                color={"#6F965E"}
                bg={"#E2FBD7"}
                width={"292px"}
                height="56px"
                justifyContent="center"
              >
                <div className="flex-between">
                  <span>مبلغ الربح</span>
                  <span>0.0 ريال</span>
                </div>
              </InputLeftAddon>
            </InputGroup>

            <div className="form__input__container__warn">
              {formik.touched.space && formik.errors.space ? (
                <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                  {formik.errors.space}
                </Text>
              ) : null}
            </div>
          </FormControl>
        </div> */}

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

                <div className="form__input form__input__flex">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label fo_primary">
                        {t("general.water_bill_cost")}
                      </Text>
                    </FormLabel>
                    <Input
                      name="waterAccount"
                      size="lg"
                      type="text"
                      className="form__input__container__input"
                      placeholder={t("general.water_bill_cost")}
                      _placeholder={{ color: "#77797E" }}
                      value={formik.values.waterAccount}
                      onChange={formik.handleChange}
                      isInvalid={
                        formik.touched.waterAccount &&
                        !!formik.errors.waterAccount
                      }
                    />

                    <div className="form__input__container__warn">
                      {formik.touched.waterAccount &&
                      formik.errors.waterAccount ? (
                        <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                          {t(formik.errors.waterAccount)}
                        </Text>
                      ) : null}
                    </div>
                  </FormControl>

                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label fo_primary">
                        {t("general.electericty_cost_num")}
                      </Text>
                    </FormLabel>
                    <Input
                      name="electricityAccount"
                      size="lg"
                      type="text"
                      className="form__input__container__input"
                      placeholder={t("general.electericty_cost_num")}
                      _placeholder={{ color: "#77797E" }}
                      value={formik.values.electricityAccount}
                      onChange={formik.handleChange}
                      isInvalid={
                        formik.touched.electricityAccount &&
                        !!formik.errors.electricityAccount
                      }
                    />

                    <div className="form__input__container__warn">
                      {formik.touched.electricityAccount &&
                      formik.errors.electricityAccount ? (
                        <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                          {t(formik.errors.electricityAccount)}
                        </Text>
                      ) : null}
                    </div>
                  </FormControl>
                </div>

                <div className="form__input form__input__flex">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label fo_primary">
                        {t("general.unit_space")}
                      </Text>
                    </FormLabel>
                    <InputGroup>
                      <Input
                        name="space"
                        size="lg"
                        type="text"
                        className="form__input__container__input"
                        placeholder={t("general.unit_space")}
                        _placeholder={{ color: "#77797E" }}
                        value={formik.values.space}
                        padding={"8px"}
                        onChange={formik.handleChange}
                        isInvalid={
                          formik.touched.space && !!formik.errors.space
                        }
                      />
                      <InputRightElement
                        color={"#77797E"}
                        width={"100px"}
                        height="100%"
                        justifyContent="center"
                        borderRadius={"12px"}
                      >
                        {t("general.square_meter")}
                      </InputRightElement>
                    </InputGroup>

                    <div className="form__input__container__warn">
                      {formik.touched.space && formik.errors.space ? (
                        <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                          {t(formik.errors.space)}
                        </Text>
                      ) : null}
                    </div>
                  </FormControl>
                </div>

                <div className="form__input form__input__flex">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label fo_primary">
                        {t("general.rooms_number")}
                      </Text>
                    </FormLabel>
                    <Input
                      name="rooms"
                      size="lg"
                      type="text"
                      className="form__input__container__input"
                      placeholder={t("general.rooms_number")}
                      _placeholder={{ color: "#77797E" }}
                      value={formik.values.rooms}
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.rooms && !!formik.errors.rooms}
                    />

                    <div className="form__input__container__warn">
                      {formik.touched.rooms && formik.errors.rooms ? (
                        <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                          {t(formik.errors.rooms)}
                        </Text>
                      ) : null}
                    </div>
                  </FormControl>

                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label fo_primary">
                        {t("general.bathrooms_number")}
                      </Text>
                    </FormLabel>
                    <Input
                      name="bathrooms"
                      size="lg"
                      type="text"
                      className="form__input__container__input"
                      placeholder={t("general.bathrooms_number")}
                      _placeholder={{ color: "#77797E" }}
                      value={formik.values.bathrooms}
                      onChange={formik.handleChange}
                      isInvalid={
                        formik.touched.bathrooms && !!formik.errors.bathrooms
                      }
                    />

                    <div className="form__input__container__warn">
                      {formik.touched.bathrooms && formik.errors.bathrooms ? (
                        <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                          {t(formik.errors.bathrooms)}
                        </Text>
                      ) : null}
                    </div>
                  </FormControl>

                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label fo_primary">
                        {t("general.conditioners_number")}
                      </Text>
                    </FormLabel>
                    <Input
                      name="conditioners"
                      size="lg"
                      type="text"
                      className="form__input__container__input"
                      placeholder={t("general.conditioners_number")}
                      _placeholder={{ color: "#77797E" }}
                      value={formik.values.conditioners}
                      onChange={formik.handleChange}
                      isInvalid={
                        formik.touched.conditioners &&
                        !!formik.errors.conditioners
                      }
                    />

                    <div className="form__input__container__warn">
                      {formik.touched.conditioners &&
                      formik.errors.conditioners ? (
                        <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                          {t(formik.errors.conditioners)}
                        </Text>
                      ) : null}
                    </div>
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

                  <FormControl
                    value={loungeChoice}
                    className="form__input__container"
                  >
                    <Checkbox
                      isChecked={loungeChoice}
                      value={loungeChoice}
                      onChange={(e) => {
                        setLoungeChoice(!loungeChoice);
                      }}
                    >
                      <span className="form__input__container__checkbox_txt">
                        {t("general.lounge")}
                      </span>
                    </Checkbox>
                  </FormControl>
                </div>

                <div className="form__input form__input__flex mb-24">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label fo_primary">
                        {t("general.property_owner")}
                      </Text>
                    </FormLabel>
                    <Select
                      height={"56px"}
                      name="owner"
                      value={selectedOwnerId}
                      onChange={(e) => {
                        setSelectedOwnerId(e.target.value);
                        setTimeout(() => {}, 0);
                      }}
                    >
                      <option value={0}>{t("general.owner")} </option>
                      {usersData?.users
                        .filter((s) => s.role == USER_ROLES.OWNER)
                        ?.map((i, index) => (
                          <option value={i.id} key={index}>
                            {i.firstNameAr}
                          </option>
                        ))}
                    </Select>
                  </FormControl>

                  <FormControl className="form__input__container ">
                    <FormLabel>
                      <Text className="form__input__container__label fo_primary">
                        {t("general.property_renter")}
                      </Text>
                    </FormLabel>
                    <div
                      className="form__input__container_custom_input"
                      style={{ padding: "0px" }}
                    >
                      <Input
                        name="renter_search"
                        size="sm"
                        type="text"
                        placeholder={t("general.search")}
                        _placeholder={{ color: "#77797E" }}
                        marginLeft={"8px"}
                        padding="0px 6px"
                        height={"40px"}
                        onChange={(e) => {
                          setFilterdRentSearch(e.target.value);
                        }}
                      />
                    </div>
                    <Select
                      height={"56px"}
                      name="renter"
                      value={selectedRenterId}
                      onChange={(e) => {
                        setSelectedRenterId(e.target.value);
                        setTimeout(() => {}, 0);
                      }}
                    >
                      <option value={0}>{t("general.renter")} </option>
                      {filterdRenters?.users
                        .filter((s) => s.role == USER_ROLES.TENANT)
                        ?.map((i, index) => (
                          <option value={i.id} key={index}>
                            {i.identityId}
                          </option>
                        ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="form__input form__input__flex mb-24">
                  <FormControl className="form__input__container  ">
                    <FormLabel>
                      <Text className="form__input__container__label fo_primary">
                        {t("general.unit_property")}
                      </Text>
                    </FormLabel>
                    <Select
                      height={"56px"}
                      name="unit_property"
                      value={selectedProbertyId}
                      onChange={(e) => {
                        setSelectedPropertyId(e.target.value);
                        setTimeout(() => {}, 0);
                      }}
                    >
                      <option value={0}> {t("general.unit_property")} </option>
                      {PropertiesData?.updatedProperties?.map((i, index) => (
                        <option value={i.id} key={index}>
                          {i.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl className="form__input__container ">
                    <FormLabel>
                      <Text className="form__input__container__label fo_primary">
                        {t("general.maintenance")}
                        <span className="red_dot">*</span>
                      </Text>
                    </FormLabel>
                    <Select
                      height={"56px"}
                      name="maintenance"
                      value={selectedMaintenanceManId}
                      onChange={(e) => {
                        setSelectedMaintenanceManId(e.target.value);
                        setTimeout(() => {}, 0);
                      }}
                    >
                      <option value={0}> {t("general.maintenance")} </option>
                      <option value={"OWNER"}> {t("general.owner")} </option>
                      <option value={"ENTERPRISE"}>
                         
                        {t("sidebar.enterprise")} 
                      </option>
                    </Select>
                  </FormControl>
                </div>

                <div className="form__input form__input__flex mb-24">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label fo_primary">
                        {t("general.rent_rate")}
                        <span className="red_dot">*</span>
                      </Text>
                    </FormLabel>
                    <Select
                      height={"56px"}
                      name="rent_rate"
                      value={selectedRentRate}
                      onChange={(e) => {
                        setSelectedRentRate(e.target.value);
                        setTimeout(() => {}, 0);
                      }}
                    >
                      <option value={0}> {t("general.rent_rate")} </option>
                      <option value={"MONTHLY"}>
                         
                        {t("general.monthly")} 
                      </option>
                      <option value={"YEARLY"}> {t("general.yearly")} </option>
                    </Select>
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
                    isDisabled={
                      !selectedMaintenanceManId ||
                      !selectedRentRate ||
                      (loungeChoice && formik.values.conditioners <= 0)
                    }
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
    </>
  );
};

export default EditUnit;
