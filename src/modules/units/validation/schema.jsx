import * as Yup from "yup";

export const unitsValidation = Yup.object({
  name: Yup.string().notRequired(""),
  rent: Yup.number().notRequired(""),
  rentCollectionDate: Yup.string().notRequired(""),
  electricityAccount: Yup.string().min(11 , "errors.password_eleven").notRequired(""),
  waterAccount: Yup.string().min(10 , "errors.password_ten").max(10 , "errors.password_ten").notRequired(""),
  address: Yup.string().notRequired(""),
  space: Yup.number().notRequired(""),
  rooms: Yup.number().notRequired(""),
  bathrooms: Yup.number().notRequired(""),
  conditioners: Yup.number().notRequired(""),
  maintenanceMan: Yup.string().notRequired(""),
  tenantId: Yup.string().notRequired(""),
  image: Yup.mixed().notRequired("")
  
});

