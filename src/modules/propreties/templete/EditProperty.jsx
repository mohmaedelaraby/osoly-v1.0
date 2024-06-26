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
  Spinner,
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
import { propertyCreateValidation } from "../validation/schema";
import { useUpdatePropertey } from "../hooks/useUpdatePropertey";
import useGetPropertey from "../hooks/useGetPropertey";
import useUsers from "../../users/hooks/useUsers";
import bell from "../../../assets/images/bell.png";
import { AddIcon } from "@chakra-ui/icons";
import CreateUnit from "../../units/templete/CreateUnit";
import close from "../../../assets/icons-svgs/close.svg";
import { useTranslation } from "react-i18next";
import { useDynamicColors } from "../../../hooks/useDynamicColors";

const EditProperty = ({ id, onClose }) => {
  const { t } = useTranslation();
  const { primary, secondry } = useDynamicColors();

  const {
    isOpen: isOpenUnitModal,
    onOpen: onOpenUnitModal,
    onClose: onCloseUnitModal,
  } = useDisclosure();

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

  const {
    mutate,
    isLoading: updatePropertyLoading,
    isSuccess: updatePropertySuccsess,
  } = useUpdatePropertey();
  const { data, isLoading, refetch } = useGetPropertey(id);

  useEffect(() => {
    refetch();
    usersRefetch();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      refetch();
    }, 500);
  }, [isOpenUnitModal]);

  useEffect(() => {
    if (data) {
      setSelectedOwnerId(data?.ownerId);
      setLoadedImage(data?.image);
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
    validationSchema: propertyCreateValidation,
    onSubmit: (values) => {
      formik.values.ownerId = selectedOwnerId;
      const formData = new FormData();
      if (selectedImage) {
        formData.append("image", selectedImage, selectedImage.name);
      } else {
        formData.append("image", loadedImage);
      }
      formData.append("name", formik.values.name);
      formData.append("address", formik.values.address);
      formData.append("blockNumber", formik.values.blockNumber);
      formData.append("city", formik.values.city);
      formData.append("district", formik.values.district);
      formData.append("instrumentNumber", formik.values.instrumentNumber);
      //formData.append("ownerId", formik.values.ownerId);
      formData.append("postalCode", formik.values.postalCode);
      formData.append("street", formik.values.street);
      formData.append("unitsCount", formik.values.unitsCount);
      mutate({ id: id, body: formData });
      onClose();
      //mutate({id:id? id:data?.id ,body:data});
      //mutate({ id: data?.id, body: values });
    },
  });
  useEffect(() => {
    if (updatePropertySuccsess && !updatePropertyLoading) {
      onClose();
    }
  }, [updatePropertySuccsess]);

  const openUnitPopup = () => {
    onOpenUnitModal();
  };
  return (
    <>
      <div className="from__card from__card__full">
        <div className="from__card from__card__full">
          {data && !isLoading ? (
            <>
              <form onSubmit={formik.handleSubmit} className="form">
                <div className="form__header">
                  <div className="form__header_text fo_primary">
                    {t("propreties.create.title_edit")}
                  </div>
                  <div className="form__header_close">
                    <img src={close} alt="" width="40px" onClick={onClose} />
                  </div>
                </div>

                <div className="form_scroll">
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
                          padding: `${
                            selectedImage || loadedImage ? "0px" : ""
                          }`,
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
                        <div className="form__input__flex_imgUpload_btn">
                          <Button background="transparent" color={secondry}>
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                              >
                                <path
                                  d="M19.4003 7.84376L16.6603 5.10376C16.3027 4.76786 15.8341 4.57512 15.3436 4.56222C14.8532 4.54931 14.3751 4.71713 14.0003 5.03376L5.0003 14.0338C4.67706 14.3597 4.4758 14.787 4.4303 15.2438L4.0003 19.4138C3.98683 19.5602 4.00583 19.7079 4.05596 19.8461C4.10608 19.9844 4.1861 20.1099 4.2903 20.2138C4.38374 20.3064 4.49455 20.3798 4.61639 20.4295C4.73823 20.4793 4.86869 20.5045 5.0003 20.5038H5.0903L9.2603 20.1238C9.71709 20.0783 10.1443 19.877 10.4703 19.5538L19.4703 10.5538C19.8196 10.1847 20.0084 9.69227 19.9953 9.1843C19.9822 8.67633 19.7682 8.19427 19.4003 7.84376ZM9.0803 18.1238L6.0803 18.4038L6.3503 15.4038L12.0003 9.82376L14.7003 12.5238L9.0803 18.1238ZM16.0003 11.1838L13.3203 8.50376L15.2703 6.50376L18.0003 9.23376L16.0003 11.1838Z"
                                  fill="#EFF9FF"
                                />
                              </svg>
                            </span>
                            <Input
                              className="form__input__flex_imgUpload_file"
                              type="file"
                              name="image"
                              accept=".png, .jpg, .jpeg"
                              onChange={(e) => {
                                setSelectedImage(e.target.files[0]);
                              }}
                            />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="form__input form__input__flex">
                    <FormControl className="form__input__container">
                      <FormLabel>
                        <Text className="form__input__container__label fo_primary">
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
                            {t(formik.errors.name)}
                          </Text>
                        ) : null}
                      </div>
                    </FormControl>
                  </div>

                  <div className="form__input form__input__flex">
                    <FormControl className="form__input__container">
                      <FormLabel>
                        <Text className="form__input__container__label fo_primary">
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
                        isInvalid={
                          formik.touched.address && !!formik.errors.address
                        }
                      />

                      <div className="form__input__container__warn">
                        {formik.touched.address && formik.errors.address ? (
                          <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                            {t(formik.errors.address)}
                          </Text>
                        ) : null}
                      </div>
                    </FormControl>
                  </div>

                  {/*  <div className="form__input form__input__flex">
              <FormControl className="form__input__container">
                <FormLabel>
                  <Text className="form__input__container__label fo_primary">
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
                    <FormControl className="form__input__container disabled">
                      <FormLabel>
                        <Text className="form__input__container__label fo_primary">
                          {t("general.property_owner")}
                        </Text>
                      </FormLabel>
                      <Select
                        height={"56px"}
                        name="owner"
                        value={selectedOwnerId}
                        onChange={(e) => {
                          setSelectedOwnerId(e.target.value);
                          setTimeout(() => {}, 0);
                        }}
                      >
                        <option value={0}>{t("general.owner")} </option>
                        {usersData?.users?.map((i, index) => (
                          <option value={i.id} key={index}>
                            {i.firstNameAr}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="form__input form__input__flex">
                    <FormControl className="form__input__container">
                      <FormLabel>
                        <Text className="form__input__container__label fo_primary">
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
                          formik.touched.postalCode &&
                          !!formik.errors.postalCode
                        }
                      />

                      <div className="form__input__container__warn">
                        {formik.touched.postalCode &&
                        formik.errors.postalCode ? (
                          <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                            {t(formik.errors.postalCode)}
                          </Text>
                        ) : null}
                      </div>
                    </FormControl>

                    <FormControl className="form__input__container">
                      <FormLabel>
                        <Text className="form__input__container__label fo_primary">
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
                            {t(formik.errors.instrumentNumber)}
                          </Text>
                        ) : null}
                      </div>
                    </FormControl>
                  </div>

                  <div className="form__input form__input__flex">
                    <div className="flex-between">
                      <div className="form__input__flex_text">
                        {t("general.units")}
                      </div>
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
                          <span className="pl-8 fo_primary">
                             
                            {t("units.create.title")}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {data?.units?.length > 0 ? (
                    <>
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
                                  <Th className="table_header_item">
                                    {t("general.due_date")}
                                  </Th>
                                  <Th className="table_header_item">
                                    {t("general.rent")}
                                  </Th>
                                  <Th className="table_header_item">
                                    {t("general.address")}
                                  </Th>
                                  <Th className="table_header_item">
                                    {t("general.space")}
                                  </Th>
                                  <Th className="table_header_item">
                                    {t("general.electericty_cost")}
                                  </Th>
                                  <Th className="table_header_item">
                                    {t("general.water_cost")}
                                  </Th>
                                  <Th className="table_header_item">
                                    {t("general.rooms")}
                                  </Th>
                                  <Th className="table_header_item">
                                    {t("general.kitchen")}
                                  </Th>
                                  <Th className="table_header_item">
                                    {t("general.conditioners")}
                                  </Th>
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
                                      <Td className="table_body_row_item">
                                        {item.name}
                                      </Td>
                                      <Td className="table_body_row_item">
                                        {item.rentCollectionDate}
                                      </Td>
                                      <Td className="table_body_row_item">
                                        {item?.rent?.toLocaleString()}
                                      </Td>
                                      <Td className="table_body_row_item">
                                        {item.address}
                                      </Td>
                                      <Td className="table_body_row_item">
                                        {item?.space?.toLocaleString()}
                                      </Td>
                                      <Td className="table_body_row_item">
                                        {item.electricityAccount}
                                      </Td>
                                      <Td className="table_body_row_item">
                                        {item.waterAccount}
                                      </Td>
                                      <Td className="table_body_row_item">
                                        {item?.rooms?.toLocaleString()}
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
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="form__btn__container">
                  <Stack direction="row" width="100%" justify="space-between">
                    <Button
                      padding="0px 49px"
                      variant="solid"
                      color={secondry}
                      bg={primary}
                      type="submit"
                      isLoading={updatePropertyLoading}
                    >
                      {t("general.edit")}
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
            </>
          ) : (
            <>
               
              <div className="flex-center form-spinner">
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <Modal isOpen={isOpenUnitModal} onClose={onCloseUnitModal}>
        <ModalOverlay />
        <ModalContent maxWidth="700px">
          <ModalBody>
            <CreateUnit onClose={onCloseUnitModal} propPropertyId={data?.id} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProperty;
