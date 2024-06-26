import { useFormik } from 'formik';
import React from 'react'
import { Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { USER_ROLES } from '../../../enums/UserRoles';
import { useCreateUser } from '../../users/hooks/useCreateUsers';
import { userCreateValidation } from '../../users/validation/schema';

const CreateOwner =()=> {
  const { mutate } = useCreateUser();
  const initialValues = {
    phoneNumber: "",
    password: "",
    email: "",
    firstNameEn: "",
    lastNameEn: "",
    firstNameAr: "",
    lastNameAr: "",
    role: USER_ROLES.OWNER
}

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: userCreateValidation,
    onSubmit: (values) => {
      mutate({body:values})
    },
  });
  return (
    <div className="from__card from__card__full">
    <form onSubmit={formik.handleSubmit} className="form">
      <div className="form__header">Create Owner</div>

      <div className="form__input form__input__flex">
        <FormControl className="form__input__container">
          <FormLabel>
            <Text className="form__input__container__label fo_primary rtl">اسمك الاول</Text>
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
            <Text className="form__input__container__label fo_primary rtl"> اسمك الاخير </Text>
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
            <Text className="form__input__container__label fo_primary">First Name (EN) </Text>
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
            <Text className="form__input__container__label fo_primary"> Last Name (EN) </Text>
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
            <Text className="form__input__container__label fo_primary">Email </Text>
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
            <Text className="form__input__container__label fo_primary"> Password </Text>
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
            <Text className="form__input__container__label fo_primary">Phone Number </Text>
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

      </div>


      <div className="form__btn__container">
        <Button className="form__btn " type="submit">
          Create
        </Button>
      </div>
    </form>
</div>
  )
}

export default CreateOwner