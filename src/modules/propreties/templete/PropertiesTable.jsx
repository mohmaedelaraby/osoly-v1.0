import React, { useEffect, useState } from "react";
import CardWithImg from "../../../components/Cards/CardWithImg";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
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
import { useDeleteProperty } from "../hooks/useDeleteProperties";
import { useUploadProperteyFile } from "../hooks/useUploadProperteyFile";
import { useTranslation } from "react-i18next";
import { useDynamicColors } from "../../../hooks/useDynamicColors";

function PropertiesTable() {
  const { t } = useTranslation();
  const { primary, secondry } = useDynamicColors();

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

  const [file, setFile] = useState("");

  const { mutate: uploadFiles, isSuccess: isSuccessFiles } =
    useUploadProperteyFile();

  const updateFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const choosenFile = event.target.files[0];
      setFile(choosenFile);
      let formData = new FormData();
      formData.append("file", choosenFile);
      uploadFiles({ body: formData });
      setFile(null);
      event.target.value = "";
    }
  };

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
  // delete user
  const { mutate, isSuccess } = useDeleteProperty();

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
      isSuccessFiles,
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
    isSuccess,
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

  //emit data from cards
  const [dataFromChild, setDataFromChild] = useState();

  let onClickFunction = (arg) => setDataFromChild(arg);

  useEffect(() => {
    if (dataFromChild) {
      if (dataFromChild[0] == "edit") {
        openPropertyEditPopup({ id: dataFromChild[1] });
      } else if (dataFromChild[0] == "delete") {
        mutate(dataFromChild[1]);
      }
    }
  }, [dataFromChild]);

  return (
    <>
      <div className="page_container_table__header">
        <div className="page_container_table__header__btns">
          <Button
            rightIcon={<AddIcon />}
            className="page_container_table__header__btns__add"
            bg={primary}
            onClick={() => {
              openPropertyPopup();
            }}
          >
            <span className="pl-8 fo_secondry">
              {" "}
              {t("propreties.page.add_property_title")}{" "}
            </span>
          </Button>
          <Button
            marginRight="8px"
            rightIcon={<AddIcon />}
            className="page_container_table__header__btns__add"
            bg={primary}
          >
            <span className="pl-8 fo_secondry"> {t("general.add_file")}</span>
            <Input
              className="form__input__flex_fileUpload_input"
              type="file"
              name="csvFile"
              accept=".csv"
              onChange={updateFile}
            />
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
              <span className="pl-8 fo_primary">{t("general.sort")}</span>
            </MenuButton>
            <MenuList width="257px">
              <div className="menu-select-container">
                <div className="menu-select">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label fo_primary">
                        {t("general.sort")} {t("general.name")}
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
                      <Text className="form__input__container__label fo_primary">
                        {t("general.sort")} {t("general.address")}
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
                      <Text className="form__input__container__label fo_primary">
                        {t("general.sort")} {t("general.num_of_units")}
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
                      <Text className="form__input__container__label fo_primary">
                        {t("general.sort")} {t("general.sk_number")}
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
                      <Text className="form__input__container__label fo_primary">
                        {t("general.sort")} {t("general.city")}
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
                      <Text className="form__input__container__label fo_primary">
                        {t("general.sort")} {t("general.postal_code")}
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
                      <Text className="form__input__container__label fo_primary">
                        {t("general.sort")} {t("general.property_number")}
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
                      <Text className="form__input__container__label fo_primary">
                        {t("general.sort")} {t("general.street")}
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
                      <Text className="form__input__container__label fo_primary">
                        {t("general.sort")} {t("general.distract")}
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
                    color={secondry}
                    bg={primary}
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
                    {t("general.apply")}
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
                    {t("general.delete")}
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
              <span className="pl-8 fo_primary">{t("general.filter")}</span>
            </MenuButton>
            <MenuList padding={"24px"} width="257px">
              <MenuItem>
                <FormControl className="form__input__container">
                  <FormLabel>
                    <Text className="form__input__container__label fo_primary">
                      {t("general.sort_type")}
                    </Text>
                  </FormLabel>
                  <RadioGroup
                    onChange={setSortDirectionTmp}
                    value={sortDirectionTmp}
                  >
                    <Stack direction="row">
                      <Radio value="asc">{t("general.asc")}</Radio>
                      <Radio value="desc">{t("general.desc")}</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </MenuItem>
              <div className="menu-select mb-24">
                <FormControl className="form__input__container">
                  <FormLabel>
                    <Text className="form__input__container__label fo_primary">
                      {t("general.filter")}
                    </Text>
                  </FormLabel>
                  <Select
                    name="sortBY"
                    onChange={(e) => {
                      setSortByTmp(e.target.value);
                      setTimeout(() => {}, 0);
                    }}
                  >
                    <option value={null}>{t("general.filter")}</option>
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
                    color={secondry}
                    bg={primary}
                    type="submit"
                    onClick={() => {
                      setSortDirection(sortDirectionTmp);
                      setSortBy(sortByTmp);
                    }}
                  >
                    {t("general.apply")}
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
                    {t("general.delete")}
                  </Button>
                </Stack>
              </MenuItem>
            </MenuList>
          </Menu>

          
        </div>
        <div className="page_container_table__header__search">
          <InputGroup>
            <InputRightElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputRightElement>
            <Input
              type="text"
              placeholder={t("search.by_property_name")}
              onChange={(e) => {
                setTimeout(() => {
                  setName(e.target.value);
                }, 200);
              }}
            />
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
                    <Th className="table_header_item">{t("general.name")}</Th>
                    <Th className="table_header_item">
                      {t("general.num_of_units")}
                    </Th>
                    <Th className="table_header_item">
                      {t("general.total_rent")}
                    </Th>
                    <Th className="table_header_item">
                      {t("general.address")}{" "}
                    </Th>
                    <Th className="table_header_item">{t("general.owner")}</Th>
                    <Th className="table_header_item"> </Th>
                  </Tr>
                </Thead>
                <Tbody className="table_body">
                  {PropertiesData ? (
                    <>
                      {PropertiesData?.updatedProperties?.map((item, index) => (
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
                            {item?.totalRent}
                          </Td>
                          <Td className="table_body_row_item">
                            {item?.address}
                          </Td>
                          <Td className="table_body_row_item">
                          {item?.owner?.firstNameAr}
                          </Td>

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
                                paddingRight='8px'
                                color={"white"}
                                variant="solid"
                                bg={"#CC3636"}
                                alignItems="center"
                                justifyContent="center"
                                onClick={() => {
                                  mutate(item.id);
                                }}
                              ></Button>
                              <Button
                                className="table_body_row_item_btns_editbtn"
                                width={"25%"}
                                rightIcon={<EditOutlinedIcon />}
                                paddingRight='8px'
                                color={"white"}
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
                    </>
                  ) : (
                    <>
                      {" "}
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
        ) : (
          <>
            <div className="page_container_table__content__grid">
              {PropertiesData &&
                PropertiesData?.updatedProperties?.map((item, index) => (
                  <CardWithImg
                    key={index}
                    img={item?.image}
                    address={item?.address}
                    id={item?.id}
                    title={item?.name}
                    price={item?.totalRent}
                    sendDataToParent={onClickFunction}
                    isBtns={false}
                    isVertical={false}
                    currncy={t("general.single_unit")}
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
