import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { unitsValidation } from "../validation/schema";
import { useUpdateUnit } from "../hooks/useUpdateUnit";
import useGetUser from "../hooks/useGetUnit";

const EditUnit = () => {
  const { state } = useLocation();
  const {
    id,
    name,
    rent,
    rentCollectionDate,
    electricityAccount,
    waterAccount,
    address,
    space,
    rooms,
    bathrooms,
    lounge,
    conditioners,
    kitchen,
  } = state;

  const { mutate } = useUpdateUnit();
  const { data, isLoading, refetch } = useGetUser(id);
  const [loungeChoice, setLoungeChoice] = useState(lounge);

  useEffect(() => {
    refetch();
  }, []);
  const initialValues = {
    name: name,
    rent: rent,
    rentCollectionDate: rentCollectionDate,
    electricityAccount: electricityAccount,
    waterAccount: waterAccount,
    address: address,
    space: space,
    rooms: rooms,
    bathrooms: bathrooms,
    lounge: lounge,
    conditioners: conditioners,
    kitchen: kitchen,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: unitsValidation,
    onSubmit: (values) => {
      mutate({ id: id, body: values });
      console.log(values);
    },
  });
  return (
    <>
      <Card className="from__card">
        <CardBody>
          <form onSubmit={formik.handleSubmit} className="form">
            <div className="form__header">Edit Unit</div>
            <div className="from__card from__card__full">
              <div className="form__input form__input__flex">
                <FormControl className="form__input__container">
                  <FormLabel>
                    <Text className="form__input__container__label">Name</Text>
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
                    <Text className="form__input__container__label">rent</Text>
                  </FormLabel>

                  <Input
                    name="rent"
                    type="text"
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
                      rent collection date
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
                      electricity account
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
                      water account
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
                      formik.touched.waterAccount &&
                      !!formik.errors.waterAccount
                    }
                  />

                  <div className="form__input__container__warn">
                    {formik.touched.waterAccount &&
                    formik.errors.waterAccount ? (
                      <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                        {formik.errors.waterAccount}
                      </Text>
                    ) : null}
                  </div>
                </FormControl>

                <FormControl className="form__input__container">
                  <FormLabel>
                    <Text className="form__input__container__label">
                      {" "}
                      address{" "}
                    </Text>
                  </FormLabel>

                  <Input
                    name="address"
                    type="text"
                    className="form__input__container__input"
                    placeholder="enter your address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.address && !!formik.errors.address
                    }
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
                    <Text className="form__input__container__label">space</Text>
                  </FormLabel>

                  <Input
                    name="space"
                    type="text"
                    className="form__input__container__input"
                    placeholder="enter your space "
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
                    <Text className="form__input__container__label">
                      {" "}
                      rooms{" "}
                    </Text>
                  </FormLabel>

                  <Input
                    name="rooms"
                    type="text"
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
              </div>

              <div className="form__input form__input__flex">
                <FormControl className="form__input__container">
                  <FormLabel>
                    <Text className="form__input__container__label">
                      bathrooms{" "}
                    </Text>
                  </FormLabel>

                  <Input
                    name="bathrooms"
                    type="text"
                    className="form__input__container__input"
                    placeholder="enter your bathrooms"
                    value={formik.values.bathrooms}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.bathrooms && !!formik.errors.bathrooms
                    }
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
                    <Text className="form__input__container__label">
                      {" "}
                      lounge{" "}
                    </Text>
                  </FormLabel>


                  <RadioGroup
                    value={formik.values.lounge}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.lounge && !!formik.errors.lounge}
                    marginTop="16px"
                  >
                    <Stack direction="row">
                      <Radio value={true} marginRight="12px">
                        True
                      </Radio>
                      <Radio value={false} marginRight="12px">
                        False
                      </Radio>
                    </Stack>
                  </RadioGroup>

                  <div classeName="form__input__container__warn">
                    {formik.touched.lounge && formik.errors.lounge ? (
                      <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                        {formik.errors.lounge}
                      </Text>
                    ) : null}
                  </div>
                </FormControl>
              </div>

              <div className="form__input form__input__flex">
                <FormControl className="form__input__container">
                  <FormLabel>
                    <Text className="form__input__container__label">
                      conditioners{" "}
                    </Text>
                  </FormLabel>

                  <Input
                    name="conditioners"
                    type="text"
                    className="form__input__container__input"
                    placeholder="enter your conditioners "
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
                        {formik.errors.conditioners}
                      </Text>
                    ) : null}
                  </div>
                </FormControl>

                <FormControl className="form__input__container">
                  <FormLabel>
                    <Text className="form__input__container__label">
                      {" "}
                      kitchen{" "}
                    </Text>
                  </FormLabel>

                  <Input
                    name="kitchen"
                    type="text"
                    className="form__input__container__input"
                    placeholder="enter your kitchen"
                    value={formik.values.kitchen}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.kitchen && !!formik.errors.kitchen
                    }
                  />

                  <div classeName="form__input__container__warn">
                    {formik.touched.kitchen && formik.errors.kitchen ? (
                      <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                        {formik.errors.kitchen}
                      </Text>
                    ) : null}
                  </div>
                </FormControl>
              </div>
            </div>
            <div className="form__btn__container">
              <Button className="form__btn " type="submit">
                Edit
              </Button>
              <Button className="form__btn form__btn__delete ">Delete</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default EditUnit;
