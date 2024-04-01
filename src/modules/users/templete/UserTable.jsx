import {
  Button,
  Card,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../../../assets/styels/components/Table.scss";
import { AddIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import CreateUser from "./CreateUser";
import useClosePopUps from "../../../store/useClosePopups";
import { USER_ROLES } from "../../../enums/UserRoles";
import money from "../../../assets/icons-svgs/money.svg";
import user from "../../../assets/images/user.png";
import CardWithNumber from "../../../components/Cards/CardWithNumber";
import Pagination from "../../../components/shared/Pagination";
import useUsers from "../hooks/useUsers";
import CreateOwner from "../../owners/templete/CreateOwner";

const UserTable = ({ data }) => {
  const CardsDemo = [
    {
      img: money,
      bg: "#CFB2FE",
      title: "3450 ر.س",
      desc: "مجموع الإيجار",
    },
    {
      img: money,
      bg: "#CFB2FE",
      title: "3450 ر.س",
      desc: "مجموع الإيجار",
    },
    {
      img: money,
      bg: "#CFB2FE",
      title: "3450 ر.س",
      desc: "مجموع الإيجار",
    },
  ];
  const navigate = useNavigate();
  const {
    isOpen: isOpenUserModal,
    onOpen: onOpenUserModal,
    onClose: onCloseUserModal,
  } = useDisclosure();
  const {
    isOpen: isOpenOwnerModal,
    onOpen: onOpenOwnerModal,
    onClose: onCloseOwnerModal,
  } = useDisclosure();

  const { show, toggleShow } = useClosePopUps();

  const openUserPopup = () => {
    onOpenUserModal();
    if (show) {
      toggleShow();
    }
  };
  const openOwnerPopup = () => {
    onOpenOwnerModal();
    if (show) {
      toggleShow();
    }
  };

  //user fetch data
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const userlimit = 10;

  const {
    usersData: usersDataType,
    usersisLoading: userDataLodaing,
    usersRefetch: userDataReftech,
  } = useUsers({
    pageNo: currentUserPage,
    limit: userlimit,
  });

  useEffect(() => {
    userDataReftech();
    if (show && !userDataLodaing) {
      userDataReftech();
    }
  }, [currentUserPage, show]);

  const handlePageUserChange = (page) => {
    setCurrentUserPage(page);
  };
  //owner fetch data
  const [currentOwnerPage, setCurrentOwnerPage] = useState(1);
  const ownerlimit = 10;
  const {
    usersData: ownerDataType,
    usersisLoading: ownerDataLodaing,
    usersRefetch: ownerDataReftech,
  } = useUsers({
    pageNo: currentOwnerPage,
    limit: ownerlimit,
  });

  useEffect(() => {
    ownerDataReftech();
    if (show && !ownerDataLodaing) {
      ownerDataReftech();
    }
  }, [currentOwnerPage, show]);

  const handlePageOwnerChange = (page) => {
    setCurrentOwnerPage(page);
  };

  useEffect(() => {
    //console.log(show )
  }, [show]);

  return (
    <>
      <div className="page">
        <div className="page_container">
          <div className="page_container_header">
            <div className="page_container_header__title">المستخدمين</div>
            <div className="page_container_header__icons">
              <img src={user} alt="user" width="40px" height="40px" />
            </div>
          </div>
          <div className="page_container_cards">
            {CardsDemo?.map((card, index) => (
              <div className="page_container_cards_card">
                <CardWithNumber
                  key={index}
                  bg={card.bg}
                  desc={card.desc}
                  icon={card.img}
                  number={card.title}
                ></CardWithNumber>
              </div>
            ))}
          </div>

          <div className="page_container_table">
            <Card>
              <Tabs>
                <TabList>
                  <Tab>المستأجرين</Tab>
                  <Tab>ملاك العقار</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <div className="page_container_table__header">
                      <div className="page_container_table__header__btns">
                        <Button
                          leftIcon={<AddIcon />}
                          className="page_container_table__header__btns__add"
                          bg="#194C81"
                          dir="rtl"
                          onClick={() => {
                            openUserPopup();
                          }}
                        >
                          إضافة جديد
                        </Button>
                        <Menu>
                          <MenuButton
                            as={Button}
                            marginRight="8px"
                            marginLeft="8px"
                            rightIcon={<ChevronDownIcon />}
                          >
                            فرز حسب
                          </MenuButton>
                          <MenuList>
                            <MenuItem>الاسم</MenuItem>
                            <MenuItem>العنوان</MenuItem>
                            <MenuItem>التاريخ</MenuItem>
                          </MenuList>
                        </Menu>

                        <Menu>
                          <MenuButton
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                          >
                            ترتيب حسب
                          </MenuButton>
                          <MenuList>
                            <MenuItem>الاسم</MenuItem>
                            <MenuItem>العنوان</MenuItem>
                            <MenuItem>التاريخ</MenuItem>
                          </MenuList>
                        </Menu>
                      </div>
                      <div className="page_container_table__header__search">
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <SearchIcon color="gray.300" />
                          </InputLeftElement>
                          <Input type="text" placeholder="" />
                        </InputGroup>
                      </div>
                    </div>

                    <div className="page_container_table__content">
                      <TableContainer
                        width="100%"
                        overflowY="auto"
                        overflowX="auto"
                        minHeight="340px"
                        maxHeight="340px"
                      >
                        <Table className="table" variant="simple">
                          <Thead className="table_header">
                            <Tr>
                              <Th className="table_header_item">الاسم </Th>
                              <Th className="table_header_item">
                                الهوية الوطنية
                              </Th>
                              <Th className="table_header_item">رقم الجوال</Th>
                              <Th className="table_header_item">قيمة المسدد</Th>
                              <Th className="table_header_item">
                                موعد سداد الاستحقاق
                              </Th>
                              <Th className="table_header_item">اسم العقار </Th>

                              <Th className="table_header_item">
                                البريد الإلكتروني
                              </Th>
                            </Tr>
                          </Thead>
                          <Tbody className="table_body">
                            {usersDataType &&
                              usersDataType?.users
                                ?.filter((i) => (i.role = USER_ROLES.TENANT))
                                .map((item, index) => (
                                  <Tr
                                    key={index}
                                    className="table_body_row"
                                    onClick={() => {}}
                                  >
                                    <Td className="table_body_row_item">
                                      {item.firstNameAr}
                                    </Td>
                                    <Td className="table_body_row_item">-</Td>
                                    <Td className="table_body_row_item">
                                      {item.phoneNumber}
                                    </Td>
                                    <Td className="table_body_row_item">-</Td>
                                    <Td className="table_body_row_item">-</Td>
                                    <Td className="table_body_row_item">
                                      {item?.ownedUnits[0]?.name}
                                    </Td>
                                    <Td className="table_body_row_item">
                                      {item?.email}
                                    </Td>
                                  </Tr>
                                ))}
                          </Tbody>
                        </Table>
                      </TableContainer>

                      {
                        <Pagination
                          totalCount={usersDataType?.paginationOption.count}
                          currentPage={currentUserPage}
                          pageSize={10}
                          onPageChange={handlePageUserChange}
                        />
                      }
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="page_container_table__header">
                      <div className="page_container_table__header__btns">
                        <Button
                          leftIcon={<AddIcon />}
                          className="page_container_table__header__btns__add"
                          bg="#194C81"
                          dir="rtl"
                          onClick={() => {
                            openOwnerPopup();
                          }}
                        >
                          إضافة جديد
                        </Button>
                        <Menu>
                          <MenuButton
                            as={Button}
                            marginRight="8px"
                            marginLeft="8px"
                            rightIcon={<ChevronDownIcon />}
                          >
                            فرز حسب
                          </MenuButton>
                          <MenuList>
                            <MenuItem>الاسم</MenuItem>
                            <MenuItem>العنوان</MenuItem>
                            <MenuItem>التاريخ</MenuItem>
                          </MenuList>
                        </Menu>

                        <Menu>
                          <MenuButton
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                          >
                            ترتيب حسب
                          </MenuButton>
                          <MenuList>
                            <MenuItem>الاسم</MenuItem>
                            <MenuItem>العنوان</MenuItem>
                            <MenuItem>التاريخ</MenuItem>
                          </MenuList>
                        </Menu>
                      </div>
                      <div className="page_container_table__header__search">
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <SearchIcon color="gray.300" />
                          </InputLeftElement>
                          <Input type="text" placeholder="" />
                        </InputGroup>
                      </div>
                    </div>

                    <div className="page_container_table__content">
                      <TableContainer
                        width="100%"
                        overflowY="auto"
                        overflowX="auto"
                        minHeight="340px"
                        maxHeight="340px"
                      >
                        <Table className="table" variant="simple">
                          <Thead className="table_header">
                            <Tr>
                              <Th className="table_header_item">الاسم </Th>
                              <Th className="table_header_item">
                                الهوية الوطنية
                              </Th>
                              <Th className="table_header_item">
                                البريد الإلكتروني
                              </Th>
                              <Th className="table_header_item">رقم الجوال</Th>
                              <Th className="table_header_item">
                                عقدد العقارات
                              </Th>
                              <Th className="table_header_item">
                                رقم عقد الوساطة
                              </Th>
                            </Tr>
                          </Thead>
                          <Tbody className="table_body">
                            {usersDataType &&
                              usersDataType?.users
                                ?.filter((i) => (i.role = USER_ROLES.OWNER))
                                .map((item, index) => (
                                  <Tr
                                    key={index}
                                    className="table_body_row"
                                    onClick={() => {}}
                                  >
                                    <Td className="table_body_row_item">
                                      {item.firstNameAr}
                                    </Td>
                                    <Td className="table_body_row_item">-</Td>
                                    <Td className="table_body_row_item">
                                      {item.email}
                                    </Td>
                                    <Td className="table_body_row_item">
                                      {item.phoneNumber}
                                    </Td>
                                    <Td className="table_body_row_item">
                                      {item?.ownedProperties?.length}
                                    </Td>
                                    <Td className="table_body_row_item">-</Td>
                                  </Tr>
                                ))}
                          </Tbody>
                        </Table>
                      </TableContainer>

                      {
                        <Pagination
                          totalCount={ownerDataType?.paginationOption.count}
                          currentPage={currentOwnerPage}
                          pageSize={10}
                          onPageChange={handlePageOwnerChange}
                        />
                      }
                    </div>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpenUserModal && !show} onClose={onCloseUserModal}>
        <ModalOverlay />
        <ModalContent maxWidth="700px">
          <ModalCloseButton />
          <ModalBody>
            <CreateUser />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenOwnerModal && !show} onClose={onCloseOwnerModal}>
        <ModalOverlay />
        <ModalContent maxWidth="700px">
          <ModalCloseButton />
          <ModalBody>
            <CreateOwner />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserTable;
