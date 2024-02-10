import * as Yup from "yup";

export const unitsValidation = Yup.object({
  name: Yup.string().required("You should enter name"),
  rent: Yup.string().required("You should enter rent"),
  rentCollectionDate: Yup.string().required("You should enter rentCollectionDate"),
  electricityAccount: Yup.string().required("You should enter electricityAccount"),
  waterAccount: Yup.string().required("You should enter waterAccount"),
  address: Yup.string().required("You should enter address"),
  space: Yup.string().required("You should enter space"),
  rooms: Yup.string().required("You should enter rooms"),
  bathrooms: Yup.string().required("You should enter bathrooms"),
  lounge: Yup.boolean().required("You should enter lounge"),
  conditioners: Yup.string().required("You should enter conditioners"),
  kitchen: Yup.string().required("You should enter kitchen"),
});
