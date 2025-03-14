import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { unitsValidation } from "../validation/schema";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import "../../../assets/styels/components/forms.scss";
import { useCreateUnit } from "../hooks/useCreateUnit";
import { USER_ROLES } from "../../../enums/UserRoles";
import close from "../../../assets/icons-svgs/close.svg";
import bell from "../../../assets/images/bell.png";
import useUsers from "../../users/hooks/useUsers";
import useProperties from "../../propreties/hooks/useAllProperties";
import { useTranslation } from "react-i18next";
import { useDynamicColors } from "../../../hooks/useDynamicColors";

const CreateUnit = ({ propOwenerId, propPropertyId, onClose }) => {
  const { t } = useTranslation();
  const {primary,secondry}=useDynamicColors()

  const { mutate , isLoading,isSuccess} = useCreateUnit();

  const [selectedOwnerId, setSelectedOwnerId] = useState(propOwenerId);
  const [selectedRenterId, setSelectedRenterId] = useState();
  const [selectedMaintenanceManId, setSelectedMaintenanceManId] = useState();
  const [selectedRentRate, setSelectedRentRate] = useState("");
  const [selectedProbertyId, setSelectedPropertyId] = useState(propPropertyId);
  const [loungeChoice, setLoungeChoice] = useState(false);
  const [kitchenChoice, setKitchenChoice] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filterdRenters , setFiltersRenters]=useState()
  const [filterdRentSearch , setFilterdRentSearch]=useState("")


  const { usersData, usersRefetch } = useUsers({
    pageNo: 1,
    limit: 1000,
    count: 12,
    role: USER_ROLES.TENANT,
  });
  const { PropertiesData, PropertiesRefetch } = useProperties({
    pageNo: 1,
    limit: 1000,
    count: 12,
  });
  useEffect(() => {
    usersRefetch();
    PropertiesRefetch();
    if(usersData){      
      setFiltersRenters(usersData)
    }
  }, [usersData]);

  useEffect(() => {}, [kitchenChoice]);
  useEffect(() => {}, [loungeChoice]);

  const initialValues = {
    name: "",
    rent: null,
    rentCollectionDate: "",
    electricityAccount: "",
    waterAccount: "",
    address: "",
    space: null,
    rooms: null,
    bathrooms: null,
    conditioners: null,
    ownerId: propOwenerId || " ",
    propertyId: propPropertyId || " ",
    tenantId:" ",
    image: " ",
    rentCollectionRate: null,
    maintenanceMan: "OWNER",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: unitsValidation,
    onSubmit: (values) => {      
      formik.values.ownerId = selectedOwnerId;
      formik.values.propertyId = selectedProbertyId;
      formik.values.maintenanceMan = selectedMaintenanceManId;
      formik.values.tenantId = selectedRenterId;
      formik.rentCollectionRate = selectedRentRate;
      const formData = new FormData();
      if(selectedImage){
        formData.append("image", selectedImage, selectedImage.name);
      }
      if(formik.values.name){
        formData.append("name", formik.values.name);
      }
      if(formik.values.address){
        formData.append("address", formik.values.address);
      }
      if(formik.values.bathrooms){
        formData.append("bathrooms", formik.values.bathrooms);
      }
      if(formik.values.conditioners){
        formData.append("conditioners", formik.values.conditioners);
      }
      if(formik.values.electricityAccount){
        formData.append("electricityAccount", formik.values.electricityAccount);
      }
      if(formik.values.maintenanceMan){
        formData.append("maintenanceMan", formik.values.maintenanceMan);
      }
      if(formik.values.ownerId){
        formData.append("ownerId", formik.values.ownerId);
      }
      if(formik.values.propertyId){
        formData.append("propertyId", formik.values.propertyId);
      }
      if(formik.values.tenantId){
        formData.append("tenantId", formik.values.tenantId);
      }
      if(formik.values.rent){
        formData.append("rent", formik.values.rent);
      }
      if(formik.values.rentCollectionDate){
        formData.append("rentCollectionDate", formik.values.rentCollectionDate);
      }
      if(formik.values.rooms){
        formData.append("rooms", formik.values.rooms);
      }
      if(formik.values.space){
        formData.append("space", formik.values.space);
      }
      if(formik.values.waterAccount){
        formData.append("waterAccount", formik.values.waterAccount);
      }
      if(kitchenChoice){
        formData.append("kitchen", kitchenChoice);
      }
      if(loungeChoice){
        formData.append("lounge", loungeChoice);
      }
      if(selectedRentRate){
        formData.append("rentCollectionRate", selectedRentRate);
      }
     
      mutate({ body: formData });
    },
  });
  useEffect(()=>{
    if(isSuccess && !isLoading){
      onClose();
    }
  },[isSuccess])

  useEffect(()=>{    
    const filterdArr = filterdRenters?.users.filter((i) => i.identityId === filterdRentSearch)
    if(filterdArr?.length){
      setSelectedRenterId(filterdArr[0]?.id)
    }else{
      setSelectedRenterId(null)
    }
  },[filterdRentSearch, filterdRenters])

  return (
    <div className="from__card from__card__full">
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="form__header">
          <div className="form__header_text fo_primary">{t("units.create.title")} </div>
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
                {t("general.unit_name")}
                <span className="red_dot">*</span>
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
                <span className="red_dot">*</span>
              </Text>
            </FormLabel>
            <Input
              name="rent"
              size="lg"
              type="number"
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
                <span className="red_dot">*</span>
              </Text>
            </FormLabel>
            <Input
              name="rentCollectionDate"
              size="lg"
              type="date"
              className="form__input__container__input"
              placeholder={t("general.rent_collect_date")}
              _placeholder={{ color: "#77797E" }}
              value={formik.values.rentCollectionDate}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.rentCollectionDate &&
                !!formik.errors.rentCollectionDate
              }
              min={dayjs().add(3, 'days').format("YYYY-MM-DD")}
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
              isInvalid={formik.touched.address && !!formik.errors.address}
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
                <span className="red_dot">*</span>
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
                formik.touched.waterAccount && !!formik.errors.waterAccount
              }
            />

            <div className="form__input__container__warn">
              {formik.touched.waterAccount && formik.errors.waterAccount ? (
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
                <span className="red_dot">*</span>
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
                type="number"
                className="form__input__container__input"
                placeholder={t("general.unit_space")}
                _placeholder={{ color: "#77797E" }}
                value={formik.values.space}
                padding={"8px"}
                onChange={formik.handleChange}
                isInvalid={formik.touched.space && !!formik.errors.space}
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
              type="number"
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
              type="number"
              className="form__input__container__input"
              placeholder={t("general.bathrooms_number")}
              _placeholder={{ color: "#77797E" }}
              value={formik.values.bathrooms}
              onChange={formik.handleChange}
              isInvalid={formik.touched.bathrooms && !!formik.errors.bathrooms}
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
              type="number"
              className="form__input__container__input"
              placeholder={t("general.conditioners_number")}
              _placeholder={{ color: "#77797E" }}
              value={formik.values.conditioners}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.conditioners && !!formik.errors.conditioners
              }
            />

            <div className="form__input__container__warn">
              {formik.touched.conditioners && formik.errors.conditioners ? (
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

          <FormControl value={loungeChoice} className="form__input__container">
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

        <div className="form__input form__input__flex mb-24" style={{alignItems:'flex-end'}}>
          {/* <FormControl className="form__input__container">
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
              {usersData?.users?.map((i, index) => (
                  <option value={i.id} key={index}>
                    {i.firstNameAr}
                  </option>
                ))}
            </Select>
          </FormControl> */}

          <FormControl className="form__input__container">
            <FormLabel>
              <Text className="form__input__container__label fo_primary">
                {t("general.property_renter")}
              </Text>
            </FormLabel>
            <div className="form__input__container_custom_input" style={{padding:'0px'}}>
            <Input
              name="renter_search"
              size="sm"
              type="text"
              placeholder={t("general.search")}
              _placeholder={{ color: "#77797E" }}
              marginLeft={'8px'}
              padding="0px 6px"
              height={'40px'}
              onChange={(e)=>{
                setFilterdRentSearch(e.target.value)
              }}
            />
             
            </div>
            <Select
              height={"56px"}
              name="renter"
              value={selectedRenterId ? selectedRenterId : 0}
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
          <FormControl className="form__input__container">
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

          <FormControl className="form__input__container">
            <FormLabel>
              <Text className="form__input__container__label fo_primary">
                {t("general.maintenance")}
                <span className="red_dot">*</span>
              </Text>
            </FormLabel>
            <Select
              height={"56px"}
              name="maintenance"
              onChange={(e) => {
                setSelectedMaintenanceManId(e.target.value);
                setTimeout(() => {}, 0);
              }}
            >
              <option value={0}> {t("general.maintenance")} </option>
              <option value={"OWNER"}> {t("general.owner")} </option>
              <option value={"ENTERPRISE"}> {t("sidebar.enterprise")} </option>
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
              name="rentCollectionRate"
              onChange={(e) => {        
                formik.setFieldValue("rentCollectionRate", e.target.value);        
                setSelectedRentRate(e.target.value);
                setTimeout(() => {}, 0);
              }}
            >
              <option value={0}> {t("general.rent_rate")} </option>
              <option value={"MONTHLY"}>{t("general.monthly")}</option>
              <option value={"QUARTERLY"}> {t("general.quarter_yearly")} </option>
              <option value={"HALF_YEARLY"}> {t("general.half_yearly")} </option>
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
                !selectedRentRate || (loungeChoice && formik.values.conditioners <= 0)
              }
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

export default CreateUnit;
