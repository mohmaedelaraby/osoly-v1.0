import { useFormik } from "formik";
import React, { useState } from "react";
import { adsValidation } from "../validation/schema";
import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import "../../../assets/styels/components/forms.scss";

const CreateAd = () => {
  /* "image": "uploads/first.png",
  "content": "This ad for some unit",
  "url": "url.com",
  "index": 1 */
  /*   const [index, setIndex] = useState(0);
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(''); */
  const [selectedImage, setSelectedImage] = useState(null);

  const initialValues = {
    url: "",
    content: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: adsValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="form">
      <div className="form__header">Create New Ad</div>

      <div className="form__input">
        <FormControl className="form__input__container">
          <FormLabel>
            <Text className="form__input__container__label"> Url </Text>
          </FormLabel>

          <Input
            name="url"
            type="text"
            className="form__input__container__input"
            placeholder="enter your url"
            value={formik.values.url}
            onChange={formik.handleChange}
            isInvalid={formik.touched.url && !!formik.errors.url}
          />

          <div className="form__input__container__warn">
            {formik.touched.url && formik.errors.url ? (
              <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                {formik.errors.url}
              </Text>
            ) : null}
          </div>
        </FormControl>
      </div>

      <div className="form__input">
        <FormControl className="form__input__container">
          <FormLabel>
            <Text className="form__input__container__label"> Content </Text>
          </FormLabel>

          <Input
            name="content"
            type="text"
            className="form__input__container__input"
            placeholder="enter your content"
            value={formik.values.content}
            onChange={formik.handleChange}
            isInvalid={formik.touched.content && !!formik.errors.content}
          />

          <div className="form__input__container__warn">
            {formik.touched.content && formik.errors.content ? (
              <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                {formik.errors.content}
              </Text>
            ) : null}
          </div>
        </FormControl>
      </div>

      <div className="form__input">
        <FormControl className="form__input__container">
          <FormLabel>
            <Text className="form__input__container__label"> Image </Text>
          </FormLabel>

          {!selectedImage && (
            <div>
              <Input
                className="form__input__container__uploadFile"
                type="file"
                name="image"
                accept=".png, .jpg, .jpeg"
                onChange={(event) => {
                  console.log(event.target.files[0]);
                  setSelectedImage(event.target.files[0]);
                }}
              />
            </div>
          )}

          {selectedImage && (
            <div className="form__input__container__image">
              <img
                alt="not found"
                width={"250px"}
                src={URL.createObjectURL(selectedImage)}
              />
              <br />
              <button className="form__input__container__image__remove" onClick={() => setSelectedImage(null)}>Remove</button>
            </div>
          )}

          <div className="form__input__container__warn">
            {formik.touched.image && formik.errors.image ? (
              <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                {formik.errors.image}
              </Text>
            ) : null}
          </div>
        </FormControl>
      </div>

      <div className="form__btn__container">
        <Button className="form__btn " type="submit">
          Add Ad
        </Button>
      </div>
    </form>
  );
};

export default CreateAd;
