import * as Yup from "yup";

export const loginValidation = Yup.object({
  username: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
  password: Yup.string().min(8).required("Please enter your password"),
});
