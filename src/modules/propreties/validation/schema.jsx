import * as Yup from "yup";

export const propertyValidation = Yup.object({
  id: Yup.string().url().required("You should enter id"),
  name: Yup.string().required("You should enter name"),
  desc: Yup.string().required("You should enter desc"),
});
