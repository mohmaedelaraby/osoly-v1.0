import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { propertyEditValidation } from "../validation/schema";
import UnitsTable from "../../units/templete/UnitsTable";
import { useUpdatePropertey } from "../hooks/useUpdatePropertey";
import useGetPropertey from "../hooks/useGetPropertey";
import useUsers from "../../users/hooks/useUsers";
import { USER_ROLES } from "../../../enums/UserRoles";

const EditProperty = () => {
  const { state } = useLocation();
  const {
    id,
    name,
    address,
    unitsCount,
    instrumentNumber,
    postalCode,
    blockNumber,
    street,
    subNumber,
    district,
    units,
    owenerId,
    city,
  } = state;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOwnerId, setSelectedOwnerId] = useState(0);

  const { usersData, usersRefetch } = useUsers({
    pageNo: 1,
    limit: 10000,
  });

  const { mutate } = useUpdatePropertey();
  const { data, isLoading, refetch } = useGetPropertey(id);
  useEffect(() => {
    refetch();
    usersRefetch();
  }, []);

  useEffect(() => {
    if (data) {
      setSelectedOwnerId(data?.ownerId);
    }
  }, [data]);

  const initialValues = {
    name: name,
    address: address,
    unitsCount: unitsCount,
    instrumentNumber: instrumentNumber,
    postalCode: postalCode,
    blockNumber: blockNumber,
    street: street,
    subNumber: subNumber,
    district: district,
    city: city,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: propertyEditValidation,
    onSubmit: (values) => {
      let data = { ...values };
    
      mutate({id:id? id:data?.id ,body:data});
      //mutate({ id: data?.id, body: values });
    },
  });
  return (
    <>
      <Card className="from__card">
        <CardBody>
          <form onSubmit={formik.handleSubmit} className="form">
            <div className="form__header">Edit Proprety -- {owenerId}</div>
            <div className="formWithTable_container">
              <div className="from__card from__card__full">
                <div className="form__input form__input__flex">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label">
                        {" "}
                        Name{" "}
                      </Text>
                    </FormLabel>

                    <Input
                      name="name"
                      type="text"
                      className="form__input__container__input"
                      placeholder="enter your name"
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
                </div>

                <div className="form__input form__input__flex">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label">
                        {" "}
                        Address{" "}
                      </Text>
                    </FormLabel>

                    <Input
                      name="address"
                      type="text"
                      className="form__input__container__input"
                      placeholder="enter your name"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      isInvalid={
                        formik.touched.address && !!formik.errors.address
                      }
                    />

                    <div className="form__input__container__warn">
                      {formik.touched.address && formik.errors.address ? (
                        <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                          {formik.errors.address}
                        </Text>
                      ) : null}
                    </div>
                  </FormControl>

                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label">
                        {" "}
                        street{" "}
                      </Text>
                    </FormLabel>

                    <Input
                      name="street"
                      type="text"
                      className="form__input__container__input"
                      placeholder="enter your street"
                      value={formik.values.street}
                      onChange={formik.handleChange}
                      isInvalid={
                        formik.touched.street && !!formik.errors.street
                      }
                    />

                    <div className="form__input__container__warn">
                      {formik.touched.street && formik.errors.street ? (
                        <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                          {formik.errors.street}
                        </Text>
                      ) : null}
                    </div>
                  </FormControl>
                </div>

                <div className="form__input form__input__flex">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label">
                        {" "}
                        units count{" "}
                      </Text>
                    </FormLabel>

                    <Input
                      name="unitsCount"
                      type="number"
                      className="form__input__container__input"
                      placeholder="enter your name"
                      value={formik.values.unitsCount}
                      onChange={formik.handleChange}
                      isInvalid={
                        formik.touched.unitsCount && !!formik.errors.unitsCount
                      }
                    />

                    <div className="form__input__container__warn">
                      {formik.touched.unitsCount && formik.errors.unitsCount ? (
                        <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                          {formik.errors.unitsCount}
                        </Text>
                      ) : null}
                    </div>
                  </FormControl>

                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label">
                        {" "}
                        Instrument Number{" "}
                      </Text>
                    </FormLabel>

                    <Input
                      name="instrumentNumber"
                      type="text"
                      className="form__input__container__input"
                      placeholder="enter your instrumentNumber"
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
                          {formik.errors.instrumentNumber}
                        </Text>
                      ) : null}
                    </div>
                  </FormControl>

                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label">
                        {" "}
                        Postal Code{" "}
                      </Text>
                    </FormLabel>

                    <Input
                      name="postalCode"
                      type="text"
                      className="form__input__container__input"
                      placeholder="enter your postalCode"
                      value={formik.values.postalCode}
                      onChange={formik.handleChange}
                      isInvalid={
                        formik.touched.postalCode && !!formik.errors.postalCode
                      }
                    />

                    <div className="form__input__container__warn">
                      {formik.touched.postalCode && formik.errors.postalCode ? (
                        <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                          {formik.errors.postalCode}
                        </Text>
                      ) : null}
                    </div>
                  </FormControl>
                </div>

                <div className="form__input form__input__flex">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label">
                        {" "}
                        Block Number{" "}
                      </Text>
                    </FormLabel>

                    <Input
                      name="blockNumber"
                      type="text"
                      className="form__input__container__input"
                      placeholder="enter your name"
                      value={formik.values.blockNumber}
                      onChange={formik.handleChange}
                      isInvalid={
                        formik.touched.blockNumber &&
                        !!formik.errors.blockNumber
                      }
                    />

                    <div className="form__input__container__warn">
                      {formik.touched.blockNumber &&
                      formik.errors.blockNumber ? (
                        <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                          {formik.errors.blockNumber}
                        </Text>
                      ) : null}
                    </div>
                  </FormControl>

                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label">
                        {" "}
                        Sub Number{" "}
                      </Text>
                    </FormLabel>

                    <Input
                      name="subNumber"
                      type="text"
                      className="form__input__container__input"
                      placeholder="enter your subNumber"
                      value={formik.values.subNumber}
                      onChange={formik.handleChange}
                      isInvalid={
                        formik.touched.subNumber && !!formik.errors.subNumber
                      }
                    />

                    <div className="form__input__container__warn">
                      {formik.touched.subNumber && formik.errors.subNumber ? (
                        <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                          {formik.errors.subNumber}
                        </Text>
                      ) : null}
                    </div>
                  </FormControl>
                </div>
                <div className="form__input form__input__flex">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label">
                        City
                      </Text>
                    </FormLabel>

                    <Input
                      name="city"
                      type="text"
                      className="form__input__container__input"
                      placeholder="enter your city"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.city && !!formik.errors.city}
                    />

                    <div className="form__input__container__warn">
                      {formik.touched.city && formik.errors.city ? (
                        <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                          {formik.errors.city}
                        </Text>
                      ) : null}
                    </div>
                  </FormControl>

                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label">
                        {" "}
                        district{" "}
                      </Text>
                    </FormLabel>

                    <Input
                      name="district"
                      type="text"
                      className="form__input__container__input"
                      placeholder="enter your district"
                      value={formik.values.district}
                      onChange={formik.handleChange}
                      isInvalid={
                        formik.touched.district && !!formik.errors.district
                      }
                    />

                    <div className="form__input__container__warn">
                      {formik.touched.district && formik.errors.district ? (
                        <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                          {formik.errors.district}
                        </Text>
                      ) : null}
                    </div>
                  </FormControl>
                </div>

                <div className="form__input form__input__flex">
                  {!owenerId ? (
                    <>
                      {" "}
                      <FormControl className="form__input__container">
                        <FormLabel>
                          <Text className="form__input__container__label">
                            Owner
                          </Text>
                          <Text className="form__input__container__desc">
                            choose owner is mandotry for create property{" "}
                          </Text>
                        </FormLabel>

                        <Select
                          name="propertyOwner"
                          value={formik.values.ownerId}
                          onChange={(e) => {
                            formik.handleChange(e.target.value);
                            setSelectedOwnerId(e.target.value);
                            setTimeout(() => {}, 0);
                          }}
                        >
                          <option value={0}>Select User Role</option>
                          {usersData?.users
                            .filter((s) => s.role == USER_ROLES.OWNER)
                            ?.map((i, index) => (
                              <option value={i.id} key={index}>
                                {i.firstNameEn}
                              </option>
                            ))}
                        </Select>
                      </FormControl>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="formWithTable_container__table">
                <Card>
                  <Card>
                    <CardBody>
                      <UnitsTable
                        data={units}
                        propOwenerId={owenerId ? owenerId : data?.ownerId}
                        propPropertyId={data?.id}
                      />
                    </CardBody>
                  </Card>
                </Card>
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

export default EditProperty;
