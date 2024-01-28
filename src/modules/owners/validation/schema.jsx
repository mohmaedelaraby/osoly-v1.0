import * as Yup from "yup";

export const ownerValidation = Yup.object({
  id: Yup.string().url().required("You should enter id"),
  name: Yup.string().required("You should enter name"),
});
