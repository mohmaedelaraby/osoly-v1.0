import * as Yup from "yup";

export const userEnterpraiseValidation = Yup.object({
  name: Yup.string().url().required("You should enter  name"),
  numOfUnits: Yup.string().required("You should enter number of units"),
  duration: Yup.string().required("You should choose your duration "),

});
