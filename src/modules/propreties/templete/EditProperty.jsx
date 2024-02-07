import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import { useLocation } from "react-router-dom";
import {  propertyValidation } from "../validation/schema";
import UnitsTable from "../../units/templete/UnitsTable";

const EditProperty = () => {
  const { state } = useLocation();
  const { id, name, desc } = state;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialValues = {
    name:"",
    address: "",
    unitsCount: "",
    instrumentNumber: "",
    postalCode: "",
    blockNumber: "",
    street: "",
    subNumber: "",
    district: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: propertyValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <Card className="from__card">
        <CardBody>
          <form onSubmit={formik.handleSubmit} className="form">
            <div className="form__header">Edit Proprety</div>
            <div className="formWithTable_container">
              <div className="from__card from__card__full">
              <div className="form__input form__input__flex">
            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label"> Name </Text>
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
                <Text className="form__input__container__label"> Address </Text>
              </FormLabel>

              <Input
                name="address"
                type="text"
                className="form__input__container__input"
                placeholder="enter your name"
                value={formik.values.address}
                onChange={formik.handleChange}
                isInvalid={formik.touched.address && !!formik.errors.address}
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
                <Text className="form__input__container__label"> street </Text>
              </FormLabel>

              <Input
                name="street"
                type="text"
                className="form__input__container__input"
                placeholder="enter your street"
                value={formik.values.street}
                onChange={formik.handleChange}
                isInvalid={formik.touched.street && !!formik.errors.street}
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
                <Text className="form__input__container__label"> units count </Text>
              </FormLabel>

              <Input
                name="unitsCount"
                type="text"
                className="form__input__container__input"
                placeholder="enter your name"
                value={formik.values.unitsCount}
                onChange={formik.handleChange}
                isInvalid={formik.touched.unitsCount && !!formik.errors.unitsCount}
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
                <Text className="form__input__container__label"> Instrument Number </Text>
              </FormLabel>

              <Input
                name="instrumentNumber"
                type="text"
                className="form__input__container__input"
                placeholder="enter your instrumentNumber"
                value={formik.values.instrumentNumber}
                onChange={formik.handleChange}
                isInvalid={formik.touched.instrumentNumber && !!formik.errors.instrumentNumber}
              />

              <div className="form__input__container__warn">
                {formik.touched.instrumentNumber && formik.errors.instrumentNumber ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {formik.errors.instrumentNumber}
                  </Text>
                ) : null}
              </div>
            </FormControl>

            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label"> Postal Code </Text>
              </FormLabel>

              <Input
                name="postalCode"
                type="text"
                className="form__input__container__input"
                placeholder="enter your postalCode"
                value={formik.values.postalCode}
                onChange={formik.handleChange}
                isInvalid={formik.touched.postalCode && !!formik.errors.postalCode}
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
                <Text className="form__input__container__label"> Block Number </Text>
              </FormLabel>

              <Input
                name="blockNumber"
                type="text"
                className="form__input__container__input"
                placeholder="enter your name"
                value={formik.values.blockNumber}
                onChange={formik.handleChange}
                isInvalid={formik.touched.blockNumber && !!formik.errors.blockNumber}
              />

              <div className="form__input__container__warn">
                {formik.touched.blockNumber && formik.errors.blockNumber ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {formik.errors.blockNumber}
                  </Text>
                ) : null}
              </div>
            </FormControl>

            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label"> Sub Number </Text>
              </FormLabel>

              <Input
                name="subNumber"
                type="text"
                className="form__input__container__input"
                placeholder="enter your subNumber"
                value={formik.values.subNumber}
                onChange={formik.handleChange}
                isInvalid={formik.touched.subNumber && !!formik.errors.subNumber}
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
              </div>

              <div className="formWithTable_container__table">
              
                    <Card>
                      <Card>
                        <CardBody>
                          <UnitsTable/>
                        </CardBody>
                      </Card>
                    </Card>
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalCloseButton />
                        <ModalBody>
                          <>create build</>
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                 
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