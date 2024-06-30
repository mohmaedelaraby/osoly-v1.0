import * as Yup from "yup";

export const userEditValidation = Yup.object({
  firstNameEn: Yup.string().required("errors.name"),
  lastNameEn: Yup.string().required("errors.name"),
  firstNameAr: Yup.string().required("errors.name"),
  lastNameAr: Yup.string().required("errors.name"),
  phoneNumber: Yup.string().min(9 , "errors.password_ten").max(10 , "errors.password_ten").required("errors.phone"),
  email: Yup.string().email().required("errors.email"),
});
export const userCreateValidation = Yup.object({
  firstNameEn: Yup.string().required("errors.name"),
  lastNameEn: Yup.string().required("You should enter last name"),
  firstNameAr: Yup.string().required("errors.name"),
  lastNameAr: Yup.string().required("errors.name"),
  password: Yup.string().min(8 , "errors.password_eight").required("errors.password"),
  phoneNumber: Yup.string().min(9 , "errors.password_ten").max(10 , "errors.password_ten").required("errors.phone"),
  role: Yup.string().required("errors.role"),
  email: Yup.string().email().required("errors.email"),
  identityId: Yup.string().min(12 , "errors.password_tweleve").max(12 , "errors.password_tweleve").required("errors.identityNumber"),
});
export const ownerEditValidation = Yup.object({
  firstNameEn: Yup.string().required("errors.name"),
  lastNameEn: Yup.string().required("errors.name"),
  firstNameAr: Yup.string().required("errors.name"),
  lastNameAr: Yup.string().required("errors.name"),
  phoneNumber: Yup.string().min(9 , "errors.password_ten").max(10 , "errors.password_ten").required("errors.phone"),
  email: Yup.string().email().required("errors.email"),
});

export const ownerCreateValidation = Yup.object({
  firstNameEn: Yup.string().required("errors.name"),
  lastNameEn: Yup.string().required("You should enter last name"),
  firstNameAr: Yup.string().required("errors.name"),
  lastNameAr: Yup.string().required("errors.name"),
  password: Yup.string().min(8 , "errors.password_eight").required("errors.password"),
  phoneNumber: Yup.string().min(9 , "errors.password_ten").max(10 , "errors.password_ten").required("errors.phone"),
  role: Yup.string().required("errors.role"),
  email: Yup.string().email().required("errors.email"),
  identityId: Yup.string().min(12 , "errors.password_tweleve").max(12 , "errors.password_tweleve").required("errors.identityNumber"),
  contractNumber: Yup.string().min(10 , "errors.password_ten").max(10 , "errors.password_ten").required("errors.contractNumber"),
});


