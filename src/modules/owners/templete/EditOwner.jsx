import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import { useLocation } from "react-router-dom";
import { ownerValidation } from "../validation/schema";
import PropertyTable from "../../propreties/templete/PropertiesTable";

const EditOwner = () => {
  const { state } = useLocation();
  const { id, name } = state;
  const { isOpen, onOpen, onClose } = useDisclosure();


  const initialValues = {
    phoneNumber: "",
    password: "",
    email: "",
    firstNameEn: "",
    lastNameEn: "",
    firstNameAr: "",
    lastNameAr: "",
    role: ""
}


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ownerValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
       <Card className="from__card ">
      <CardBody>
        <form onSubmit={formik.handleSubmit} className="form">
          <div className="form__header">Edit Owner</div>

          <div className="form__input form__input__flex">
            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label rtl">اسمك الاول</Text>
              </FormLabel>

              <Input
                name="firstNameAr"
                type="text"
                className="form__input__container__input"
                placeholder="ادخل اسمك الاول باللغه العربيه"
                dir="rtl"
                value={formik.values.firstNameAr}
                onChange={formik.handleChange}
                isInvalid={formik.touched.firstNameAr && !!formik.errors.firstNameAr}
              />

              <div className="form__input__container__warn">
                {formik.touched.firstNameAr && formik.errors.firstNameAr ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {formik.errors.firstNameAr}
                  </Text>
                ) : null}
              </div>
            </FormControl>

            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label rtl"> اسمك الاخير </Text>
              </FormLabel>

              <Input
                name="lastNameAr"
                type="text"
                className="form__input__container__input"
                dir="rtl"
                placeholder="ادخل اسمك الاخير باللغه العربيه"
                value={formik.values.lastNameAr}
                onChange={formik.handleChange}
                isInvalid={formik.touched.lastNameAr && !!formik.errors.lastNameAr}
              />

              <div classeName="form__input__container__warn">
                {formik.touched.lastNameAr && formik.errors.lastNameAr ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {formik.errors.lastNameAr}
                  </Text>
                ) : null}
              </div>
            </FormControl>
          </div>

          <div className="form__input form__input__flex">
            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label">First Name (Ar) </Text>
              </FormLabel>

              <Input
                name="firstNameEn"
                type="text"
                className="form__input__container__input"
                placeholder="enter your first name in En"
                value={formik.values.firstNameEn}
                onChange={formik.handleChange}
                isInvalid={formik.touched.firstNameEn && !!formik.errors.firstNameEn}
              />

              <div className="form__input__container__warn">
                {formik.touched.firstNameEn && formik.errors.firstNameEn ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {formik.errors.firstNameEn}
                  </Text>
                ) : null}
              </div>
            </FormControl>

            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label"> Last Name (Ar) </Text>
              </FormLabel>

              <Input
                name="lastNameEn"
                type="text"
                className="form__input__container__input"
                placeholder="enter your last name in En"
                value={formik.values.lastNameEn}
                onChange={formik.handleChange}
                isInvalid={formik.touched.lastNameEn && !!formik.errors.lastNameEn}
              />

              <div classeName="form__input__container__warn">
                {formik.touched.lastNameEn && formik.errors.lastNameEn ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {formik.errors.lastNameEn}
                  </Text>
                ) : null}
              </div>
            </FormControl>
          </div>

          <hr className="hr_style"/>

          <div className="form__input form__input__flex">
            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label">Email </Text>
              </FormLabel>

              <Input
                name="email"
                type="text"
                className="form__input__container__input"
                placeholder="enter your Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                isInvalid={formik.touched.email && !!formik.errors.email}
              />

              <div className="form__input__container__warn">
                {formik.touched.email && formik.errors.email ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {formik.errors.email}
                  </Text>
                ) : null}
              </div>
            </FormControl>

            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label"> Password </Text>
              </FormLabel>

              <Input
                name="password"
                type="text"
                className="form__input__container__input"
                placeholder="enter your Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                isInvalid={formik.touched.password && !!formik.errors.password}
              />

              <div classeName="form__input__container__warn">
                {formik.touched.password && formik.errors.password ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {formik.errors.password}
                  </Text>
                ) : null}
              </div>
            </FormControl>
          </div>
          
          <div className="form__input form__input__flex">
            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label">Phone Number </Text>
              </FormLabel>

              <Input
                name="phoneNumber"
                type="text"
                className="form__input__container__input"
                placeholder="enter your Phone Number"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                isInvalid={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
              />

              <div className="form__input__container__warn">
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {formik.errors.phoneNumber}
                  </Text>
                ) : null}
              </div>
            </FormControl>

            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label"> Role </Text>
              </FormLabel>

              <Input
                name="role"
                type="text"
                className="form__input__container__input"
                placeholder="enter your Role"
                value={formik.values.role}
                onChange={formik.handleChange}
                isInvalid={formik.touched.role && !!formik.errors.role}
              />

              <div classeName="form__input__container__warn">
                {formik.touched.role && formik.errors.role ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {formik.errors.role}
                  </Text>
                ) : null}
              </div>
            </FormControl>
          </div>

          <div className="formWithTable_container__table">
               
                    <Card>
                      <Card>
                        <CardBody>
                          <PropertyTable/>
                        </CardBody>
                      </Card>
                    </Card>
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalBody>
                          <>create build</>
                        </ModalBody>
                      </ModalContent>
                    </Modal>
               
              </div>

          <div className="form__btn__container">
            <Button className="form__btn " type="submit">
              Edit 
            </Button>
            <Button className="form__btn form__btn__delete ">
              Delete
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
    </>
  );
};

export default EditOwner;
