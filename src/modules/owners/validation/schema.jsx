
import * as Yup from "yup";

export const ownerValidation = Yup.object({
  firstNameEn: Yup.string().url().required("errors.name"),
  email: Yup.string().required("errors.email"),
  phoneNumber: Yup.string().required("errors.phoneNumber"),
  lastNameEn: Yup.string().required("errors.last name"),
  firstNameAr: Yup.string().required("errors.name"),
  lastNameAr: Yup.string().required("errors.name"),
  password: Yup.string().min(8 , "errors.password_eight").required("errors.password"),
  role: Yup.string().required("errors.role"),
});
