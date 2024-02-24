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
import CreateUnit from "./CreateUnit";
import useClosePopUps from "../../../store/useClosePopups";


const UnitsTable = ({data , owenerId}) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { show, toggleShow } = useClosePopUps();

  const openPopup = () => {
    onOpen();
    if (show) {
      toggleShow();
    }
  };

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
              onClick={()=>openPopup()}
            >
              Add Unit
            </Button>
          </span>
        </div>
      </CardHeader>
      <Card>
        <Card>
          <CardBody>
            <TableContainer overflowY="scroll"
              overflowX="scroll"
              minHeight="340px"
              maxHeight="340px">
              <Table className="table" variant="simple">
                <Thead className="table_header">
                  <Tr>
                    <Th className="table_header_item">name</Th>
                    <Th className="table_header_item">rent</Th>
                    <Th className="table_header_item">rent collectionDate</Th>
                    <Th className="table_header_item">electricity account</Th>
                    <Th className="table_header_item">waterAccount</Th>
                    <Th className="table_header_item">address</Th>
                    <Th className="table_header_item">space</Th>
                    <Th className="table_header_item">rooms</Th>
                    <Th className="table_header_item">lounge</Th>
                    <Th className="table_header_item">conditioners</Th>
                    <Th className="table_header_item">kitchen</Th>
                  </Tr>
                </Thead>
                <Tbody className="table_body">
                  {data && data.map((item, index) => (
                    <Tr
                      className="table_body_row"
                      onClick={() => {
                        navigate("/unit", {
                          state: {
                            id: item.id,
                            name: item.name,
                            rent: item.rent,
                            rentCollectionDate: item.rentCollectionDate,
                            electricityAccount: item.electricityAccount,
                            waterAccount: item.waterAccount,
                            address: item.address,
                            space: item.space,
                            rooms: item.rooms,
                            bathrooms: item.bathrooms,
                            lounge: item.lounge,
                            conditioners: item.conditioners,
                            kitchen: item.kitchen,
                          },
                        });
                      }}
                    >
                      <Td className="table_body_row_item">{item.name}</Td>
                      <Td className="table_body_row_item">{item.rent}</Td>
                      <Td className="table_body_row_item">{item.rentCollectionDate}</Td>
                      <Td className="table_body_row_item">{item.electricityAccount}</Td>
                      <Td className="table_body_row_item">{item.waterAccount}</Td>
                      <Td className="table_body_row_item">{item.address}</Td>
                      <Td className="table_body_row_item">{item.space}</Td>
                      <Td className="table_body_row_item">{item.rooms}</Td>
                      <Td className="table_body_row_item">{item.bathrooms}</Td>
                      <Td className="table_body_row_item">{item.lounge}</Td>
                      <Td className="table_body_row_item">{item.conditioners}</Td>
                      <Td className="table_body_row_item">{item.kitchen}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </Card>
      <Modal isOpen={isOpen && !show} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth='700px'>
          <ModalCloseButton />
          <ModalBody>
            <CreateUnit ownerId={owenerId}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UnitsTable;
