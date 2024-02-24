import * as Yup from "yup";

export const adsValidation = Yup.object({
  url: Yup.string().url().required("You should enter URL"),
  title: Yup.string().required("You should enter title"),
  subTitle: Yup.string().required("You should enter sub title"),
  index: Yup.number().required("You should enter index"),
});
