import * as Yup from "yup";

export const propertyCreateValidation = Yup.object({
  name: Yup.string().required("You should enter name"),
  address: Yup.string().required("You should enter address"),
  unitsCount: Yup.number().required("You should enter unitsCount"),
  instrumentNumber: Yup.string().required("You should enter instrumentNumber"),
  postalCode: Yup.string().required("You should enter postalCode"),
  blockNumber: Yup.string().required("You should enter blockNumber"),
  street: Yup.string().required("You should enter street"),
  subNumber: Yup.string().required("You should enter subNumber"),
  district: Yup.string().required("You should enter district"),
});
export const propertyEditValidation = Yup.object({
  name: Yup.string().required("You should enter name"),
  address: Yup.string().required("You should enter address"),
  unitsCount: Yup.string().required("You should enter unitsCount"),
  instrumentNumber: Yup.string().required("You should enter instrumentNumber"),
  postalCode: Yup.string().required("You should enter postalCode"),
  blockNumber: Yup.string().required("You should enter blockNumber"),
  street: Yup.string().required("You should enter street"),
  subNumber: Yup.string().required("You should enter subNumber"),
  district: Yup.string().required("You should enter district"),
});
