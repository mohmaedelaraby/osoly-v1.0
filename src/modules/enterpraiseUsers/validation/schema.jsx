import * as Yup from "yup";

export const userEnterpraiseValidation = Yup.object({
  name: Yup.string().url().required("errors.name"),
  password: Yup.string().min(8 , "errors.password_eight").required("errors.password"),
});

export const userEnterpraiseValidationCreate = Yup.object({
  username: Yup.string().required("errors.name"),
  password: Yup.string().min(8 , "errors.password_eight").required("errors.password"),
});
export const userEnterpraiseValidationEdit = Yup.object({
  username: Yup.string().required("errors.name"),
});
