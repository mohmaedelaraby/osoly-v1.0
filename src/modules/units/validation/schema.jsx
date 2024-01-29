import * as Yup from "yup";

export const unitsValidation = Yup.object({
  id: Yup.string().url().required("You should enter id"),
  name: Yup.string().required("You should enter name"),
  price: Yup.string().required("You should enter price"),
});
