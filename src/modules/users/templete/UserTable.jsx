import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { users } from "../../../mocks/users";
import "../../../assets/styels/components/Table.scss";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const UserTable = () => {
  const navigate=useNavigate()
  return (
    <>
      <CardHeader>
        <div className="tabel_header">
          <span className="tabel_header_text">
            <Text>Users</Text>
          </span>
          <span className="tabel_header_addBtn">
            <Button leftIcon={<AddIcon/>} className="tabel_header_addBtn_btn">Add User</Button>
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
                    <Th className="table_header_item">Email</Th>
                  </Tr>
                </Thead>
                <Tbody className="table_body">
                  {users.map((item, index) => (
                    <Tr className="table_body_row" onClick={()=>{navigate('/user', { state: { id:item.id,name:item.name,email:item.email } })}}>
                      <Td className="table_body_row_item">{item.id}</Td>
                      <Td className="table_body_row_item">{item.name}</Td>
                      <Td className="table_body_row_item">{item.email}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </Card>
    </>
  );
};

export default UserTable;
