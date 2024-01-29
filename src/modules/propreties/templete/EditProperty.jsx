import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
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
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ownerValidation, propertyValidation } from "../validation/schema";
import { AddIcon } from "@chakra-ui/icons";
import { building } from "../../../mocks/building";

const EditProperty = () => {
  const { state } = useLocation();
  const { id, name, desc } = state;
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialValues = {
    id: `${id}`,
    name: name,
    desc: desc,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: propertyValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <Card className="from__card">
        <CardBody>
          <form onSubmit={formik.handleSubmit} className="form">
            <div className="form__header">Edit Proprety</div>
            <div className="formWithTable_container">
              <div className="from__card from__card__full">
                <div className="form__input form__input__flex">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label">
                        {" "}
                        Name{" "}
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

                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label">
                        {" "}
                        Desc{" "}
                      </Text>
                    </FormLabel>

                    <Input
                      name="desc"
                      type="text"
                      className="form__input__container__input"
                      placeholder="enter your desc"
                      value={formik.values.desc}
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.desc && !!formik.errors.desc}
                    />

                    <div className="form__input__container__warn">
                      {formik.touched.desc && formik.errors.desc ? (
                        <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                          {formik.errors.desc}
                        </Text>
                      ) : null}
                    </div>
                  </FormControl>
                </div>
              </div>

              <div className="formWithTable_container__table">
                <Card>
                  <CardBody>
                    <CardHeader>
                      <div className="tabel_header">
                        <span className="tabel_header_text">
                          <Text>Buildings</Text>
                        </span>
                        <span className="tabel_header_addBtn">
                          <Button
                            leftIcon={<AddIcon />}
                            className="tabel_header_addBtn_btn"
                            onClick={onOpen}
                          >
                            Add Building
                          </Button>
                        </span>
                      </div>
                    </CardHeader>
                    <Card>
                      <Card>
                        <CardBody>
                          <TableContainer>
                            <Table className="table" variant="simple">
                              <Thead className="table_header">
                                <Tr>
                                  <Th className="table_header_item">ID</Th>
                                  <Th className="table_header_item">Name</Th>
                                  <Th className="table_header_item">desc</Th>
                                </Tr>
                              </Thead>
                              <Tbody className="table_body">
                                {building.map((item, index) => (
                                  <Tr
                                    className="table_body_row"
                                    onClick={() => {
                                      navigate("/building", {
                                        state: {
                                          id: item.id,
                                          name: item.name,
                                          desc: item.desc,
                                          units: item.units,
                                        },
                                      });
                                    }}
                                  >
                                    <Td className="table_body_row_item">
                                      {item.id}
                                    </Td>
                                    <Td className="table_body_row_item">
                                      {item.name}
                                    </Td>
                                    <Td className="table_body_row_item">
                                      {item.desc}
                                    </Td>
                                  </Tr>
                                ))}
                              </Tbody>
                            </Table>
                          </TableContainer>
                        </CardBody>
                      </Card>
                    </Card>
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalCloseButton />
                        <ModalBody>
                          <>create build</>
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                  </CardBody>
                </Card>
              </div>
            </div>
            <div className="form__btn__container">
              <Button className="form__btn " type="submit">
                Edit
              </Button>
              <Button className="form__btn form__btn__delete ">Delete</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default EditProperty;
