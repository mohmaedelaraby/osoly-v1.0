import * as Yup from "yup";

export const loginValidation = Yup.object({
  username: Yup.string().required("يرجي ادخال اسم المستخدم"),
  password: Yup.string().min(8 , "الرقم السري غير صحيح").required("يرجي ادخال الرقم السري"),
});
