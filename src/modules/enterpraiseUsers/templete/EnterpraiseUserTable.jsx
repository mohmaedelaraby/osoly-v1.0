import {
  Button,
  Card,
  CardBody,
  CardHeader,
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
  ModalHeader,
  ModalOverlay,
  TabList,
  TabPanel,
  TabPanels,
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
import { AddIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { enterprise_users } from "../../../mocks/enterPraiseUsers";
import CreateEnterpraiseUser from "./CreateEnterpraiseUser";
import CardWithNumber from "../../../components/Cards/CardWithNumber";
import money from "../../../assets/icons-svgs/money.svg";
import user from "../../../assets/images/user.png";
import Pagination from "../../../components/shared/Pagination";
import CardWithImg from "../../../components/Cards/CardWithImg";
import useClosePopUps from "../../../store/useClosePopups";
import useEnterPrisesUsers from "../hooks/useEnterprisesUsers";

const UserEnterpraiseTable = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
 const { show, toggleShow } = useClosePopUps();

  
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { usersEnterPrisesData, usersEnterPrisesisLoading, usersEnterPrisesRefetch } = useEnterPrisesUsers({
    pageNo: currentPage,
    limit: limit,
  });
  
  useEffect(() => {
    console.log("first")
    usersEnterPrisesRefetch();
    console.log("-->",usersEnterPrisesData)
    if (show && !usersEnterPrisesisLoading) {
      usersEnterPrisesRefetch();
      console.log("-->",usersEnterPrisesData)
    }
    
  }, [currentPage, show]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openPopup = () => {
    onOpen();
    if (show) {
      toggleShow();
    }
  };
 

  const CardsDemo = [
    {
      img: money,
      bg: "#CFB2FE",
      title: "3450",
      desc: "مجموع الإيجار",
    },
    {
      img: money,
      bg: "#CFB2FE",
      title: "3450",
      desc: "مجموع الإيجار",
    },
    {
      img: money,
      bg: "#CFB2FE",
      title: "3450",
      desc: "مجموع الإيجار",
    },
  ];

  return (
    <>
      <div className="page">
        <div className="page_container">
          <div className="page_container_header">
            <div className="page_container_header__title">المؤسسة</div>
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
            <Card paddingBottom='16px'>
                    <div className="page_container_table__header p-16 pb-0">
                      <div className="page_container_table__header__btns">
                        <Button
                          leftIcon={<AddIcon />}
                          className="page_container_table__header__btns__add"
                          bg="#194C81"
                          dir="rtl"
                          onClick={() => {
                            openPopup();
                          }}
                        >
                          إضافة جديد
                        </Button>
                        <Menu>
                          <MenuButton
                            as={Button}
                            marginRight='8px'
                            marginLeft='8px'
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
                    <>
                          <TableContainer
                            overflowY="auto"
                            overflowX="scroll"
                            minHeight="340px"
                            maxHeight="340px"
                            width='100%'
                          >
                            <Table className="table" variant="simple">
                              <Thead className="table_header">
                                <Tr>
                                <Th className="table_header_item">الاسم</Th>
                                  <Th className="table_header_item">عدد الوحدات</Th>
                                  <Th className="table_header_item">الباقة</Th>
                                  <Th className="table_header_item">تاريخ الإنتهاء</Th>
                                
                                </Tr>
                              </Thead>
                              <Tbody className="table_body">
                                {usersEnterPrisesData &&
                                  usersEnterPrisesData?.enterprises?.map(
                                    (item, index) => (
                                      <Tr
                                        key={index}
                                        className="table_body_row"
                                        onClick={() => {
                                          navigate("/enterprise", {
                                            state: {
                                              id: item.id,
                                              name: item.name,
                                              role: item.role,
                                              username: item.username,
                                             
                                            },
                                          });
                                        }}
                                      >
                                        <Td className="table_body_row_item">
                                          {item.name}
                                        </Td>
                                        <Td className="table_body_row_item">
                                          {item?.numOfUnits? item?.numOfUnits : 0 }
                                        </Td>
                                        <Td className="table_body_row_item">
                                        {item?.plan? item?.plan : 'no plan' }
                                        </Td>
                                        <Td className="table_body_row_item">
                                        {item?.endDate? item?.endDate : '0-0-0000' }
                                        </Td>
                                       
                                      </Tr>
                                    )
                                  )}
                              </Tbody>
                            </Table>
                          </TableContainer>
                        </>
                    

                      {
                        <Pagination
                          totalCount={usersEnterPrisesData?.pagination.count}
                          currentPage={currentPage}
                          pageSize={10}
                          onPageChange={handlePageChange}
                        />
                      }
                    </div>
                 
            </Card>
          </div>
        </div>
      </div>
     
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth="700px" >
          <ModalBody padding='0px'>
            <CreateEnterpraiseUser />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserEnterpraiseTable;
