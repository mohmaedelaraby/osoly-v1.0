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

import CreateProperty from "./CreateProperty";
import { building } from "../../../mocks/building";

const PropertyTable = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <CardHeader>
        <div className="tabel_header">
          <span className="tabel_header_text">
            <Text>Proberties</Text>
          </span>
          <span className="tabel_header_addBtn">
            <Button
              leftIcon={<AddIcon />}
              className="tabel_header_addBtn_btn"
              onClick={onOpen}
            >
              Add Proberty
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
                    <Th className="table_header_item">Desc</Th>
                  </Tr>
                </Thead>
                <Tbody className="table_body">
                  {building.map((item, index) => (
                    <Tr
                      className="table_body_row"
                      onClick={() => {
                        navigate("/property", {
                          state: {
                            id: item.id,
                            name: item.name,
                            desc: item.desc,
                          },
                        });
                      }}
                    >
                      <Td className="table_body_row_item">{item.id}</Td>
                      <Td className="table_body_row_item">{item.name}</Td>
                      <Td className="table_body_row_item">{item.desc}</Td>
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
            <CreateProperty />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PropertyTable;
