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
import CreateAd from "./CreateAd";
import { ads } from "../../../mocks/ads";
import useClosePopUps from "../../../store/useClosePopups";

const AdsTable = ({ data }) => {
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
  }, [show]);

  return (
    <>
      <CardHeader>
        <div className="tabel_header">
          <span className="tabel_header_text">
            <Text>Ads</Text>
          </span>
          <span className="tabel_header_addBtn">
            <Button
              onClick={onOpen}
              leftIcon={<AddIcon />}
              className="tabel_header_addBtn_btn"
            >
              Add Ad
            </Button>
          </span>
        </div>
      </CardHeader>
      <Card>
        <Card>
          <CardBody>
            <TableContainer
              overflowY="scroll"
              overflowX="scroll"
              minHeight="340px"
              maxHeight="340px"
            >
              <Table className="table" variant="simple">
                <Thead className="table_header">
                  <Tr>
                    <Th className="table_header_item">Title</Th>
                    <Th className="table_header_item">Sub title</Th>
                    <Th className="table_header_item">Url</Th>
                    <Th className="table_header_item">Index</Th>
                  </Tr>
                </Thead>
                <Tbody className="table_body">
                  {data ? (
                    data.map((item, index) => (
                      <Tr
                      key={index}
                        className="table_body_row"
                        onClick={() => {
                          navigate("/ad", {
                            state: {
                              id: item.id,
                              index: item.index,
                              url: item.url,
                              image: item.image,
                              title: item.title,
                              subTitle:item.subTitle,
                            },
                          });
                        }}
                      >
                        <Td className="table_body_row_item">{item.title}</Td>
                        <Td className="table_body_row_item">{item.subTitle}</Td>
                        <Td className="table_body_row_item">{item.url}</Td>
                        <Td className="table_body_row_item">{item.index}</Td>
                      </Tr>
                    ))
                  ) : (
                    <></>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </Card>
      <Modal isOpen={isOpen && !show} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody maxWidth="700px">
            <CreateAd />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdsTable;
