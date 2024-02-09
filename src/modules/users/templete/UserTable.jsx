import {
  Button,
  Card,
  CardBody,
  CardHeader,
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
import React from "react";
import "../../../assets/styels/components/Table.scss";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import CreateUser from "./CreateUser";

const UserTable = ({ data }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <CardHeader>
        <div className="tabel_header">
          <span className="tabel_header_text">
            <Text>Users</Text>
          </span>
          <span className="tabel_header_addBtn">
            <Button
              onClick={onOpen}
              leftIcon={<AddIcon />}
              className="tabel_header_addBtn_btn"
            >
              Add User
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
                    <Th className="table_header_item">Email</Th>
                    <Th className="table_header_item">First Name</Th>
                    <Th className="table_header_item">Last Name</Th>
                    <Th className="table_header_item">Phone Number</Th>
                    <Th className="table_header_item">Role</Th>
                  </Tr>
                </Thead>
                <Tbody className="table_body">
                  {data?.map((item, index) => (
                    <Tr
                      className="table_body_row"
                      onClick={() => {
                        navigate("/user", {
                          state: {
                            id: item.id,
                          },
                        });
                      }}
                    >
                      <Td className="table_body_row_item">{item.email}</Td>
                      <Td className="table_body_row_item">{item.firstNameEn}</Td>
                      <Td className="table_body_row_item">{item.lastNameEn}</Td>
                      <Td className="table_body_row_item">{item.phoneNumber}</Td>
                      <Td className="table_body_row_item">{item.role}</Td>
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
        <ModalContent maxWidth="700px">
          <ModalCloseButton />
          <ModalBody>
            <CreateUser />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserTable;
