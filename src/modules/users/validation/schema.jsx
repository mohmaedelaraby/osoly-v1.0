import * as Yup from "yup";

export const userValidation = Yup.object({
  name: Yup.string().url().required("You should enter name"),
  email: Yup.string().required("You should enter email"),
});
