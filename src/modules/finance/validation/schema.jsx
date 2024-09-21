import * as Yup from "yup";

export const createFinanceValidation = Yup.object({

  contractLimit: Yup.string().url().required("errors.requierd"),
  ownerName: Yup.string().url().required("errors.requierd"),
  ownerNationalId: Yup.string().url().required("errors.requierd"),
  renter: Yup.string().url().required("errors.requierd"),
  contractsNumber: Yup.string().url().required("errors.requierd"),
  commetion: Yup.string().url().required("errors.requierd"),
  nationalty: Yup.string().url().required("errors.requierd"),
});

