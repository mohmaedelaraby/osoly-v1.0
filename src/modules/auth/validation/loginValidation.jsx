import * as Yup from "yup";

export const loginValidation = Yup.object({
  username: Yup.string().required("Please enter an username"),
  password: Yup.string().min(8).required("Please enter your password"),
});
