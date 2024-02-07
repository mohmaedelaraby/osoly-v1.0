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
import { enterprise_users } from "../../../mocks/enterPraiseUsers";
import CreateEnterpraiseUser from "./CreateEnterpraiseUser";

const UserEnterpraiseTable = () => {
  const navigate=useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <CardHeader>
        <div className="tabel_header">
          <span className="tabel_header_text">
            <Text>Enterpraise Users</Text>
          </span>
          <span className="tabel_header_addBtn">
            <Button  onClick={onOpen} leftIcon={<AddIcon/>} className="tabel_header_addBtn_btn">Add Enterpraise User</Button>
          </span>
        </div>
      </CardHeader>
      <Card >
        <Card >
          <CardBody >
            <TableContainer>
              <Table className="table" variant="simple">
                <Thead className="table_header">
                  <Tr>
                    <Th className="table_header_item" >ID</Th>
                    <Th className="table_header_item">Name</Th>
                    <Th className="table_header_item">Number of Units</Th>
                    <Th className="table_header_item">Duration</Th>
                  </Tr>
                </Thead>
                <Tbody className="table_body">
                  {enterprise_users.map((item, index) => (
                    <Tr className="table_body_row" onClick={()=>{navigate('/enterprise', { state: { id:item.id,name:item.name,numOfUnits:item.numOfUnits,duration:item.duration } })}}>
                      <Td className="table_body_row_item">{item.id}</Td>
                      <Td className="table_body_row_item">{item.name}</Td>
                      <Td className="table_body_row_item">{item.numOfUnits}</Td>
                      <Td className="table_body_row_item">{item.duration}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent maxWidth='700px'>
          <ModalCloseButton />
          <ModalBody>
            <CreateEnterpraiseUser/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserEnterpraiseTable;
