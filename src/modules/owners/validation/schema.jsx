
import * as Yup from "yup";

export const ownerValidation = Yup.object({
  firstNameEn: Yup.string().url().required("You should enter first name"),
  email: Yup.string().required("You should enter email"),
  phoneNumber: Yup.string().required("You should enter phoneNumber"),
  lastNameEn: Yup.string().required("You should enter last name"),
  firstNameAr: Yup.string().required("يجب ادخال اسمك الاول"),
  lastNameAr: Yup.string().required("يجب ادخال اسمك الاخير"),
  password: Yup.string().min(8).required("You should enter password"),
  role: Yup.string().required("You should enter role"),
});
