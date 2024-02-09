import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { userEditValidation } from "../validation/schema";

const EditUser = () => {
  const { state } = useLocation();
  const { id ,firstNameEn ,lastNameEn ,firstNameAr , lastNameAr} = state;

  const { mutate } = useUpdateUser();
  const { data, isLoading, refetch } = useGetUser(id);
  useEffect(() => {
    refetch();
  }, []);
  if(data){console.log("first")}
  const initialValues = {
    firstNameEn: firstNameEn,
    lastNameEn: lastNameEn,
    firstNameAr: firstNameAr,
    lastNameAr: lastNameAr,
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: userEditValidation,
    onSubmit: (values) => {
     mutate({id:id,body:values})
    },
  });

  return (
    <>
      {data && !isLoading ? (
        <>
          <Card className="from__card ">
            <CardBody>
              <form onSubmit={formik.handleSubmit} className="form">
                <div className="form__header">Edit User</div>

                <div className="form__input form__input__flex">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label rtl">
                        اسمك الاول
                      </Text>
                    </FormLabel>

                    <Input
                      name="firstNameAr"
                      type="text"
                      className="form__input__container__input"
                      placeholder="ادخل اسمك الاول باللغه العربيه"
                      dir="rtl"
                      value={formik.values.firstNameAr}
                      onChange={formik.handleChange}
                      isInvalid={
                        formik.touched.firstNameAr &&
                        !!formik.errors.firstNameAr
                      }
                    />

                    <div className="form__input__container__warn">
                      {formik.touched.firstNameAr &&
                      formik.errors.firstNameAr ? (
                        <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                          {formik.errors.firstNameAr}
                        </Text>
                      ) : null}
                    </div>
                  </FormControl>

                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label rtl">
                        اسمك الاخير
                      </Text>
                    </FormLabel>

                    <Input
                      name="lastNameAr"
                      type="text"
                      className="form__input__container__input"
                      dir="rtl"
                      placeholder="ادخل اسمك الاخير باللغه العربيه"
                      value={formik.values.lastNameAr}
                      onChange={formik.handleChange}
                      isInvalid={
                        formik.touched.lastNameAr && !!formik.errors.lastNameAr
                      }
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
                      <Text className="form__input__container__label rtl">
                        First Name (EN)
                      </Text>
                    </FormLabel>

                    <Input
                      name="firstNameEn"
                      type="text"
                      className="form__input__container__input"
                      placeholder="Please enter your first name "
                      value={formik.values.firstNameEn}
                      onChange={formik.handleChange}
                      isInvalid={
                        formik.touched.firstNameEn &&
                        !!formik.errors.firstNameEn
                      }
                    />

                    <div className="form__input__container__warn">
                      {formik.touched.firstNameEn &&
                      formik.errors.firstNameEn ? (
                        <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                          {formik.errors.firstNameEn}
                        </Text>
                      ) : null}
                    </div>
                  </FormControl>

                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label">
                        Last Name (EN)
                      </Text>
                    </FormLabel>

                    <Input
                      name="lastNameEn"
                      type="text"
                      className="form__input__container__input"
                      placeholder="enter your last name in En"
                      value={formik.values.lastNameEn}
                      onChange={formik.handleChange}
                      isInvalid={
                        formik.touched.lastNameEn && !!formik.errors.lastNameEn
                      }
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

                <hr className="hr_style" />

                <div className="form__input form__input__flex">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label">
                        Password
                      </Text>
                    </FormLabel>

                    <Input
                      name="password"
                      type="text"
                      className="form__input__container__input"
                      placeholder="enter your Password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      isInvalid={
                        formik.touched.password && !!formik.errors.password
                      }
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
      ) : (
        <></>
      )}
    </>
  );
};

export default EditUser;
