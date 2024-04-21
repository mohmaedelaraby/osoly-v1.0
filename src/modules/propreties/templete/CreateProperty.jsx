import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { propertyCreateValidation } from "../validation/schema";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import "../../../assets/styels/components/forms.scss";
import { useCreatePropertey } from "../hooks/useCreatePropertey";
import useUsers from "../../users/hooks/useUsers";
import { USER_ROLES } from "../../../enums/UserRoles";
import close from "../../../assets/icons-svgs/close.svg";
import bell from "../../../assets/images/bell.png";
import { AddIcon } from "@chakra-ui/icons";
import CreateUnit from "../../units/templete/CreateUnit";

const CreateProperty = ({ onClose, propOwenerId }) => {
  const [selectedOwnerId, setSelectedOwnerId] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const { usersData, usersRefetch } = useUsers({
    pageNo: 1,
    limit: 1000,
    count: 12,
  });
  useEffect(() => {
    usersRefetch();
  }, []);
  const { mutate } = useCreatePropertey();

  const initialValues = {
    name: "",
    address: "",
    unitsCount: "",
    instrumentNumber: "",
    postalCode: "",
    blockNumber: " ",
    street: " ",
    district: " ",
    city: " ",
    ownerId: " ",
    image: " ",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: propertyCreateValidation,
    onSubmit: (values) => {
      formik.values.ownerId = selectedOwnerId;
      formik.values.image = uploadImage(selectedImage);
      let data = {
        ...values,
      };
      console.log(data);
      mutate({ body: data });
    },
  });

  const {
    isOpen: isOpenUnitModal,
    onOpen: onOpenUnitModal,
    onClose: onCloseUnitModal,
  } = useDisclosure();

  const openUnitPopup = () => {
    onOpenUnitModal();
  };

  const uploadImage = (file) => {
    console.log(file);

    const formData = new FormData();

    if (file.name) {
      formData.append("image", file, file.name);
    } else {
      formData.append(
        "Image",
        file,
        Math.floor(Math.random() * 1000).toString() + ".png"
      );
    }
    /*  console.log(  formData,formData.entries())
    // Display the key/value pairs
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    } */
    return formData;
  };

  return (
    <>
      <div className="from__card from__card__full">
        <div className="from__card from__card__full">
          <form onSubmit={formik.handleSubmit} className="form">
            <div className="form__header">
              <div className="form__header_text">إضافة عقار جديد</div>
              <div className="form__header_close">
                <img src={close} alt="" width="40px" onClick={onClose} />
              </div>
            </div>

            <div className="form__input form__input__flex">
              {!selectedImage ? (
                <div className="form__input__flex_fileUpload">
                  <img src={bell} alt="" width={"66px"} />
                  <p className="form__input__flex_fileUpload_text">رفع صورة</p>
                  <p className="form__input__flex_fileUpload_desc">
                    يفضل ان يكون قياس الصورة 320X120
                  </p>
                  <Input
                    className="form__input__flex_fileUpload_input"
                    type="file"
                    name="image"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => {
                      setSelectedImage(e.target.files[0]);
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    padding: `${selectedImage ? "0px" : ""}`,
                    borderRadius: "12px",
                  }}
                  className="form__input__flex_fileUpload"
                >
                  <div className="form__input__flex_fileUpload_image">
                    <img
                      alt="not found"
                      width={"auto"}
                      height={"285px"}
                      src={URL.createObjectURL(selectedImage)}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="form__input form__input__flex">
              <FormControl className="form__input__container">
                <FormLabel>
                  <Text className="form__input__container__label">
                    اسم العقار
                  </Text>
                </FormLabel>
                <Input
                  name="name"
                  size="lg"
                  type="text"
                  className="form__input__container__input"
                  placeholder="اسم العقار  "
                  _placeholder={{ color: "#77797E" }}
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

            <div className="form__input form__input__flex">
              <FormControl className="form__input__container">
                <FormLabel>
                  <Text className="form__input__container__label">العنوان</Text>
                </FormLabel>
                <Input
                  name="address"
                  size="lg"
                  type="text"
                  className="form__input__container__input"
                  placeholder="العنوان"
                  _placeholder={{ color: "#77797E" }}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  isInvalid={formik.touched.address && !!formik.errors.address}
                />

                <div className="form__input__container__warn">
                  {formik.touched.address && formik.errors.address ? (
                    <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                      {formik.errors.address}
                    </Text>
                  ) : null}
                </div>
              </FormControl>
            </div>

            <div className="form__input form__input__flex">
              <FormControl className="form__input__container">
                <FormLabel>
                  <Text className="form__input__container__label">
                    مساحة العقار
                  </Text>
                </FormLabel>
                <InputGroup>
                  <Input
                    name="unitsCount"
                    size="lg"
                    type="text"
                    className="form__input__container__input"
                    placeholder="مساحة العقار   "
                    _placeholder={{ color: "#77797E" }}
                    value={formik.values.unitsCount}
                    padding={"8px"}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.unitsCount && !!formik.errors.unitsCount
                    }
                  />
                  <InputRightElement
                    color={"#77797E"}
                    width={"100px"}
                    height="100%"
                    justifyContent="center"
                    borderRadius={"12px"}
                  >
                    متر مربع
                  </InputRightElement>
                </InputGroup>

                <div className="form__input__container__warn">
                  {formik.touched.unitsCount && formik.errors.unitsCount ? (
                    <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                      {formik.errors.unitsCount}
                    </Text>
                  ) : null}
                </div>
              </FormControl>
            </div>

            <div className="form__input form__input__flex mb-24">
              <FormControl className="form__input__container">
                <FormLabel>
                  <Text className="form__input__container__label">
                    مالك العقار
                  </Text>
                </FormLabel>
                <Select
                  height={"56px"}
                  name="owner"
                  dir="rtl"
                  onChange={(e) => {
                    setSelectedOwnerId(e.target.value);
                    setTimeout(() => {}, 0);
                  }}
                >
                  <option value={0}>المالك </option>
                  {usersData?.users
                    .filter((s) => s.role == USER_ROLES.OWNER)
                    ?.map((i, index) => (
                      <option value={i.id} key={index}>
                        {i.firstNameAr} {i.id}
                      </option>
                    ))}
                </Select>
              </FormControl>
            </div>

            <div className="form__input form__input__flex">
              <FormControl className="form__input__container">
                <FormLabel>
                  <Text className="form__input__container__label">
                    الرمز البريدي
                  </Text>
                </FormLabel>
                <Input
                  name="postalCode"
                  size="lg"
                  type="text"
                  className="form__input__container__input"
                  placeholder="الرمز البريدي"
                  _placeholder={{ color: "#77797E" }}
                  value={formik.values.postalCode}
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched.postalCode && !!formik.errors.postalCode
                  }
                />

                <div className="form__input__container__warn">
                  {formik.touched.postalCode && formik.errors.postalCode ? (
                    <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                      {formik.errors.postalCode}
                    </Text>
                  ) : null}
                </div>
              </FormControl>

              <FormControl className="form__input__container">
                <FormLabel>
                  <Text className="form__input__container__label">
                    رقم الصك
                  </Text>
                </FormLabel>
                <Input
                  name="instrumentNumber"
                  size="lg"
                  type="text"
                  className="form__input__container__input"
                  placeholder=" رقم الصك"
                  _placeholder={{ color: "#77797E" }}
                  value={formik.values.instrumentNumber}
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched.instrumentNumber &&
                    !!formik.errors.instrumentNumber
                  }
                />

                <div className="form__input__container__warn">
                  {formik.touched.instrumentNumber &&
                  formik.errors.instrumentNumber ? (
                    <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                      {formik.errors.instrumentNumber}
                    </Text>
                  ) : null}
                </div>
              </FormControl>
            </div>

            <div className="form__input form__input__flex">
              <div className="flex-between">
                <div className="form__input__flex_text">الوحدات</div>
                <div className="form__input__flex_text">
                  <Button
                    rightIcon={<AddIcon />}
                    bg="white"
                    variant="outline"
                    dir="rtl"
                    colorScheme="red.500"
                    onClick={() => {
                      openUnitPopup();
                    }}
                  >
                    <span className="pl-8"> إضافة جديد</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="form__input form__input__flex">
              <div className="flex-between"></div>
            </div>

            <div className="form__btn__container">
              <Stack direction="row" width="100%" justify="space-between">
                <Button
                  padding="0px 49px"
                  variant="solid"
                  color="white"
                  bg="#194C81"
                  type="submit"
                >
                  اضافه
                </Button>
                <Button
                  onClick={onClose}
                  padding="0px 26px"
                  color={"#010B38"}
                  variant="outline"
                >
                  الغاء
                </Button>
              </Stack>
            </div>
          </form>
        </div>
      </div>

      <Modal isOpen={isOpenUnitModal} onClose={onCloseUnitModal}>
        <ModalOverlay />
        <ModalContent maxWidth="700px">
          <ModalBody>
            <CreateUnit onClose={onCloseUnitModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProperty;
