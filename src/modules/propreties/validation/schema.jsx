import * as Yup from "yup";

export const propertyCreateValidation = Yup.object({
  name: Yup.string().required("errors.name"),
  address: Yup.string().required("errors.address"),
  unitsCount: Yup.number().required("errors.unitsCount"),
  instrumentNumber: Yup.string().min(12 , "errors.password_tweleve").max(12 , "errors.password_tweleve").required("errors.instrumentNumber"),
  postalCode: Yup.string().required("errors.postalCode"),
  blockNumber: Yup.string().required("errors.blockNumber"),
  street: Yup.string().required("errors.street"),
  district: Yup.string().required("errors.district"),
  ownerId: Yup.string().required("errors.ownerId"),
  city: Yup.string().required("errors.city"),
  image: Yup.mixed().required("errors.image")});


export const propertyEditValidation = Yup.object({
  name: Yup.string().required("errors.name"),
  address: Yup.string().required("errors.address"),
  unitsCount: Yup.number().required("errors.unitsCount"),
  instrumentNumber: Yup.string().min(12 , "errors.password_tweleve").max(12 , "errors.password_tweleve").required("errors.instrumentNumber"),
  postalCode: Yup.string().required("errors.postalCode"),
  blockNumber: Yup.string().required("errors.blockNumber"),
  street: Yup.string().required("errors.street"),
  subNumber: Yup.string().required("errors.subNumber"),
  district: Yup.string().required("errors.district"),
  city: Yup.string().required("errors.city"),
});
