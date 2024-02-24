import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { unitsValidation } from "../validation/schema";
import { Button, FormControl, FormLabel, Input, Radio, RadioGroup, Select, Stack, Text } from "@chakra-ui/react";
import "../../../assets/styels/components/forms.scss";
import { useCreateUnit } from "../hooks/useCreateUnit";
import useUsers from "../../users/hooks/useUsers";
import useProperties from "../../propreties/hooks/useAllProperties";
import { USER_ROLES } from "../../../enums/UserRoles";

const CreateUnit = ({ownerId}) => {
  const { mutate } = useCreateUnit();
  const [selectedOwnerId, setSelectedOwnerId] = useState(0);
  const [selectedProbertyId, setSelectedPropertyId] = useState(0);
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
    usersRefetch();
    PropertiesRefetch();
  }, []);
  const [loungeChoice, setLoungeChoice] = useState("true");
  const [kitchenChoice, setKitchenChoice] = useState("true");

  const initialValues = {
    name: "",
    rent: 0,
    rentCollectionDate: "",
    electricityAccount: "",
    waterAccount: "",
    address: "",
    space: 0,
    rooms: 0,
    bathrooms: 0,
    conditioners: 0,
    waterCost: 0,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: unitsValidation,
    onSubmit: (values) => {
      let kitchen = kitchenChoice == 'true'? true : false 
      let lounge = loungeChoice == 'true'? true : false
      let data = { body: {lounge:lounge , kitchen:kitchen , ownerId:ownerId , ...values }}
      mutate(data);
    },
  });
  return (
    <div className="from__card from__card__full">
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="form__header">Create Unit</div>

        <div className="form__input form__input__flex">
          <FormControl className="form__input__container">
            <FormLabel>
              <Text className="form__input__container__label">Name </Text>
            </FormLabel>

            <Input
              name="name"
              type="text"
              className="form__input__container__input"
              placeholder="enter your first name in En"
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.touched.name && !!formik.errors.name}
            />

            <div className="form__input__container__warn">
              {formik.touched.name && formik.errors.name ? (
                <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                  {formik.errors.name}
                </Text>
              ) : null}
            </div>
          </FormControl>

          <FormControl className="form__input__container">
            <FormLabel>
              <Text className="form__input__container__label"> rent</Text>
            </FormLabel>

            <Input
              name="rent"
              type="number"
              className="form__input__container__input"
              placeholder="enter your last name in En"
              value={formik.values.rent}
              onChange={formik.handleChange}
              isInvalid={formik.touched.rent && !!formik.errors.rent}
            />

            <div classeName="form__input__container__warn">
              {formik.touched.rent && formik.errors.rent ? (
                <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                  {formik.errors.rent}
                </Text>
              ) : null}
            </div>
          </FormControl>
        </div>

        <div className="form__input form__input__flex">
          <FormControl className="form__input__container">
            <FormLabel>
              <Text className="form__input__container__label">
                rentCollectionDate{" "}
              </Text>
            </FormLabel>

            <Input
              name="rentCollectionDate"
              type="text"
              className="form__input__container__input"
              placeholder="enter your rentCollectionDate"
              value={formik.values.rentCollectionDate}
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

          <FormControl className="form__input__container">
            <FormLabel>
              <Text className="form__input__container__label">
                {" "}
                electricityAccount{" "}
              </Text>
            </FormLabel>

            <Input
              name="electricityAccount"
              type="text"
              className="form__input__container__input"
              placeholder="enter your electricityAccount"
              value={formik.values.electricityAccount}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.electricityAccount &&
                !!formik.errors.electricityAccount
              }
            />

            <div classeName="form__input__container__warn">
              {formik.touched.electricityAccount &&
              formik.errors.electricityAccount ? (
                <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                  {formik.errors.electricityAccount}
                </Text>
              ) : null}
            </div>
          </FormControl>
        </div>

        <div className="form__input form__input__flex">
          <FormControl className="form__input__container">
            <FormLabel>
              <Text className="form__input__container__label">
                waterAccount{" "}
              </Text>
            </FormLabel>

            <Input
              name="waterAccount"
              type="text"
              className="form__input__container__input"
              placeholder="enter your water account"
              value={formik.values.waterAccount}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.waterAccount && !!formik.errors.waterAccount
              }
            />

            <div className="form__input__container__warn">
              {formik.touched.waterAccount && formik.errors.waterAccount ? (
                <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                  {formik.errors.waterAccount}
                </Text>
              ) : null}
            </div>
          </FormControl>

          <FormControl className="form__input__container">
            <FormLabel>
              <Text className="form__input__container__label"> address </Text>
            </FormLabel>

            <Input
              name="address"
              type="text"
              className="form__input__container__input"
              placeholder="enter your address"
              value={formik.values.address}
              onChange={formik.handleChange}
              isInvalid={formik.touched.address && !!formik.errors.address}
            />

            <div classeName="form__input__container__warn">
              {formik.touched.address && formik.errors.address ? (
                <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                  {formik.errors.address}
                </Text>
              ) : null}
            </div>
          </FormControl>
        </div>

        <div className="form__input form__input__flex">
          <FormControl className="form__input__container">
            <FormLabel>
              <Text className="form__input__container__label">space </Text>
            </FormLabel>

            <Input
              name="space"
              type="number"
              className="form__input__container__input"
              placeholder="enter your space"
              value={formik.values.space}
              onChange={formik.handleChange}
              isInvalid={formik.touched.space && !!formik.errors.space}
            />

            <div className="form__input__container__warn">
              {formik.touched.space && formik.errors.space ? (
                <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                  {formik.errors.space}
                </Text>
              ) : null}
            </div>
          </FormControl>

          <FormControl className="form__input__container">
            <FormLabel>
              <Text className="form__input__container__label"> rooms </Text>
            </FormLabel>

            <Input
              name="rooms"
              type="number"
              className="form__input__container__input"
              placeholder="enter your rooms"
              value={formik.values.rooms}
              onChange={formik.handleChange}
              isInvalid={formik.touched.rooms && !!formik.errors.rooms}
            />

            <div classeName="form__input__container__warn">
              {formik.touched.rooms && formik.errors.rooms ? (
                <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                  {formik.errors.rooms}
                </Text>
              ) : null}
            </div>
          </FormControl>

          <FormControl className="form__input__container">
            <FormLabel>
              <Text className="form__input__container__label"> waterCost </Text>
            </FormLabel>

            <Input
              name="waterCost"
              type="number"
              className="form__input__container__input"
              placeholder="enter your waterCost"
              value={formik.values.waterCost}
              onChange={formik.handleChange}
              isInvalid={formik.touched.waterCost && !!formik.errors.waterCost}
            />

            <div classeName="form__input__container__warn">
              {formik.touched.waterCost && formik.errors.waterCost ? (
                <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                  {formik.errors.waterCost}
                </Text>
              ) : null}
            </div>
          </FormControl>
        </div>

        <div className="form__input form__input__flex">
          <FormControl className="form__input__container">
            <FormLabel>
              <Text className="form__input__container__label">bathrooms </Text>
            </FormLabel>

            <Input
              name="bathrooms"
              type="number"
              className="form__input__container__input"
              placeholder="enter your bathrooms"
              value={formik.values.bathrooms}
              onChange={formik.handleChange}
              isInvalid={formik.touched.bathrooms && !!formik.errors.bathrooms}
            />

            <div className="form__input__container__warn">
              {formik.touched.bathrooms && formik.errors.bathrooms ? (
                <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                  {formik.errors.bathrooms}
                </Text>
              ) : null}
            </div>
          </FormControl>

          <FormControl className="form__input__container">
            <FormLabel>
              <Text className="form__input__container__label">lounge</Text>
            </FormLabel>

            <RadioGroup
              value={loungeChoice}
              onChange={(newType) => setLoungeChoice(newType)}
              marginTop="16px"
            >
              <Stack direction="row">
                <Radio value={"true"} marginRight="12px">
                  True
                </Radio>
                <Radio value={"false"} marginRight="12px">
                  False
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </div>

        <div className="form__input form__input__flex">
          <FormControl className="form__input__container">
            <FormLabel>
              <Text className="form__input__container__label">
                conditioners
              </Text>
            </FormLabel>

            <Input
              name="conditioners"
              type="number"
              className="form__input__container__input"
              placeholder="enter your conditioners"
              value={formik.values.conditioners}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.conditioners && !!formik.errors.conditioners
              }
            />

            <div className="form__input__container__warn">
              {formik.touched.conditioners && formik.errors.conditioners ? (
                <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                  {formik.errors.conditioners}
                </Text>
              ) : null}
            </div>
          </FormControl>

          <FormControl className="form__input__container">
            <FormLabel>
              <Text className="form__input__container__label">Kitchen</Text>
            </FormLabel>

            <RadioGroup
              value={kitchenChoice}
              onChange={(newType) => setKitchenChoice(newType)}
              marginTop="16px"
            >
              <Stack direction="row">
                <Radio value={"true"} marginRight="12px">
                  True
                </Radio>
                <Radio value={"false"} marginRight="12px">
                  False
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </div>

        <div className="form__input form__input__flex">
          <FormControl className="form__input__container">
            <FormLabel>
              <Text className="form__input__container__label">Owner</Text>
              <Text className="form__input__container__desc">choose owner is mandotry for create property </Text>
            </FormLabel>

            <Select
              name="propertyOwner"
              value={selectedOwnerId}
              onChange={(e) => {
                setSelectedOwnerId(e.target.value)
                setTimeout(() => {}, 0);
              }}
            >
              <option value={0}>Select User</option>
              {usersData?.users
                    .filter((s) => s.role == USER_ROLES.OWNER)
                    ?.map((i, index) => (
                <option value={i.id} key={index}>
                  {i.firstNameEn}
                </option>
              ))}
            </Select>

           
          </FormControl>

          <FormControl className="form__input__container">
            <FormLabel>
              <Text className="form__input__container__label">Property</Text>
              <Text className="form__input__container__desc">choose owner is optional for create property </Text>
            </FormLabel>

            <Select
              name="propertyOwner"
              value={selectedProbertyId}
              onChange={(e) => {
                setSelectedPropertyId(e.target.value)
                setTimeout(() => {}, 0);
              }}
            >
              <option value={0}>Select Property </option>
              {PropertiesData?.properties?.map((i, index) => (
                <option value={i.id} key={index}>
                  {i.name}
                </option>
              ))}
            </Select>

           
          </FormControl>
        </div>

        <div className="form__btn__container">
          <Button  isDisabled={selectedOwnerId == 0 } className="form__btn " type="submit">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUnit;
