import * as Yup from "yup";

export const userEditValidation = Yup.object({
  firstNameEn: Yup.string().required("You should enter first name"),
  lastNameEn: Yup.string().required("You should enter last name"),
  firstNameAr: Yup.string().required("يجب ادخال اسمك الاول"),
  lastNameAr: Yup.string().required("يجب ادخال اسمك الاخير"),
});
export const userCreateValidation = Yup.object({
  firstNameEn: Yup.string().required("You should enter first name"),
  lastNameEn: Yup.string().required("You should enter last name"),
  firstNameAr: Yup.string().required("يجب ادخال اسمك الاول"),
  lastNameAr: Yup.string().required("يجب ادخال اسمك الاخير"),
  password: Yup.string().min(8).required("You should enter password"),
  phoneNumber: Yup.string().required("You should enter phone number"),
  role: Yup.string().required("You should enter role"),
  email: Yup.string().email().required("You should enter email"),
});
