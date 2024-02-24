import * as Yup from "yup";

export const unitsValidation = Yup.object({
  name: Yup.string().required("You should enter name"),
  rent: Yup.number().required("You should enter rent"),
  rentCollectionDate: Yup.string().required("You should enter rentCollectionDate"),
  electricityAccount: Yup.string().required("You should enter electricityAccount"),
  waterAccount: Yup.string().required("You should enter waterAccount"),
  address: Yup.string().required("You should enter address"),
  space: Yup.number().required("You should enter space"),
  rooms: Yup.number().required("You should enter rooms"),
  bathrooms: Yup.number().required("You should enter bathrooms"),
  conditioners: Yup.number().required("You should enter conditioners"),
  waterCost: Yup.number().required("You should enter conditioners"),
});
