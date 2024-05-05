import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
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
import CreateUnit from "./CreateUnit";
import useUnits from "../hooks/useUnits";
import Pagination from "../../../components/shared/Pagination";
import CardWithImg from "../../../components/Cards/CardWithImg";
import EditUnit from "./EditUnit";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import { useDeleteUnit } from "../hooks/useDeleteUnit";
import { useUploadUnitsFile } from "../hooks/useUploadUnitsFile";
import { useTranslation } from "react-i18next";
import { useDynamicColors } from "../../../hooks/useDynamicColors";
import dayjs from "dayjs";
const UnitsTable = () => {
  const { t } = useTranslation();
  const { primary, secondry } = useDynamicColors();

  const [selectId, setSelectedId] = useState();
  const [selectprobId, setSelectedProbId] = useState();
  const [selectOwnId, setSelectedOwnId] = useState();

  //sorting and filtering local
  const sortItems = [
    "rent",
    "rentCollectionDate",
    "waterCost",
    "space",
    "rooms",
    "bathrooms",
    "conditioners",
  ];

  const [sortByTmp, setSortByTmp] = useState(null);
  const [sortDirectionTmp, setSortDirectionTmp] = useState("asc");

  const [rentTmp, setRentTmp] = useState(null);
  const [nameTmp, setNameTmp] = useState(null);
  const [electricityAccountTmp, setElectricityAccountTmp] = useState(null);
  const [waterAccountTmp, setWaterAccountTmp] = useState(null);
  const [waterCostTmp, setWaterCostTmp] = useState(null);
  const [roomsTmp, setRoomsTmp] = useState(null);
  const [spaceTmp, setSpaceTmp] = useState(null);
  const [bathroomsTmp, setBathroomsTmp] = useState(null);
  const [loungeTmp, setLoungeTmp] = useState(null);
  const [kitchenTmp, setKitchenTmp] = useState(null);
  const [conditionersTmp, setConditionersTmp] = useState(null);

  //sorting and filtering param data
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const [rent, setRent] = useState(null);
  const [name, setName] = useState(null);
  const [electricityAccount, setElectricityAccount] = useState(null);
  const [waterAccount, setWaterAccount] = useState(null);
  const [waterCost, setWaterCost] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [space, setSpace] = useState(null);
  const [bathrooms, setBathrooms] = useState(null);
  const [lounge, setLounge] = useState(false);
  const [kitchen, setKitchen] = useState(false);
  const [conditioners, setConditioners] = useState(null);
  const [file, setFile] = useState("");

  const { mutate: uploadFiles, isSuccess: isSuccessFiles } =
    useUploadUnitsFile();

  const updateFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const choosenFile = event.target.files[0];
      setFile(choosenFile);
      let formData = new FormData();
      formData.append("file", file);
      uploadFiles({ body: formData });
      setFile(null);
      event.target.value = "";
    }
  };

  const {
    isOpen: isOpenUnitModal,
    onOpen: onOpenUnitModal,
    onClose: onCloseUnitModal,
  } = useDisclosure();
  const {
    isOpen: isOpenUnitModalEdit,
    onOpen: onOpenUnitModalEdit,
    onClose: onCloseUnitModalEdit,
  } = useDisclosure();

  const [isGrid, setIsGrid] = useState(false);

  // delete user
  const { mutate, isSuccess } = useDeleteUnit();

  //units
  const [currentUnitPage, setCurrentUnitPage] = useState(1);

  const unitLimit = 10;

  const { unitsData, isUnitsLoading, unitsReftch } = useUnits({
    pageNo: currentUnitPage,
    limit: unitLimit,
    sortBy: sortBy,
    sortDirection: sortDirection,
    name: name,
    rent: rent,
    space: space,
    waterAccount: waterAccount,
    waterCost: waterCost,
    lounge: lounge,
    kitchen: kitchen,
    electricityAccount: electricityAccount,
    bathrooms: bathrooms,
    rooms: rooms,
    conditioners: conditioners,
  });

  useEffect(() => {
    setTimeout(() => {
      unitsReftch();
    }, 500);
  }, [
    currentUnitPage,
    isOpenUnitModal,
    isOpenUnitModalEdit,
    sortBy,
    sortDirection,
    name,
    rent,
    waterAccount,
    waterCost,
    electricityAccount,
    kitchen,
    lounge,
    conditioners,
    space,
    bathrooms,
    rooms,
    isSuccess,
    isSuccessFiles,
  ]);

  const handleUnitPageChange = (page) => {
    setCurrentUnitPage(page);
  };

  const openUnitPopup = () => {
    onOpenUnitModal();
  };
  const openUnitEditPopup = (user) => {
    setSelectedId(user.id);
    setSelectedProbId(user.propertyId);
    setSelectedOwnId(user.ownerId);
    onOpenUnitModalEdit();
  };

  //emit data from cards
  const [dataFromChild, setDataFromChild] = useState();

  let onClickFunction = (arg) => setDataFromChild(arg);

  useEffect(() => {
    if (dataFromChild) {
      if (dataFromChild[0] == "edit") {
        openUnitEditPopup({ id: dataFromChild[1] });
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
            dir="rtl"
            onClick={() => {
              openUnitPopup();
            }}
          >
            <span className="pl-8 fo_secondry">
              {" "}
              {t("units.page.add_property")}
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
              name="image"
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
                      {t("general.sort")}
                    </Text>
                  </FormLabel>
                  <Select
                    name="sortBY"
                    onChange={(e) => {
                      setSortByTmp(e.target.value);
                      setTimeout(() => {}, 0);
                    }}
                  >
                    <option value={null}>{t("general.sort")}</option>
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
            <MenuList width="257px">
              <div className="menu-select-container">
                <div className="menu-select">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label fo_primary">
                        {t("general.filter")} {t("general.name")}
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
                        {t("general.filter")} {t("general.rent")}
                      </Text>
                    </FormLabel>
                    <Input
                      name="subTitle"
                      type="text"
                      className="form__input__container__input"
                      placeholder=""
                      onChange={(e) => {
                        setRentTmp(e.target.value);
                      }}
                    />
                  </FormControl>
                </div>

                <div className="menu-select mt-8">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label fo_primary">
                        {t("general.filter")} {t("general.rooms_number")}
                      </Text>
                    </FormLabel>
                    <Input
                      name="subTitle"
                      type="text"
                      className="form__input__container__input"
                      placeholder=""
                      onChange={(e) => {
                        setRoomsTmp(e.target.value);
                      }}
                    />
                  </FormControl>
                </div>

                <div className="menu-select mt-8">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label fo_primary">
                        {t("general.filter")} {t("general.bathrooms_number")}
                      </Text>
                    </FormLabel>
                    <Input
                      name="subTitle"
                      type="text"
                      className="form__input__container__input"
                      placeholder=""
                      onChange={(e) => {
                        setBathroomsTmp(e.target.value);
                      }}
                    />
                  </FormControl>
                </div>

                <div className="menu-select mt-8">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label fo_primary">
                        {t("general.filter")} {t("general.kitchens")}
                      </Text>
                    </FormLabel>
                    <RadioGroup onChange={setKitchenTmp} value={kitchenTmp}>
                      <Stack direction="row">
                        <Radio value={"false"}>{t("general.exist")}</Radio>
                        <Radio value={"true"}>{t("general.not_exist")}</Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                </div>

                <div className="menu-select mt-8">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label fo_primary">
                        {t("general.filter")} {t("general.lounge")}
                      </Text>
                    </FormLabel>
                    <RadioGroup onChange={setLoungeTmp} value={loungeTmp}>
                      <Stack direction="row">
                        <Radio value={"false"}>{t("general.exist")}</Radio>
                        <Radio value={"true"}>{t("general.not_exist")}</Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                </div>

                <div className="menu-select mt-8">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label fo_primary">
                        {t("general.filter")} {t("general.conditioners_number")}
                      </Text>
                    </FormLabel>
                    <Input
                      name="subTitle"
                      type="text"
                      className="form__input__container__input"
                      placeholder=""
                      onChange={(e) => {
                        setConditionersTmp(e.target.value);
                      }}
                    />
                  </FormControl>
                </div>

                <div className="menu-select mt-8">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label fo_primary">
                        {t("general.filter")} {t("general.electericty_bill")}
                      </Text>
                    </FormLabel>
                    <Input
                      name="subTitle"
                      type="text"
                      className="form__input__container__input"
                      placeholder=""
                      onChange={(e) => {
                        setElectricityAccountTmp(e.target.value);
                      }}
                    />
                  </FormControl>
                </div>
                <div className="menu-select mt-8">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label fo_primary">
                        {t("general.filter")} {t("general.water_bill")}
                      </Text>
                    </FormLabel>
                    <Input
                      name="subTitle"
                      type="text"
                      className="form__input__container__input"
                      placeholder=""
                      onChange={(e) => {
                        setWaterCostTmp(e.target.value);
                      }}
                    />
                  </FormControl>
                </div>
                <div className="menu-select mt-8">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label fo_primary">
                        {t("general.filter")} {t("general.water_meter")}
                      </Text>
                    </FormLabel>
                    <Input
                      name="subTitle"
                      type="text"
                      className="form__input__container__input"
                      placeholder=""
                      onChange={(e) => {
                        setWaterAccountTmp(e.target.value);
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
                      setBathrooms(bathroomsTmp);
                      setName(nameTmp);
                      setRent(rentTmp);
                      setWaterAccount(waterAccountTmp);
                      setConditioners(conditionersTmp);
                      setWaterCost(waterCostTmp);
                      setElectricityAccount(electricityAccountTmp);
                      setKitchen(kitchenTmp);
                      setRooms(roomsTmp);
                      setLounge(loungeTmp);
                      setSpace(spaceTmp);
                    }}
                  >
                    {t("general.apply")}
                  </Button>
                  <Button
                    onClick={() => {
                      setBathrooms(null);
                      setName(null);
                      setRent(null);
                      setWaterAccount(null);
                      setConditioners(null);
                      setWaterCost(null);
                      setElectricityAccount(null);
                      setKitchen(null);
                      setRooms(null);
                      setLounge(null);
                      setSpace(null);
                      setBathroomsTmp(null);
                      setNameTmp(null);
                      setRentTmp(null);
                      setWaterAccountTmp(null);
                      setConditionersTmp(null);
                      setWaterCostTmp(null);
                      setElectricityAccountTmp(null);
                      setKitchenTmp(null);
                      setRoomsTmp(null);
                      setLoungeTmp(null);
                      setSpaceTmp(null);
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
              placeholder={t("search.by_unit_name")}
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
                      {t("general.due_date")}
                    </Th>
                    <Th className="table_header_item">{t("general.rent")}</Th>
                    <Th className="table_header_item">
                      {t("general.address")}
                    </Th>
                    <Th className="table_header_item">{t("general.space")}</Th>
                    <Th className="table_header_item">
                      {t("general.electericty_cost")}
                    </Th>
                    <Th className="table_header_item">
                      {t("general.water_cost")}
                    </Th>
                    <Th className="table_header_item">{t("general.rooms")}</Th>
                    <Th className="table_header_item">
                      {t("general.kitchen")}
                    </Th>
                    <Th className="table_header_item">
                      {t("general.conditioners")}
                    </Th>
                    <Th className="table_header_item"></Th>
                  </Tr>
                </Thead>
                <Tbody className="table_body">
                  {unitsData &&
                    unitsData?.units?.map((item, index) => (
                      <Tr
                        key={index}
                        className="table_body_row"
                        onClick={() => {}}
                      >
                        <Td className="table_body_row_item">{item.name}</Td>
                        <Td className="table_body_row_item">
                          {dayjs(new Date(item.rentCollectionDate)).format(
                            "YYYY-MM-DD"
                          )}
                        </Td>
                        <Td className="table_body_row_item">{item.rent}</Td>
                        <Td className="table_body_row_item">{item.address}</Td>
                        <Td className="table_body_row_item">{item.space}</Td>
                        <Td className="table_body_row_item">
                          {item.electricityAccount}
                        </Td>
                        <Td className="table_body_row_item">
                          {item.waterAccount}
                        </Td>
                        <Td className="table_body_row_item">{item.rooms}</Td>

                        <Td className="table_body_row_item">
                          {item.kitchen ? (
                            <>
                              <Checkbox defaultChecked isDisabled></Checkbox>
                            </>
                          ) : (
                            <>
                              <Checkbox isDisabled></Checkbox>
                            </>
                          )}
                        </Td>
                        <Td className="table_body_row_item">
                          {item.conditioners}
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
                              paddingRight="8px"
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
                              paddingRight="8px"
                              color={"white"}
                              variant="solid"
                              alignItems="center"
                              justifyContent="center"
                              bg={"#194C81"}
                              onClick={() => {
                                openUnitEditPopup(item);
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
              {unitsData &&
                unitsData?.units?.map((item, index) => (
                  <CardWithImg
                    key={index}
                    address={item.address}
                    title={item.name}
                    price={item.rent}
                    id={item.id}
                    sendDataToParent={onClickFunction}
                    isBtns={false}
                    isVertical={false}
                    currncy={"ريال/شهري"}
                    onClick={() => {}}
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

      <Modal isOpen={isOpenUnitModal} onClose={onCloseUnitModal}>
        <ModalOverlay />
        <ModalContent maxWidth="700px">
          <ModalBody padding={"0px"}>
            <CreateUnit
              onClose={onCloseUnitModal}
              propPropertyId={selectprobId}
              propOwenerId={selectOwnId}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenUnitModalEdit} onClose={onCloseUnitModalEdit}>
        <ModalOverlay />
        <ModalContent maxWidth="700px">
          <ModalBody padding={"0px"}>
            <EditUnit
              onClose={onCloseUnitModalEdit}
              id={selectId}
              propPropertyId={selectprobId}
              propOwenerId={selectOwnId}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UnitsTable;
