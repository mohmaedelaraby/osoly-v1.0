import { useFormik } from "formik";
import React from "react";
import { userCreateValidation } from "../validation/schema";
import {
  Button,
  FormControl,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import "../../../assets/styels/components/forms.scss";
import { useCreateUser } from "../hooks/useCreateUsers";
import { USER_ROLES } from "../../../enums/UserRoles";
import close from "../../../assets/icons-svgs/close.svg";


const CreateUser = ({onClose}) => {

  const { mutate } = useCreateUser();
  const initialValues = {
    name: "",
    password: "",
    phoneNumber:"",
    email: "",
    nationltyId: "",
    unitName: "",
    role: USER_ROLES.TENANT
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
        <div className="from__card from__card__full">
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="form__header">
          <div className="form__header_text">إضافة مستأجر جديد</div>
          <div className="form__header_close">
            <img src={close} alt="" width="40px" onClick={onClose} />
          </div>
        </div>

        <div className="form__input form__input__flex">
          <FormControl className="form__input__container">
            <Input
              name="name"
              size="lg"
              type="text"
              className="form__input__container__input"
              placeholder="اسم المؤسس "
              _placeholder={{color:'#77797E'}}
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
            <Input
              name="name"
              size="lg"
              type="text"
              className="form__input__container__input"
              placeholder="البريد الإلكتروني  "
              _placeholder={{color:'#77797E'}}
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
            <Input
              name="name"
              size="lg"
              type="text"
              className="form__input__container__input"
              placeholder="رقم الجوال"
              _placeholder={{color:'#77797E'}}
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

        

        <div className="form__input form__input__flex">
          <FormControl className="form__input__container">
            <Input
              name="name"
              size="lg"
              type="text"
              className="form__input__container__input"
              placeholder="رقم العقار "
              _placeholder={{color:'#77797E'}}
              value={formik.values.unitName}
              onChange={formik.handleChange}
              isInvalid={formik.touched.unitName && !!formik.errors.unitName}
            />

            <div className="form__input__container__warn">
              {formik.touched.unitName && formik.errors.unitName ? (
                <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                  {formik.errors.unitName}
                </Text>
              ) : null}
            </div>
          </FormControl>

         
        </div>
      

        <div className="form__btn__container">
          <Stack direction="row" width="100%" justify="space-between">
            <Button
              padding="0px 49px"
              variant="solid"
              color="white"
              bg="#194C81"
              type="submit"
            >
              اضافه
            </Button>
            <Button
              onClick={onClose}
              padding="0px 26px"
              color={"#010B38"}
              variant="outline"
            >
              الغاء
            </Button>
          </Stack>
        </div>
      </form>
    </div>
    </div>
  );
};

export default CreateUser;
