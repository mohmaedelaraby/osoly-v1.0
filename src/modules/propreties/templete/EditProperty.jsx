import {
  Button,
  Card,
  CardBody,
  Checkbox,
  FormControl,
 
  FormLabel,
 
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
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
import { USER_ROLES } from "../../../enums/UserRoles";
import bell from "../../../assets/images/bell.png";
import { AddIcon } from "@chakra-ui/icons";
import useClosePopUps from "../../../store/useClosePopups";
import CreateUnit from "../../units/templete/CreateUnit";
import close from "../../../assets/icons-svgs/close.svg";


const EditProperty = ({ id , onClose }) => {
 // const { isOpen, onOpen, onClose } = useDisclosure();
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

  const { mutate } = useUpdatePropertey();
  const { data, isLoading, refetch } = useGetPropertey(id);

  useEffect(() => {
    refetch();
    usersRefetch();
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data)
      setSelectedOwnerId(data?.ownerId);
      setSelectedImage(data.image)
    }
  }, [data]);

 const initialValues = {
    name: data?.name,
    address: data?.address,
    unitsCount:  data?.unitsCount,
    instrumentNumber:  data?.instrumentNumber,
    postalCode:  data?.postalCode,
    blockNumber:  data?.blockNumber,
    street:  data?.street,
    district:  data?.district,
    city:  data?.city,
    ownerId:  data?.ownerId,
    image:  data?.image,
  };

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: initialValues,
    validationSchema: propertyEditValidation,
    onSubmit: (values) => {
      let data = { ...values };
      console.log(data)

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
                    onChange={(e)=>{setSelectedImage(e.target.files[0])}}
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
                      src={selectedImage}
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
                    مالك العقار
                  </Text>
                </FormLabel>
                <Select
                  height={"56px"}
                  name="owner"
                  dir="rtl"
                  value={selectedOwnerId}
                  onChange={(e) => {
                    setSelectedOwnerId(e.target.value)
                    setTimeout(() => {}, 0);
                  }}
                >
                  <option value={0}>المالك </option>
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
                    <Th className="table_header_item">الاسم</Th>
                    <Th className="table_header_item">موعد الاستحقاق</Th>
                    <Th className="table_header_item">الإيجار</Th>
                    <Th className="table_header_item">العنوان</Th>
                    <Th className="table_header_item">المساحة</Th>
                    <Th className="table_header_item">حساب فاتورة الكهرباء</Th>
                    <Th className="table_header_item">حساب المياه</Th>
                    <Th className="table_header_item">الغرف</Th>
                    <Th className="table_header_item">المطبخ</Th>
                    <Th className="table_header_item">التكييفات</Th>
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
                        <Td className="table_body_row_item">{item.address}</Td>
                        <Td className="table_body_row_item">{item.space}</Td>
                        <Td className="table_body_row_item">
                          {item.electricityAccount}
                        </Td>
                        <Td className="table_body_row_item">
                          {item.waterAccount}
                        </Td>
                        <Td className="table_body_row_item">{item.rooms}</Td>

                        <Td className="table_body_row_item">
                          {item.kitchen ? (
                            <>
                              <Checkbox defaultChecked isDisabled></Checkbox>
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

export default EditProperty;
