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
import React, { useEffect } from "react";
import "../../../assets/styels/components/Table.scss";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

import CreateProperty from "./CreateProperty";
import useClosePopUps from "../../../store/useClosePopups";

const PropertyTable = ({data , owenerId}) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { show, toggleShow } = useClosePopUps();

  const openPopup = () => {
    onOpen();
    if (show) {
      toggleShow();
    }
  };

  useEffect(() => {
    //console.log(show )
    console.log("d",data)
  }, [show]);
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
              onClick={()=>{openPopup()}}
            >
              Add Proberty
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
                    <Th className="table_header_item">Name</Th>
                    <Th className="table_header_item">address</Th>
                    <Th className="table_header_item">units</Th>
                    <Th className="table_header_item">instrument number</Th>
                    <Th className="table_header_item">postalCode</Th>
                    <Th className="table_header_item">block number</Th>
                    <Th className="table_header_item">street</Th>
                    <Th className="table_header_item">district</Th>
                  </Tr>
                </Thead>
                <Tbody className="table_body">
                  {data && data.map((item, index) => (
                    <Tr
                      key={index}
                      className="table_body_row"
                      onClick={() => {
                        navigate("/property", {
                          state: {
                            id: item.id,
                            name: item.name,
                            address: item.address,
                            unitsCount: item.unitsCount,
                            instrumentNumber: item.instrumentNumber,
                            postalCode: item.postalCode,
                            blockNumber: item.blockNumber,
                            street: item.street,
                            subNumber: item.subNumber,
                            district: item.district,
                            units:item.units,
                            owenerId:owenerId?owenerId : item?.owenerId
                          },
                        });
                      }}
                    >
                      <Td className="table_body_row_item">{item.name}</Td>
                      <Td className="table_body_row_item">{item.address}</Td>
                      <Td className="table_body_row_item">{item.unitsCount}</Td>
                      <Td className="table_body_row_item">{item.instrumentNumber}</Td>
                      <Td className="table_body_row_item">{item.postalCode}</Td>
                      <Td className="table_body_row_item">{item.blockNumber}</Td>
                      <Td className="table_body_row_item">{item.street}</Td>
                      <Td className="table_body_row_item">{item.subNumber}</Td>
                      <Td className="table_body_row_item">{item.district}</Td>
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
            <CreateProperty owenerID={owenerId}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PropertyTable;
