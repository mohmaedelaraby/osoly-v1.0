import {
  Button,
  Card,
  Checkbox,
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
import CreateUnit from "../../units/templete/CreateUnit";
import useUnits from "../../units/hooks/useUnits";

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

  const {
    isOpen: isOpenProperyModal,
    onOpen: onOpenProperyModal,
    onClose: onCloseProperyModal,
  } = useDisclosure();
  const {
    isOpen: isOpenUnitModal,
    onOpen: onOpenUnitModal,
    onClose: onCloseUnitModal,
  } = useDisclosure();

  const { show, toggleShow } = useClosePopUps();
  const [isGrid, setIsGrid] = useState(false);

  const [currentPropertyPage, setCurrentPropertyPage] = useState(1);
  const propertylimit = 10;

  const { PropertiesData, isPropertiesLoading, PropertiesRefetch } =
    useProperties({
      pageNo: currentPropertyPage,
      limit: propertylimit,
    });
  useEffect(() => {
    PropertiesRefetch();
    if (show && !isPropertiesLoading) {
      PropertiesRefetch();
    }
  }, [currentPropertyPage, show]);

  const handlePropertyPageChange = (page) => {
    setCurrentPropertyPage(page);
  };

  const openPropertyPopup = () => {
    onOpenProperyModal();
    if (show) {
      toggleShow();
    }
  };
  const openUnitPopup = () => {
    onOpenUnitModal();
    if (show) {
      toggleShow();
    }
  };

  useEffect(() => {
    console.log(show);
  }, [show]);

  //units
  const [currentUnitPage, setCurrentUnitPage] = useState(1);

  const unitLimit = 10;

  const { unitsData, isUnitsLoading, unitsReftch } = useUnits({
    pageNo: currentUnitPage,
    limit: unitLimit,
  });
  useEffect(() => {
    unitsReftch();
    if (show && !isUnitsLoading) {
      unitsReftch();
    }
  }, [currentUnitPage, show]);

  const handleUnitPageChange = (page) => {
    setCurrentUnitPage(page);
  };
  return (
    <>
      <div className="page">
        <div className="page_container">
          <div className="page_container_header">
            <div className="page_container_header__title">العقارات/الوحدات</div>
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
                            openPropertyPopup();
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
                            width="100%"
                            overflowY="auto"
                            overflowX="auto"
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
                                  PropertiesData?.updatedProperties?.map(
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
                              PropertiesData?.updatedProperties?.map(
                                (item, index) => (
                                  <CardWithImg
                                    key={index}
                                    address={item.address}
                                    title={item.name}
                                    price={item.id}
                                    isBtns={false}
                                    isVertical={false}
                                    currncy={"وحده"}
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
                                  ></CardWithImg>
                                )
                              )}
                          </div>
                        </>
                      )}

                      {
                        <Pagination
                          totalCount={PropertiesData?.pagination.count}
                          currentPage={currentPropertyPage}
                          pageSize={10}
                          onPageChange={handlePropertyPageChange}
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
                            openUnitPopup();
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
                            width="100%"
                            overflowY="auto"
                            overflowX="auto"
                            minHeight="340px"
                            maxHeight="340px"
                          >
                            <Table className="table" variant="simple">
                              <Thead className="table_header">
                                <Tr>
                                  <Th className="table_header_item">الاسم</Th>
                                  <Th className="table_header_item">
                                    موعد الاستحقاق
                                  </Th>
                                  <Th className="table_header_item">الإيجار</Th>
                                  <Th className="table_header_item">العنوان</Th>
                                  <Th className="table_header_item">المساحة</Th>
                                  <Th className="table_header_item">
                                    حساب فاتورة الكهرباء
                                  </Th>
                                  <Th className="table_header_item">
                                    حساب المياه
                                  </Th>
                                  <Th className="table_header_item">الغرف</Th>
                                  <Th className="table_header_item">المطبخ</Th>
                                  <Th className="table_header_item">
                                    التكييفات
                                  </Th>
                                </Tr>
                              </Thead>
                              <Tbody className="table_body">
                                {unitsData &&
                                  unitsData?.units?.map((item, index) => (
                                    <Tr
                                      key={index}
                                      className="table_body_row"
                                      onClick={() => {
                                        navigate("/unit", {
                                          state: {
                                            id: item.id,
                                            name: item.name,
                                            rent: item.rent,
                                            rentCollectionDate:
                                              item.rentCollectionDate,
                                            electricityAccount:
                                              item.electricityAccount,
                                            waterAccount: item.waterAccount,
                                            address: item.address,
                                            space: item.space,
                                            rooms: item.rooms,
                                            bathrooms: item.bathrooms,
                                            lounge: item.lounge,
                                            conditioners: item.conditioners,
                                            kitchen: item.kitchen,
                                            waterCost: item.waterCost,
                                            propertyId: item?.propertyId,
                                            ownerId: item?.ownerId,
                                          },
                                        });
                                      }}
                                    >
                                      <Td className="table_body_row_item">
                                        {item.name}
                                      </Td>
                                      <Td className="table_body_row_item">
                                        {item.rentCollectionDate}
                                      </Td>
                                      <Td className="table_body_row_item">
                                        {item.rent}
                                      </Td>
                                      <Td className="table_body_row_item">
                                        {item.address}
                                      </Td>
                                      <Td className="table_body_row_item">
                                        {item.space}
                                      </Td>
                                      <Td className="table_body_row_item">
                                        {item.electricityAccount}
                                      </Td>
                                      <Td className="table_body_row_item">
                                        {item.waterAccount}
                                      </Td>
                                      <Td className="table_body_row_item">
                                        {item.rooms}
                                      </Td>
                                      
                                      <Td className="table_body_row_item">{item.kitchen ? (<><Checkbox defaultChecked isDisabled></Checkbox></>) : (<><Checkbox isDisabled></Checkbox></>)}</Td>
                                      <Td className="table_body_row_item">{item.conditioners}</Td>
                                    </Tr>
                                  ))}
                              </Tbody>
                            </Table>
                          </TableContainer>
                        </>
                      ) : (
                        <>
                          <div className="page_container_table__content__grid">
                            {unitsData &&
                              unitsData?.units?.map((item, index) => (
                                <CardWithImg
                                  key={index}
                                  address={item.address}
                                  title={item.name}
                                  price={item.rent}
                                  isBtns={false}
                                  isVertical={false}
                                  currncy={"ريال/شهري"}
                                  onClick={() => {
                                    navigate("/unit", {
                                      state: {
                                        id: item.id,
                                        name: item.name,
                                        rent: item.rent,
                                        rentCollectionDate:
                                          item.rentCollectionDate,
                                        electricityAccount:
                                          item.electricityAccount,
                                        waterAccount: item.waterAccount,
                                        address: item.address,
                                        space: item.space,
                                        rooms: item.rooms,
                                        bathrooms: item.bathrooms,
                                        lounge: item.lounge,
                                        conditioners: item.conditioners,
                                        kitchen: item.kitchen,
                                        waterCost: item.waterCost,
                                        propertyId: item?.propertyId,
                                        ownerId: item?.ownerId,
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
                          totalCount={unitsData?.pagination.count}
                          currentPage={currentUnitPage}
                          pageSize={10}
                          onPageChange={handleUnitPageChange}
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

      <Modal isOpen={isOpenProperyModal && !show} onClose={onCloseProperyModal}>
        <ModalOverlay />
        <ModalContent maxWidth="700px">
          <ModalCloseButton />
          <ModalBody>
            <CreateProperty propOwenerId={owenerId} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenUnitModal && !show} onClose={onCloseUnitModal}>
        <ModalOverlay />
        <ModalContent maxWidth="700px">
          <ModalCloseButton />
          <ModalBody>
            <CreateUnit />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PropertiesComponent;
