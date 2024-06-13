import * as Yup from "yup";

export const unitsValidation = Yup.object({
  name: Yup.string().notRequired(""),
  rent: Yup.number().notRequired(""),
  rentCollectionDate: Yup.string().notRequired(""),
  electricityAccount: Yup.string().notRequired(""),
  waterAccount: Yup.string().notRequired(""),
  address: Yup.string().notRequired(""),
  space: Yup.number().notRequired(""),
  rooms: Yup.number().notRequired(""),
  bathrooms: Yup.number().notRequired(""),
  conditioners: Yup.number().notRequired(""),
  maintenanceMan: Yup.string().notRequired(""),
  tenantId: Yup.string().notRequired(""),
  image: Yup.mixed().notRequired("")
  
});

