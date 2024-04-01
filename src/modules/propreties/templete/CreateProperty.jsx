import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { propertyCreateValidation } from "../validation/schema";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
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
import bell from '../../../assets/images/bell.png'
import { AddIcon } from "@chakra-ui/icons";
import useClosePopUps from "../../../store/useClosePopups";
import CreateUnit from "../../units/templete/CreateUnit";

const CreateProperty = ({ onClose, propOwenerId }) => {
  const [selectedOwnerId, setSelectedOwnerId] = useState(0);
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
    space: "",
    address: "",
    postalCode: "",
    skNumber: "",
    owner: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: propertyCreateValidation,
    onSubmit: (values) => {
      let data = {
        ownerId: propOwenerId ? propOwenerId : parseInt(selectedOwnerId),
        ...values,
      };
      mutate({ body: data });
    },
  });


  const onUpload = () => {
    document.getElementById('uploadFile').click();
  }
  
  const selectFile = () => {
    const [file] = document.getElementById('uploadFile').files
    console.log(file)
  }
  const { show, toggleShow } = useClosePopUps();

  const {
    isOpen: isOpenUnitModal,
    onOpen: onOpenUnitModal,
    onClose: onCloseUnitModal,
  } = useDisclosure();

  const openUnitPopup = () => {
    onOpenUnitModal();
    if (show) {
      toggleShow();
    }
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
            <div className="form__input__flex_fileUpload">
              <img src={bell} alt="" width={'66px'}/>
              <p className="form__input__flex_fileUpload_text">رفع صورة</p>
              <p className="form__input__flex_fileUpload_desc">يفضل ان يكون قياس الصورة 320X120</p>
              <Input
                    className="form__input__flex_fileUpload_input"
                    type="file"
                    name="image"
                    accept=".png, .jpg, .jpeg"
                    onChange={(event) => {
                      console.log(event.target.files[0]);
                      //setSelectedLogo(event.target.files[0]);
                    }}
                  />
            </div>
            

          </div>

          <div className="form__input form__input__flex">
            <FormControl className="form__input__container">
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
              <Input
                name="name"
                size="lg"
                type="text"
                className="form__input__container__input"
                placeholder="مساحة العقار   "
                _placeholder={{ color: "#77797E" }}
                value={formik.values.space}
                onChange={formik.handleChange}
                isInvalid={formik.touched.space && !!formik.errors.space}
              />

              <div className="form__input__container__warn">
                {formik.touched.space && formik.errors.space ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {formik.errors.space}
                  </Text>
                ) : null}
              </div>
            </FormControl>
          </div>

          <div className="form__input form__input__flex">
            <FormControl className="form__input__container">
              <Input
                name="name"
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
              <Input
                name="name"
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
              <Input
                name="name"
                size="lg"
                type="text"
                className="form__input__container__input"
                placeholder=" رقم الصك"
                _placeholder={{ color: "#77797E" }}
                value={formik.values.skNumber}
                onChange={formik.handleChange}
                isInvalid={formik.touched.skNumber && !!formik.errors.skNumber}
              />

              <div className="form__input__container__warn">
                {formik.touched.skNumber && formik.errors.skNumber ? (
                  <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                    {formik.errors.skNumber}
                  </Text>
                ) : null}
              </div>
            </FormControl>
          </div>

          <div className="form__input form__input__flex mb-24">
            <FormControl className="form__input__container">
              <Select
                height={"56px"}
                iconSize="0px"
                name="propertyOwner"
                value={formik.values.ownerId}
                dir="rtl"
                onChange={(e) => {
                  formik.handleChange(e.target.value);
                  setSelectedOwnerId(e.target.value);
                  setTimeout(() => {}, 0);
                }}
              >
                <option value={0}>المالك</option>
                {usersData?.users
                  .filter((s) => s.role == USER_ROLES.OWNER)
                  ?.map((i, index) => (
                    <option value={i.id} key={index}>
                      {i.firstNameAr}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </div>

          <div className="form__input form__input__flex">
            <div className="flex-between">
              <div className="form__input__flex_text">الوحدات</div>
              <div className="form__input__flex_text"> <Button
            rightIcon={<AddIcon />}
            bg="white"
            variant="outline"
            dir="rtl"
            colorScheme='red.500'
            onClick={() => {
              openUnitPopup();
            }}
          >
            <span className="pl-8"> إضافة جديد</span>
          </Button></div>

            </div>
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
    
    <Modal isOpen={isOpenUnitModal && !show} onClose={onCloseUnitModal}>
        <ModalOverlay />
        <ModalContent maxWidth="700px">
          <ModalBody>
            <CreateUnit />
          </ModalBody>
        </ModalContent>
      </Modal></>
   
  );
};

export default CreateProperty;
