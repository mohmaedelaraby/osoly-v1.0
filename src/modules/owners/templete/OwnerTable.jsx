import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
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
import { ownerss } from "../../../mocks/owners";
import CreateOwner from "./CreateOwner";

const OwnerTable = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <CardHeader>
        <div className="tabel_header">
          <span className="tabel_header_text">
            <Text>Oweners</Text>
          </span>
          <span className="tabel_header_addBtn">
            <Button
              leftIcon={<AddIcon />}
              className="tabel_header_addBtn_btn"
              onClick={onOpen}
            >
              Add Owner
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
                  </Tr>
                </Thead>
                <Tbody className="table_body">
                  {ownerss.map((item, index) => (
                    <Tr
                      className="table_body_row"
                      onClick={() => {
                        navigate("/owner", {
                          state: {
                            id: item.id,
                            name: item.name,
                            buildings: item.buildings,
                          },
                        });
                      }}
                    >
                      <Td className="table_body_row_item">{item.id}</Td>
                      <Td className="table_body_row_item">{item.name}</Td>
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
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateOwner />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OwnerTable;
