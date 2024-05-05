import * as Yup from "yup";

export const unitsValidation = Yup.object({
  name: Yup.string().required("errors.name"),
  rent: Yup.number().required("errors.rent"),
  rentCollectionDate: Yup.string().required("errors.rentCollectionDate"),
  electricityAccount: Yup.string().required("errors.electricityAccount"),
  waterAccount: Yup.string().required("errors.waterAccount"),
  address: Yup.string().required("errors.address"),
  space: Yup.number().required("errors.space"),
  rooms: Yup.number().required("errors.rooms"),
  bathrooms: Yup.number().required("errors.bathrooms"),
  conditioners: Yup.number().required("errors.conditioners"),
  maintenanceMan: Yup.string().required("errors.maintenanceMan"),
  tenantId: Yup.string().required("errors.tenantId"),
  image: Yup.mixed().required("errors.image")
  
});

