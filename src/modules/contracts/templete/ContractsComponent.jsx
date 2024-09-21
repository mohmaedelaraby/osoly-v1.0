import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,

  Modal,

  ModalBody,

  ModalContent,

  ModalOverlay,

  Select,
  Spinner,
  Stack,
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
import React, { useEffect, useState } from "react";
import "../../../assets/styels/components/Table.scss";
import {
  AddIcon,
  ChevronDownIcon,
  DeleteIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import CardWithNumber from "../../../components/Cards/CardWithNumber";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useTranslation } from "react-i18next";
import PageHeader from "../../../components/shared/PageHeader";
import { useDynamicColors } from "../../../hooks/useDynamicColors";
import financeIcon from "../../../assets/icons-svgs/finance.svg";
import CreateEnterpraiseUser from "./CreateContract";
import CreateContract from "./CreateContract";

const ContractsTable = () => {
  const { t } = useTranslation();
  const { primary, secondry } = useDynamicColors();

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const demoContracts = [
    {
      contractLimit: 12,
      ownerName: "Mohamed",
      ownerNationalId: "410092100",
      renter: "Ahmed",
      contractsNumber: "13300110200",
      commetion: "10",
      nationalty: "سعودي",
      contractDuration: "شهري",
      hasWater: true,
      hasElec: true,
    },

    {
      contractLimit: 10,
      ownerName: "Ali",
      ownerNationalId: "415292100",
      renter: "Waleed",
      contractsNumber: "98760110200",
      commetion: "70",
      nationalty: "سعودي",
      contractDuration: "شهري",
      hasWater: true,
      hasElec: false,
    },

    {
      contractLimit: 12,
      ownerName: "Osama",
      ownerNationalId: "5510099800",
      renter: "Omar",
      contractsNumber: "88311110980",
      commetion: "9",
      nationalty: "سعودي",
      contractDuration: "شهري",
      hasWater: true,
      hasElec: true,
    },
  ];
  const openCreatePopup = () => {
    onOpenModal();
  };
  return (
    <>
      <div className="page">
        <div className="page_container">
          <div className="page_container_header">
            <PageHeader title={t("enterprise.page.header")}></PageHeader>
          </div>
          <div className="page_container_cards">
            <CardWithNumber
              icon={financeIcon}
              number={10}
              desc={t("contracts.cards.total")}
              bg={"#E2FBD7"}
            ></CardWithNumber>
            <CardWithNumber
              icon={financeIcon}
              number={20}
              desc={t("contracts.cards.total_two")}
              bg={"#E2FBD7"}
            ></CardWithNumber>
            <CardWithNumber
              icon={financeIcon}
              number={44}
              desc={t("contracts.cards.total_three")}
              bg={"#E2FBD7"}
            ></CardWithNumber>
          </div>

          <div className="page_container_table">
            <Card paddingBottom="16px">
              <div className="page_container_table__header p-16 pb-0">
                <div className="page_container_table__header__btns">
                  <Button
                    rightIcon={<AddIcon />}
                    className="page_container_table__header__btns__add"
                    bg={primary}
                    dir="rtl"
                    onClick={() => {
                        openCreatePopup()
                    }}
                  >
                    <span className="pl-8 fo_secondry">
                      {t("contracts.page.add_contract")}
                    </span>
                  </Button>

                 
                </div>
                <div className="page_container_table__header__search">
                  <InputGroup>
                    <InputRightElement pointerEvents="none">
                      <SearchIcon color="gray.300" />
                    </InputRightElement>
                    <Input
                      type="text"
                      placeholder={t("search.by_contract_name")}
                      onChange={(e) => {
                        setTimeout(() => {}, 200);
                      }}
                    />
                  </InputGroup>
                </div>
              </div>

              <div className="page_container_table__content">
                <>
                  <TableContainer
                    overflowY="auto"
                    overflowX="scroll"
                    minHeight="340px"
                    maxHeight="340px"
                    width="100%"
                  >
                    <Table className="table" variant="simple">
                      <Thead className="table_header">
                        <Tr>
                          <Th className="table_header_item">
                            {t("contracts.table.limit")}
                          </Th>
                          <Th className="table_header_item">
                            {t("contracts.table.owner_name")}
                          </Th>
                          <Th className="table_header_item">
                            {t("contracts.table.owner_id")}
                          </Th>
                          <Th className="table_header_item">
                            {t("contracts.table.renter")}
                          </Th>
                          <Th className="table_header_item">
                            {t("contracts.table.contracts_number")}
                          </Th>
                          <Th className="table_header_item">
                            {t("contracts.table.commetion")}
                          </Th>
                          <Th className="table_header_item">
                            {t("contracts.table.nationalty")}
                          </Th>
                          <Th className="table_header_item">
                            {t("contracts.table.contract_Duration")}
                          </Th>
                          <Th className="table_header_item">
                            {t("contracts.table.has_water")}
                          </Th>
                          <Th className="table_header_item">
                            {t("contracts.table.has_elec")}
                          </Th>
                         {/*  <Th className="table_header_item"> </Th> */}
                        </Tr>
                      </Thead>
                      <Tbody className="table_body">
                        {true ? (
                          demoContracts?.map((item) => (
                            <>
                              <Tr className="table_body_row">
                                <Td className="table_body_row_item">
                                  {item?.contractDuration}
                                </Td>
                                <Td className="table_body_row_item">
                                  {item?.ownerName}
                                </Td>
                                <Td className="table_body_row_item">
                                  {item?.ownerNationalId}
                                </Td>
                                <Td className="table_body_row_item">
                                  {item?.renter}
                                </Td>
                                <Td className="table_body_row_item">
                                  {item?.contractsNumber}
                                </Td>
                                <Td className="table_body_row_item">
                                  {item?.commetion}
                                </Td>
                                <Td className="table_body_row_item">
                                  {item?.nationalty}
                                </Td>
                                <Td className="table_body_row_item">
                                  {item?.contractDuration}
                                </Td>
                                <Td className="table_body_row_item">
                                  <Checkbox
                                    isChecked={item?.hasWater}
                                    isDisabled
                                  ></Checkbox>
                                </Td>
                                <Td className="table_body_row_item">
                                  <Checkbox
                                    isChecked={item?.hasElec}
                                    isDisabled
                                  ></Checkbox>
                                </Td>

                                {/* <Td className="table_body_row_item_btns">
                                  <Stack
                                    alignItems={"center"}
                                    direction={"row"}
                                    spacing={4}
                                  >
                                    <Button
                                      className="table_body_row_item_btns_deletebtn"
                                      width={"25%"}
                                      rightIcon={<DeleteIcon />}
                                      color={"white"}
                                      variant="solid"
                                      bg={"#CC3636"}
                                      alignItems="center"
                                      paddingRight="8px"
                                      justifyContent="center"
                                      onClick={() => {
                                        //openDeletePopup(item);
                                      }}
                                    ></Button>
                                    <Button
                                      className="table_body_row_item_btns_editbtn"
                                      width={"25%"}
                                      rightIcon={<EditOutlinedIcon />}
                                      color={"white"}
                                      variant="solid"
                                      alignItems="center"
                                      justifyContent="center"
                                      paddingRight="8px"
                                      bg={"#194C81"}
                                      onClick={() => {
                                        //openEditPopup(item);
                                      }}
                                    ></Button>
                                  </Stack>
                                </Td> */}
                              </Tr>
                            </>
                          ))
                        ) : (
                          <>
                            <div className="flex-center spinner-table">
                              <Spinner
                                thickness="4px"
                                speed="0.65s"
                                emptyColor="gray.200"
                                color="blue.500"
                                size="xl"
                              />
                            </div>
                          </>
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </>

                {/*  {
                    <Pagination
                      totalCount={30}
                      currentPage={3}
                      pageSize={10}
                      onPageChange={handlePageChange}
                    />
                  } */}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* create popup */}
      <Modal isOpen={isOpenModal} onClose={onCloseModal}>
          <ModalOverlay />
          <ModalContent maxWidth="700px">
            <ModalBody padding="0px">
              <CreateContract
                onClose={onCloseModal}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      {/* edit popup */}
      {/*  <Modal isOpen={isOpenModalEdit} onClose={onCloseModalEdit}>
          <ModalOverlay />
          <ModalContent maxWidth="700px">
            <ModalBody padding="0px">
              <EditEnterpraiseUser
                onClose={onCloseModalEdit}
                plans={PlansData?.plans}
                item={selectedPlan}
              />
            </ModalBody>
          </ModalContent>
        </Modal> */}
      {/* delete popup */}
      {/*  <Modal isOpen={isOpenModalDelte} onClose={onCloseModalDelte}>
          <ModalOverlay />
          <ModalContent maxWidth="700px">
            <ModalBody padding="0px">
              <DeleteEnterpraiseUser
                onClose={onCloseModalDelte}
                plans={PlansData?.plans}
                item={selectedPlan}
              />
            </ModalBody>
          </ModalContent>
        </Modal> */}
    </>
  );
};

export default ContractsTable;
