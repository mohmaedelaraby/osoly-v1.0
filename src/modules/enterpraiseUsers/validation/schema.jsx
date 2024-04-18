import * as Yup from "yup";

export const userEnterpraiseValidation = Yup.object({
  name: Yup.string().url().required("You should enter  name"),
  password: Yup.string().required("You should enter your password"),
});

export const userEnterpraiseValidationCreate = Yup.object({
  username: Yup.string().required("You should enter  name"),
  password: Yup.string().required("You should enter your password"),
});
export const userEnterpraiseValidationEdit = Yup.object({
  username: Yup.string().required("You should enter  name"),
});
