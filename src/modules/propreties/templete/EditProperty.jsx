import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { propertyEditValidation } from "../validation/schema";
import { useUpdatePropertey } from "../hooks/useUpdatePropertey";
import useGetPropertey from "../hooks/useGetPropertey";
import useUsers from "../../users/hooks/useUsers";
import bell from "../../../assets/images/bell.png";
import { AddIcon } from "@chakra-ui/icons";
import CreateUnit from "../../units/templete/CreateUnit";
import close from "../../../assets/icons-svgs/close.svg";
import { useTranslation } from "react-i18next";

const EditProperty = ({ id, onClose }) => {
  const { t } = useTranslation();
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOwnerId, setSelectedOwnerId] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadedImage, setLoadedImage] = useState(null);
  const { usersData, usersRefetch } = useUsers({
    pageNo: 1,
    limit: 1000,
    count: 12,
  });
  useEffect(() => {
    usersRefetch();
  }, []);

  const { mutate } = useUpdatePropertey();
  const { data, isLoading, refetch } = useGetPropertey(id);

  useEffect(() => {
    refetch();
    usersRefetch();
  }, []);

  useEffect(() => {
    if (data) {
      setSelectedOwnerId(data?.ownerId);
      setLoadedImage(data.image);
    }
  }, [data]);

  const initialValues = {
    name: data?.name || " ",
    address: data?.address || " ",
    unitsCount: data?.unitsCount || 0,
    instrumentNumber: data?.instrumentNumber || " ",
    postalCode: data?.postalCode || " ",
    blockNumber: data?.blockNumber || " ",
    street: data?.street || " ",
    district: data?.district || " ",
    city: data?.city || " ",
    ownerId: data?.ownerId || " ",
    image: data?.image || " ",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: propertyEditValidation,
    onSubmit: (values) => {
      formik.values.ownerId = selectedOwnerId;
      const formData = new FormData();
      formData.append("image", selectedImage, selectedImage.name);
      formData.append("name", "Mohamed");
      formData.append("address", formik.values.address);
      formData.append("blockNumber", formik.values.blockNumber);
      formData.append("city", formik.values.city);
      formData.append("district", formik.values.district);
      formData.append("instrumentNumber", formik.values.instrumentNumber);
      formData.append("ownerId", formik.values.ownerId);
      formData.append("postalCode", formik.values.postalCode);
      formData.append("street", formik.values.street);
      formData.append("unitsCount", formik.values.unitsCount);
      mutate({ id: id, body: formData });
      onClose();
      //mutate({id:id? id:data?.id ,body:data});
      //mutate({ id: data?.id, body: values });
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
  return (
    <>
      <div className="from__card from__card__full">
        <div className="from__card from__card__full">
          <form onSubmit={formik.handleSubmit} className="form">
            <div className="form__header">
              <div className="form__header_text">
                 
                {t("propreties.create.title_edit")}
              </div>
              <div className="form__header_close">
                <img src={close} alt="" width="40px" onClick={onClose} />
              </div>
            </div>

            <div className="form__input form__input__flex">
              {!selectedImage && !loadedImage ? (
                <div className="form__input__flex_fileUpload">
                  <img src={bell} alt="" width={"66px"} />
                  <p className="form__input__flex_fileUpload_text">
                    {t("general.add_image")} 
                  </p>
                  <p className="form__input__flex_fileUpload_desc">
                    {t("general.image_disclaimer")} 
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
                    padding: `${selectedImage || loadedImage ? "0px" : ""}`,
                    borderRadius: "12px",
                  }}
                  className="form__input__flex_fileUpload"
                >
                  <div className="form__input__flex_fileUpload_image">
                    <img
                      alt="not found"
                      width={"auto"}
                      height={"285px"}
                      src={
                        selectedImage
                          ? URL.createObjectURL(selectedImage)
                          : loadedImage
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="form__input form__input__flex">
              <FormControl className="form__input__container">
                <FormLabel>
                  <Text className="form__input__container__label">
                    {t("general.property_name")}
                  </Text>
                </FormLabel>
                <Input
                  name="name"
                  size="lg"
                  type="text"
                  className="form__input__container__input"
                  placeholder={t("general.property_name")}
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
                  <Text className="form__input__container__label">
                    {t("general.address")}
                  </Text>
                </FormLabel>
                <Input
                  name="address"
                  size="lg"
                  type="text"
                  className="form__input__container__input"
                  placeholder={t("general.address")}
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

            {/*  <div className="form__input form__input__flex">
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
                    isInvalid={formik.touched.unitsCount && !!formik.errors.unitsCount}
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
            </div> */}

            <div className="form__input form__input__flex mb-24">
              <FormControl className="form__input__container">
                <FormLabel>
                  <Text className="form__input__container__label">
                    {t("general.property_owner")}
                  </Text>
                </FormLabel>
                <Select
                  height={"56px"}
                  name="owner"
                  dir="rtl"
                  value={selectedOwnerId}
                  onChange={(e) => {
                    setSelectedOwnerId(e.target.value);
                    setTimeout(() => {}, 0);
                  }}
                >
                  <option value={0}>{t("general.owner")} </option>
                  {usersData?.users?.map((i, index) => (
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
                    {t("general.postal_code")}
                  </Text>
                </FormLabel>
                <Input
                  name="postalCode"
                  size="lg"
                  type="text"
                  className="form__input__container__input"
                  placeholder={t("general.postal_code")}
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
                    {t("general.sk_number")}
                  </Text>
                </FormLabel>
                <Input
                  name="instrumentNumber"
                  size="lg"
                  type="text"
                  className="form__input__container__input"
                  placeholder={t("general.sk_number")}
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
                <div className="form__input__flex_text">{t("general.units")}</div>
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
                    <span className="pl-8"> {t("units.create.title")}</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="form__input form__input__flex mt-24">
              <div className="flex-between">
                <TableContainer
                  width="100%"
                  overflowY="auto"
                  overflowX="auto"
                  minHeight="340px"
                  maxHeight="340px"
                >
                  <Table className="table" variant="simple">
                    <Thead className="table_header">
                      <Tr>
                        <Th className="table_header_item">
                          {t("general.name")}
                        </Th>
                        <Th className="table_header_item">{t("general.due_date")}</Th>
                        <Th className="table_header_item">{t("general.rent")}</Th>
                        <Th className="table_header_item">
                          {t("general.address")}
                        </Th>
                        <Th className="table_header_item">{t("general.space")}</Th>
                        <Th className="table_header_item">
                          {t("general.electericty_cost")}
                        </Th>
                        <Th className="table_header_item">{t("general.water_cost")}</Th>
                        <Th className="table_header_item">{t("general.rooms")}</Th>
                        <Th className="table_header_item">{t("general.kitchen")}</Th>
                        <Th className="table_header_item">{t("general.conditioners")}</Th>
                        <Th className="table_header_item"></Th>
                      </Tr>
                    </Thead>
                    <Tbody className="table_body">
                      {data &&
                        data?.units?.map((item, index) => (
                          <Tr
                            key={index}
                            className="table_body_row"
                            onClick={() => {}}
                          >
                            <Td className="table_body_row_item">{item.name}</Td>
                            <Td className="table_body_row_item">
                              {item.rentCollectionDate}
                            </Td>
                            <Td className="table_body_row_item">{item.rent}</Td>
                            <Td className="table_body_row_item">
                              {item.address}
                            </Td>
                            <Td className="table_body_row_item">
                              {item.space}
                            </Td>
                            <Td className="table_body_row_item">
                              {item.electricityAccount}
                            </Td>
                            <Td className="table_body_row_item">
                              {item.waterAccount}
                            </Td>
                            <Td className="table_body_row_item">
                              {item.rooms}
                            </Td>

                            <Td className="table_body_row_item">
                              {item.kitchen ? (
                                <>
                                  <Checkbox
                                    defaultChecked
                                    isDisabled
                                  ></Checkbox>
                                </>
                              ) : (
                                <>
                                  <Checkbox isDisabled></Checkbox>
                                </>
                              )}
                            </Td>
                            <Td className="table_body_row_item">
                              {item.conditioners}
                            </Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                </TableContainer>
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
                  {t("general.add")}
                </Button>
                <Button
                  onClick={onClose}
                  padding="0px 26px"
                  color={"#010B38"}
                  variant="outline"
                >
                  {t("general.cancel")}
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

export default EditProperty;
