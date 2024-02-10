import * as Yup from "yup";

export const adsValidation = Yup.object({
  url: Yup.string().url().required("You should enter URL"),
  content: Yup.string().required("You should enter Content"),
  index: Yup.number().required("You should enter index"),
});
