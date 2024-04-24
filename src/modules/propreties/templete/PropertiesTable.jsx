import React, { useEffect, useState } from "react";
import CardWithImg from "../../../components/Cards/CardWithImg";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
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
import useProperties from "../hooks/useAllProperties";
import {
  AddIcon,
  ChevronDownIcon,
  DeleteIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import CreateProperty from "./CreateProperty";
import Pagination from "../../../components/shared/Pagination";
import EditProperty from "./EditProperty";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";

function PropertiesTable() {
  const [selectId, setSelectedId] = useState();
  const [isGrid, setIsGrid] = useState(false);

  //sorting and filtering local
  const sortItems = [
    "name",
    "unitsCount",
    "instrumentNumber",
    "postalCode",
    "blockNumber",
  ];

  const [sortByTmp, setSortByTmp] = useState(null);
  const [sortDirectionTmp, setSortDirectionTmp] = useState("asc");

  const [nameTmp, setNameTmp] = useState(null);
  const [addressTmp, setAddressTmp] = useState(null);
  const [unitsCountTmp, setUnitsCountTmp] = useState(null);
  const [instrumentNumberTmp, setInstrumentNumberTmp] = useState(null);
  const [cityTmp, setCityTmp] = useState(null);
  const [postalCodeTmp, setPostalCodeTmp] = useState(null);
  const [blockNumberTmp, setBlockNumberTmp] = useState(null);
  const [streetTmp, setStreetTmp] = useState(null);
  const [districtTmp, setDistrictTmp] = useState(null);
  //sorting and filtering param data
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [unitsCount, setUnitsCount] = useState(null);
  const [instrumentNumber, setInstrumentNumber] = useState(null);
  const [city, setCity] = useState(null);
  const [blockNumber, setBlockNumber] = useState(null);
  const [street, setStreet] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [district, setDistrict] = useState(null);

  const {
    isOpen: isOpenProperyModal,
    onOpen: onOpenProperyModal,
    onClose: onCloseProperyModal,
  } = useDisclosure();

  const {
    isOpen: isOpenProperyModalEdit,
    onOpen: onOpenProperyModalEdit,
    onClose: onCloseProperyModalEdit,
  } = useDisclosure();

  const [currentPropertyPage, setCurrentPropertyPage] = useState(1);
  const propertylimit = 10;

  const { PropertiesData, isPropertiesLoading, PropertiesRefetch } =
    useProperties({
      pageNo: currentPropertyPage,
      limit: propertylimit,
      sortBy: sortBy,
      sortDirection: sortDirection,
      name: name,
      address: address,
      street: street,
      unitsCount: unitsCount,
      district: district,
      instrumentNumber: instrumentNumber,
      city: city,
      blockNumber: blockNumber,
      postalCode: postalCode,
    });

  useEffect(() => {
    setTimeout(() => {
      PropertiesRefetch();
    }, 500);
  }, [
    currentPropertyPage,
    isOpenProperyModal,
    isOpenProperyModalEdit,
    name,
    address,
    street,
    sortBy,
    sortDirection,
    unitsCount,
    district,
    instrumentNumber,
    city,
    blockNumber,
    postalCode,
  ]);

  const handlePropertyPageChange = (page) => {
    setCurrentPropertyPage(page);
  };

  const openPropertyPopup = () => {
    onOpenProperyModal();
  };
  const openPropertyEditPopup = (user) => {
    setSelectedId(user.id);
    onOpenProperyModalEdit();
  };
  return (
    <>
      <div className="page_container_table__header">
        <div className="page_container_table__header__btns">
          <Button
            rightIcon={<AddIcon />}
            className="page_container_table__header__btns__add"
            bg="#194C81"
            onClick={() => {
              openPropertyPopup();
            }}
          >
            <span className="pl-8"> إضافة جديد</span>
          </Button>
          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              marginRight="8px"
              marginLeft="8px"
              bg={"white"}
              border={"1px solid #C8C9CC"}
              borderRadius="8px"
              rightIcon={<ChevronDownIcon />}
            >
              <span className="pl-8">فرز حسب</span>
            </MenuButton>
            <MenuList padding={"24px"} width="257px">
              <MenuItem>
                <FormControl className="form__input__container">
                  <FormLabel>
                    <Text className="form__input__container__label">
                      نوع الفرز
                    </Text>
                  </FormLabel>
                  <RadioGroup
                    onChange={setSortDirectionTmp}
                    value={sortDirectionTmp}
                  >
                    <Stack direction="row">
                      <Radio value="asc">تصاعدي</Radio>
                      <Radio value="desc">تنازلي</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </MenuItem>
              <div className="menu-select mb-24">
                <FormControl className="form__input__container">
                  <FormLabel>
                    <Text className="form__input__container__label">
                      فرز حسب
                    </Text>
                  </FormLabel>
                  <Select
                    name="sortBY"
                    onChange={(e) => {
                      setSortByTmp(e.target.value);
                      setTimeout(() => {}, 0);
                    }}
                  >
                    <option value={null}>فرز حسب</option>
                    {sortItems.map((item, index) => (
                      <option id={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <MenuItem closeOnSelect={true}>
                <Stack direction="row" width="100%" justify="space-between">
                  <Button
                    padding="0px 16px"
                    variant="solid"
                    color="white"
                    bg="#194C81"
                    type="submit"
                    onClick={() => {
                      setSortDirection(sortDirectionTmp);
                      setSortBy(sortByTmp);
                    }}
                  >
                    تطبيق
                  </Button>
                  <Button
                    onClick={() => {
                      setSortDirection("asc");
                      setSortDirectionTmp("asc");
                      setSortBy(null);
                      setSortByTmp(null);
                    }}
                    padding="0px 16px"
                    color={"#010B38"}
                    variant="outline"
                  >
                    مسح
                  </Button>
                </Stack>
              </MenuItem>
            </MenuList>
          </Menu>

          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              marginRight="8px"
              marginLeft="8px"
              bg={"white"}
              border={"1px solid #C8C9CC"}
              borderRadius="8px"
              rightIcon={<ChevronDownIcon />}
            >
              <span className="pl-8">ترتيب حسب</span>
            </MenuButton>
            <MenuList width="257px">
              <div className="menu-select-container">
                <div className="menu-select">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label">
                        ترتيب حسب الاسم
                      </Text>
                    </FormLabel>
                    <Input
                      name="subTitle"
                      type="text"
                      className="form__input__container__input"
                      placeholder=""
                      onChange={(e) => {
                        setNameTmp(e.target.value);
                      }}
                    />
                  </FormControl>
                </div>

                <div className="menu-select mt-8">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label">
                        ترتيب حسب العنوان
                      </Text>
                    </FormLabel>
                    <Input
                      name="subTitle"
                      type="text"
                      className="form__input__container__input"
                      placeholder=""
                      onChange={(e) => {
                        setAddressTmp(e.target.value);
                      }}
                    />
                  </FormControl>
                </div>

                <div className="menu-select mt-8">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label">
                        ترتيب حسب عدد الوحدات
                      </Text>
                    </FormLabel>
                    <Input
                      name="subTitle"
                      type="text"
                      className="form__input__container__input"
                      placeholder=""
                      onChange={(e) => {
                        setUnitsCountTmp(e.target.value);
                      }}
                    />
                  </FormControl>
                </div>

                <div className="menu-select mt-8">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label">
                        ترتيب حسب رقم الصك
                      </Text>
                    </FormLabel>
                    <Input
                      name="subTitle"
                      type="text"
                      className="form__input__container__input"
                      placeholder=""
                      onChange={(e) => {
                        setInstrumentNumberTmp(e.target.value);
                      }}
                    />
                  </FormControl>
                </div>

                <div className="menu-select mt-8">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label">
                        ترتيب حسب المدينه
                      </Text>
                    </FormLabel>
                    <Input
                      name="subTitle"
                      type="text"
                      className="form__input__container__input"
                      placeholder=""
                      onChange={(e) => {
                        setCityTmp(e.target.value);
                      }}
                    />
                  </FormControl>
                </div>

                <div className="menu-select mt-8">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label">
                        ترتيب حسب الرقم البريدي
                      </Text>
                    </FormLabel>
                    <Input
                      name="subTitle"
                      type="text"
                      className="form__input__container__input"
                      placeholder=""
                      onChange={(e) => {
                        setPostalCodeTmp(e.target.value);
                      }}
                    />
                  </FormControl>
                </div>

                <div className="menu-select mt-8">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label">
                        ترتيب حسب رقم العقار
                      </Text>
                    </FormLabel>
                    <Input
                      name="subTitle"
                      type="text"
                      className="form__input__container__input"
                      placeholder=""
                      onChange={(e) => {
                        setBlockNumberTmp(e.target.value);
                      }}
                    />
                  </FormControl>
                </div>

                <div className="menu-select mt-8">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label">
                        ترتيب حسب الشارع
                      </Text>
                    </FormLabel>
                    <Input
                      name="subTitle"
                      type="text"
                      className="form__input__container__input"
                      placeholder=""
                      onChange={(e) => {
                        setStreetTmp(e.target.value);
                      }}
                    />
                  </FormControl>
                </div>
                <div className="menu-select mt-8">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label">
                        ترتيب حسب الحي
                      </Text>
                    </FormLabel>
                    <Input
                      name="subTitle"
                      type="text"
                      className="form__input__container__input"
                      placeholder=""
                      onChange={(e) => {
                        setDistrictTmp(e.target.value);
                      }}
                    />
                  </FormControl>
                </div>
              </div>

              <MenuItem marginTop={"24px"} closeOnSelect={true}>
                <Stack direction="row" width="100%" justify="space-between">
                  <Button
                    padding="0px 16px"
                    variant="solid"
                    color="white"
                    bg="#194C81"
                    type="submit"
                    onClick={() => {
                      setAddress(addressTmp);
                      setName(nameTmp);
                      setBlockNumber(blockNumberTmp);
                      setCity(cityTmp);
                      setDistrict(districtTmp);
                      setInstrumentNumber(instrumentNumberTmp);
                      setPostalCode(postalCodeTmp);
                      setUnitsCount(unitsCountTmp);
                      setStreet(streetTmp);
                    }}
                  >
                    تطبيق
                  </Button>
                  <Button
                    onClick={() => {
                      setAddress(null);
                      setName(null);
                      setBlockNumber(null);
                      setCity(null);
                      setDistrict(null);
                      setInstrumentNumber(null);
                      setPostalCode(null);
                      setUnitsCount(null);
                      setStreet(null);
                    }}
                    padding="0px 16px"
                    color={"#010B38"}
                    variant="outline"
                  >
                    مسح
                  </Button>
                </Stack>
              </MenuItem>
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
          <div className="page_container_table__header__switcher_table">
            <Button
              backgroundColor="white"
              border="1px solid gray"
              padding="8px"
              onClick={() => setIsGrid(true)}
            >
              <GridViewOutlinedIcon />
            </Button>
          </div>
          <div className="page_container_table__header__switcher_grid">
            <Button
              backgroundColor="white"
              border="1px solid gray"
              padding="8px"
              onClick={() => setIsGrid(false)}
            >
              <MenuIcon />
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
                    <Th className="table_header_item">عدد الوحدات</Th>
                    <Th className="table_header_item">إجمالي الإيجار</Th>
                    <Th className="table_header_item">العنوان </Th>
                    <Th className="table_header_item">المالك</Th>
                    <Th className="table_header_item"> </Th>
                  </Tr>
                </Thead>
                <Tbody className="table_body">
                  {PropertiesData &&
                    PropertiesData?.updatedProperties?.map((item, index) => (
                      <Tr
                        key={index}
                        className="table_body_row"
                        onClick={() => {}}
                      >
                        <Td className="table_body_row_item">{item.name}</Td>
                        <Td className="table_body_row_item">
                          {item?.units?.length}
                        </Td>
                        <Td className="table_body_row_item">
                          {item.totalRent}
                        </Td>
                        <Td className="table_body_row_item">{item.address}</Td>
                        <Td className="table_body_row_item">-</Td>

                        <Td className="table_body_row_item_btns">
                          <Stack
                            alignItems={"center"}
                            direction={"row"}
                            spacing={4}
                          >
                            <Button
                              className="table_body_row_item_btns_deletebtn"
                              width={"25%"}
                              rightIcon={<DeleteIcon />}
                              color="white"
                              variant="solid"
                              bg={"#CC3636"}
                              alignItems="center"
                              justifyContent="center"
                              onClick={() => {}}
                            ></Button>
                            <Button
                              className="table_body_row_item_btns_editbtn"
                              width={"25%"}
                              rightIcon={<EditOutlinedIcon />}
                              color="white"
                              variant="solid"
                              alignItems="center"
                              justifyContent="center"
                              bg={"#194C81"}
                              onClick={() => {
                                openPropertyEditPopup(item);
                              }}
                            ></Button>
                          </Stack>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <>
            <div className="page_container_table__content__grid">
              {PropertiesData &&
                PropertiesData?.updatedProperties?.map((item, index) => (
                  <CardWithImg
                    key={index}
                    address={item.address}
                    title={item.name}
                    price={item.id}
                    isBtns={false}
                    isVertical={false}
                    currncy={"وحده"}
                    onClick={() => {}}
                  ></CardWithImg>
                ))}
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
      <Modal isOpen={isOpenProperyModal} onClose={onCloseProperyModal}>
        <ModalOverlay />
        <ModalContent maxWidth="700px">
          <ModalBody padding={"0px"}>
            <CreateProperty onClose={onCloseProperyModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenProperyModalEdit} onClose={onCloseProperyModalEdit}>
        <ModalOverlay />
        <ModalContent maxWidth="700px">
          <ModalBody padding={"0px"}>
            <EditProperty onClose={onCloseProperyModalEdit} id={selectId} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PropertiesTable;
