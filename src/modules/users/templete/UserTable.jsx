import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { users } from "../../../mocks/users";

const UserTable = () => {
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>users table</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
                users.map((item,index)=>(
                    <Tr>
                    <Td>{item.id}</Td>
                    <Td>{item.name}</Td>
                    <Td >{item.email}</Td>
                  </Tr>
                ))
            }
           
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserTable;
