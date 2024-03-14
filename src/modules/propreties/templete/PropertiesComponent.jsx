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
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../../../assets/styels/components/Table.scss";
import "../../../assets/styels/components/page.scss";
import {
  AddIcon,
  CalendarIcon,
  ChevronDownIcon,
  DragHandleIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import CreateProperty from "./CreateProperty";
import useClosePopUps from "../../../store/useClosePopups";
import money from "../../../assets/icons-svgs/money.svg";
import user from "../../../assets/images/user.png";
import CardWithNumber from "../../../components/Cards/CardWithNumber";
import Pagination from "../../../components/shared/Pagination";
import useProperties from "../hooks/useAllProperties";
import CardWithImg from "../../../components/Cards/CardWithImg";

const PropertiesComponent = ({ data, owenerId }) => {
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { show, toggleShow } = useClosePopUps();
  const [isGrid, setIsGrid] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { PropertiesData, isLoading, PropertiesRefetch } = useProperties({
    pageNo: currentPage,
    limit: limit,
  });
  useEffect(() => {
    PropertiesRefetch();
    if (show && !isLoading) {
      PropertiesRefetch();
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

  useEffect(() => {
    //console.log(show )
  }, [show]);
  return (
    <>
      <div className="page">
        <div className="page_container">
          <div className="page_container_header">
            <div className="page_container_header__title">
              {" "}
              العقارات/الوحدات{" "}
            </div>
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
                  <Tab>عقارات</Tab>
                  <Tab>وحدات</Tab>
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

                      <div className="page_container_table__header__switcher">
                        <div className="page_container_table__header__switcher_grid">
                          <Button onClick={() => setIsGrid(false)}>
                            <CalendarIcon />
                          </Button>
                        </div>
                        <div className="page_container_table__header__switcher_table">
                          <Button onClick={() => setIsGrid(true)}>
                            <DragHandleIcon />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="page_container_table__content">
                      {!isGrid ? (
                        <>
                          <TableContainer
                            overflowY="auto"
                            overflowX="scroll"
                            minHeight="340px"
                            maxHeight="340px"
                          >
                            <Table className="table" variant="simple">
                              <Thead className="table_header">
                                <Tr>
                                  <Th className="table_header_item">Name</Th>
                                  <Th className="table_header_item">address</Th>
                                  <Th className="table_header_item">units</Th>
                                  <Th className="table_header_item">
                                    instrument number
                                  </Th>
                                  <Th className="table_header_item">
                                    postalCode
                                  </Th>
                                  <Th className="table_header_item">
                                    block number
                                  </Th>
                                  <Th className="table_header_item">street</Th>
                                  <Th className="table_header_item">
                                    district
                                  </Th>
                                </Tr>
                              </Thead>
                              <Tbody className="table_body">
                                {PropertiesData &&
                                  PropertiesData?.properties?.map(
                                    (item, index) => (
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
                                              instrumentNumber:
                                                item.instrumentNumber,
                                              postalCode: item.postalCode,
                                              blockNumber: item.blockNumber,
                                              street: item.street,
                                              subNumber: item.subNumber,
                                              district: item.district,
                                              units: item.units,
                                              owenerId: owenerId
                                                ? owenerId
                                                : item?.owenerId,
                                              city: item?.city,
                                            },
                                          });
                                        }}
                                      >
                                        <Td className="table_body_row_item">
                                          {item.name}
                                        </Td>
                                        <Td className="table_body_row_item">
                                          {item.address}
                                        </Td>
                                        <Td className="table_body_row_item">
                                          {item.unitsCount}
                                        </Td>
                                        <Td className="table_body_row_item">
                                          {item.instrumentNumber}
                                        </Td>
                                        <Td className="table_body_row_item">
                                          {item.postalCode}
                                        </Td>
                                        <Td className="table_body_row_item">
                                          {item.blockNumber}
                                        </Td>
                                        <Td className="table_body_row_item">
                                          {item.street}
                                        </Td>
                                        <Td className="table_body_row_item">
                                          {item.subNumber}
                                        </Td>
                                        <Td className="table_body_row_item">
                                          {item.district}
                                        </Td>
                                      </Tr>
                                    )
                                  )}
                              </Tbody>
                            </Table>
                          </TableContainer>
                        </>
                      ) : (
                        <>
                          <div className="page_container_table__content__grid">
                            {PropertiesData &&
                              PropertiesData?.properties?.map((item, index) => (
                                <CardWithImg
                                  key={index}
                                  address={item.address}
                                  title={item.name}
                                  price={item.id}
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
                                        units: item.units,
                                        owenerId: owenerId
                                          ? owenerId
                                          : item?.owenerId,
                                        city: item?.city,
                                      },
                                    });
                                  }}
                                ></CardWithImg>
                              ))}
                          </div>
                        </>
                      )}

                      {
                        <Pagination
                          totalCount={PropertiesData?.pagination.count}
                          currentPage={currentPage}
                          pageSize={10}
                          onPageChange={handlePageChange}
                        />
                      }
                    </div>
                  </TabPanel>
                  <TabPanel></TabPanel>
                </TabPanels>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen && !show} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth="700px">
          <ModalCloseButton />
          <ModalBody>
            <CreateProperty propOwenerId={owenerId} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PropertiesComponent;
