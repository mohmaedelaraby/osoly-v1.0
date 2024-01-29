import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import { useLocation } from "react-router-dom";
import { ownerValidation } from "../validation/schema";
import PropertyTable from "../../propreties/templete/PropertiesTable";

const EditOwner = () => {
  const { state } = useLocation();
  const { id, name } = state;

  const initialValues = {
    id: `${id}`,
    name: name,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ownerValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <Card className="from__card">
        <CardBody>
          <form onSubmit={formik.handleSubmit} className="form">
            <div className="form__header">Edit Owner</div>
            <div className="formWithTable_container">
              <div className="formWithTable_container__form">
                <div className="form__input">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label">ID</Text>
                    </FormLabel>

                    <Input
                      name="id"
                      type="text"
                      className="form__input__container__input"
                      placeholder="enter your id"
                      value={formik.values.id}
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.id && !!formik.errors.id}
                    />

                    <div className="form__input__container__warn">
                      {formik.touched.id && formik.errors.id ? (
                        <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                          {formik.errors.id}
                        </Text>
                      ) : null}
                    </div>
                  </FormControl>
                </div>

                <div className="form__input">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label">
                        Name
                      </Text>
                    </FormLabel>

                    <Input
                      name="name"
                      type="text"
                      className="form__input__container__input"
                      placeholder="enter your name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.name && !!formik.errors.name}
                    />

                    <div className="form__input__container__warn">
                      {formik.touched.name && formik.errors.name ? (
                        <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                          {formik.errors.name}
                        </Text>
                      ) : null}
                    </div>
                  </FormControl>
                </div>
              </div>

              <div className="formWithTable_container__table">
                <Card>
                  <CardBody>
                    <PropertyTable/>
                  </CardBody>
                </Card>
              </div>
            </div>
            <div className="form__btn__container">
            <Button className="form__btn " type="submit">
              Edit 
            </Button>
            <Button className="form__btn form__btn__delete ">
              Delete
            </Button>
          </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default EditOwner;
