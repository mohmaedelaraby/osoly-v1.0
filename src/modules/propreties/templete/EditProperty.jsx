import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { propertyEditValidation } from "../validation/schema";
import UnitsTable from "../../units/templete/UnitsTable";
import { useUpdatePropertey } from "../hooks/useUpdatePropertey";
import useGetPropertey from "../hooks/useGetPropertey";
import useUsers from "../../users/hooks/useUsers";
import { USER_ROLES } from "../../../enums/UserRoles";
import close from "../../../assets/icons-svgs/close.svg";
import bell from "../../../assets/images/bell.png";
import { AddIcon } from "@chakra-ui/icons";
import useClosePopUps from "../../../store/useClosePopups";
import CreateUnit from "../../units/templete/CreateUnit";

const EditProperty = ({ id , onClose }) => {
 // const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOwnerId, setSelectedOwnerId] = useState(0);

  const { usersData, usersRefetch } = useUsers({
    pageNo: 1,
    limit: 10000,
  });

  const { mutate } = useUpdatePropertey();
  const { data, isLoading, refetch } = useGetPropertey(id);
  useEffect(() => {
    refetch();
    usersRefetch();
  }, []);

  useEffect(() => {
    if (data) {
      setSelectedOwnerId(data?.ownerId);
    }
  }, [data]);

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
    validationSchema: propertyEditValidation,
    onSubmit: (values) => {
      let data = { ...values };

      //mutate({id:id? id:data?.id ,body:data});
      //mutate({ id: data?.id, body: values });
    },
  });
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
            

            <div className="form__input form__input__flex mt-24">
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
                <InputGroup>
                  <Input
                    name="name"
                    size="lg"
                    type="text"
                    className="form__input__container__input"
                    placeholder="مساحة العقار   "
                    _placeholder={{ color: "#77797E" }}
                    value={formik.values.space}
                    padding={"8px"}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.space && !!formik.errors.space}
                  />
                  <InputLeftElement
                    color={"#77797E"}
                    width={"100px"}
                    height="100%"
                    justifyContent="center"
                    borderRadius={"12px"}
                  >
                    متر مربع
                  </InputLeftElement>
                </InputGroup>

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
                  isInvalid={
                    formik.touched.skNumber && !!formik.errors.skNumber
                  }
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
                <div className="form__input__flex_text">
                  {" "}
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

            <div className="formWithTable_container__table">
              <Card>
                <Card>
                  <CardBody>
                    {/*   <UnitsTable
                        data={units}
                        propOwenerId={owenerId ? owenerId : data?.ownerId}
                        propPropertyId={data?.id}
                      /> */}
                  </CardBody>
                </Card>
              </Card>
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
          <ModalBody padding={'0px'}>
            <CreateUnit />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProperty;
