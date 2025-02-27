import * as Yup from "yup";

export const unitsValidation = Yup.object({
  name: Yup.string().required(""),
  rent: Yup.number().required(""),
  rentCollectionDate: Yup.string().required(""),
  electricityAccount: Yup.string().matches(/^[0-9]+$/, "general.only_num").min(11 , "errors.password_eleven").max(11 , "errors.password_eleven").required(""),
  waterAccount: Yup.string().matches(/^[0-9]+$/, "general.only_num").min(10 , "errors.password_ten").max(10 , "errors.password_ten").required(""),
  address: Yup.string().notRequired(""),
  space: Yup.number().notRequired(""),
  rooms: Yup.number().notRequired(""),
  bathrooms: Yup.number().notRequired(""),
  conditioners: Yup.number().notRequired(""),
  maintenanceMan: Yup.string().required(""),
  tenantId: Yup.string().notRequired(""),
  rentCollectionRate: Yup.string().required(""),
  image: Yup.mixed().notRequired("")
});

