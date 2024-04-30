import { useFormik } from "formik";
import React, { useState } from "react";
import { adsValidation } from "../validation/schema";
import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import "../../../assets/styels/components/forms.scss";
import { useCreateAds } from "../hooks/useCreateAds";
import axios from "axios";

const CreateAd = () => { 
  const [selectedImage, setSelectedImage] = useState(null);
  const { mutate } = useCreateAds();
  const formData = new FormData();
  const initialValues = {
    title:"",
    subTitle:"",
    url: "",
    index:0
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: adsValidation,
    onSubmit: (values) => {
      formData.append('image', selectedImage);
     
      let ad = {...values , image:selectedImage.name }
      mutate({body:ad})
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="form">
      <div className="form__header">Create New Ad</div>

      <div className="form__input">
        <FormControl className="form__input__container">
          <FormLabel>
            <Text className="form__input__container__label fo_primary"> title </Text>
          </FormLabel>

          <Input
            name="title"
            type="text"
            className="form__input__container__input"
            placeholder="enter your title"
            value={formik.values.title}
            onChange={formik.handleChange}
            isInvalid={formik.touched.title && !!formik.errors.title}
          />

          <div className="form__input__container__warn">
            {formik.touched.title && formik.errors.title ? (
              <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                {formik.errors.title}
              </Text>
            ) : null}
          </div>
        </FormControl>
      </div>

      <div className="form__input">
        <FormControl className="form__input__container">
          <FormLabel>
            <Text className="form__input__container__label fo_primary"> sub Title </Text>
          </FormLabel>

          <Input
            name="subTitle"
            type="text"
            className="form__input__container__input"
            placeholder="enter your subTitle"
            value={formik.values.subTitle}
            onChange={formik.handleChange}
            isInvalid={formik.touched.subTitle && !!formik.errors.subTitle}
          />

          <div className="form__input__container__warn">
            {formik.touched.subTitle && formik.errors.subTitle ? (
              <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                {formik.errors.subTitle}
              </Text>
            ) : null}
          </div>
        </FormControl>
      </div>
      <div className="form__input">
        <FormControl className="form__input__container">
          <FormLabel>
            <Text className="form__input__container__label fo_primary"> Url </Text>
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
            <Text className="form__input__container__label fo_primary"> Index </Text>
          </FormLabel>

          <Input
            name="index"
            type="number"
            className="form__input__container__input"
            placeholder="enter your index"
            value={formik.values.index}
            onChange={formik.handleChange}
            isInvalid={formik.touched.index && !!formik.errors.index}
          />

          <div className="form__input__container__warn">
            {formik.touched.index && formik.errors.index ? (
              <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                {formik.errors.index}
              </Text>
            ) : null}
          </div>
        </FormControl>
      </div>

      <div className="form__input">
        <FormControl className="form__input__container">
          <FormLabel>
            <Text className="form__input__container__label fo_primary"> Image </Text>
          </FormLabel>

          {!selectedImage && (
            <div>
              <Input
                className="form__input__container__uploadFile"
                type="file"
                name="image"
                accept=".png, .jpg, .jpeg"
                onChange={(event) => {
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
        Create
        </Button>
      </div>
    </form>
  );
};

export default CreateAd;
