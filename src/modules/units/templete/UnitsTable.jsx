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
import { units } from "../../../mocks/units";
import CreateUnit from "./CreateUnit";


const UnitsTable = ({data}) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <CardHeader>
        <div className="tabel_header">
          <span className="tabel_header_text">
            <Text>Units</Text>
          </span>
          <span className="tabel_header_addBtn">
            <Button
              leftIcon={<AddIcon />}
              className="tabel_header_addBtn_btn"
              onClick={onOpen}
            >
              Add Unit
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
                    <Th className="table_header_item">Price</Th>
                  </Tr>
                </Thead>
                <Tbody className="table_body">
                  {units.map((item, index) => (
                    <Tr
                      className="table_body_row"
                      onClick={() => {
                        navigate("/unit", {
                          state: {
                            id: item.unitID,
                            name: item.name,
                            price: item.price,
                          },
                        });
                      }}
                    >
                      <Td className="table_body_row_item">{item.unitID}</Td>
                      <Td className="table_body_row_item">{item.name}</Td>
                      <Td className="table_body_row_item">{item.price}</Td>
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
        <ModalContent maxWidth='700px'>
          <ModalCloseButton />
          <ModalBody>
            <CreateUnit/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UnitsTable;
