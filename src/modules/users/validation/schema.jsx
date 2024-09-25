import * as Yup from "yup";

export const userEditValidation = Yup.object({
  firstNameEn: Yup.string().required("errors.name"),
  lastNameEn: Yup.string().required("errors.name"),
  firstNameAr: Yup.string().required("errors.name"),
  lastNameAr: Yup.string().required("errors.name"),
  phoneNumber: Yup.string().matches(/^0(5)[0-9\d]{8}$/, "errors.phone_five").matches(/^[0-9]+$/, "general.only_num").required("errors.phone"),
  email: Yup.string().email().required("errors.email"),
});
export const userCreateValidation = Yup.object({
  firstNameEn: Yup.string().required("errors.name"),
  lastNameEn: Yup.string().required("You should enter last name"),
  firstNameAr: Yup.string().required("errors.name"),
  lastNameAr: Yup.string().required("errors.name"),
  password: Yup.string().min(8 , "errors.password_eight").required("errors.password"),
  phoneNumber: Yup.string().matches(/^0(5)[0-9\d]{8}$/, "errors.phone_five").matches(/^[0-9]+$/, "general.only_num").required("errors.phone"),
  role: Yup.string().required("errors.role"),
  email: Yup.string().email().required("errors.email"),
  identityId: Yup.string().matches(/^[0-9]+$/, "general.only_num").min(10 , "errors.password_ten").max(10 , "errors.password_ten").required("errors.identityNumber"),
});
export const ownerEditValidation = Yup.object({
  firstNameEn: Yup.string().required("errors.name"),
  lastNameEn: Yup.string().required("errors.name"),
  firstNameAr: Yup.string().required("errors.name"),
  lastNameAr: Yup.string().required("errors.name"),
  phoneNumber: Yup.string().matches(/^0(5)[0-9\d]{8}$/, "errors.phone_five").matches(/^[0-9]+$/, "general.only_num").required("errors.phone"),
  email: Yup.string().email().required("errors.email"),
});

export const ownerCreateValidation = Yup.object({
  firstNameEn: Yup.string().required("errors.name"),
  lastNameEn: Yup.string().required("You should enter last name"),
  firstNameAr: Yup.string().required("errors.name"),
  lastNameAr: Yup.string().required("errors.name"),
  password: Yup.string().min(8 , "errors.password_eight").required("errors.password"),
  phoneNumber: Yup.string().matches(/^0(5)[0-9\d]{8}$/, "errors.phone_five").matches(/^[0-9]+$/, "general.only_num").required("errors.phone"),
  role: Yup.string().required("errors.role"),
  email: Yup.string().email().required("errors.email"),
  identityId: Yup.string().matches(/^[0-9]+$/, "general.only_num").min(10 , "errors.password_ten").max(10 , "errors.password_ten").required("errors.identityNumber"),
  contractNumber: Yup.string().matches(/^[0-9]+$/, "general.only_num").min(10 , "errors.password_ten").max(10 , "errors.password_ten").required("errors.contractNumber"),
});

export const DeleteUserPreviewValidation = Yup.object({
  userName: Yup.string().required("errors.name"),
});

