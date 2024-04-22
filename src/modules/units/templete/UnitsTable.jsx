import {
  Button,
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
  ModalContent,
  ModalOverlay,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
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
import useClosePopUps from "../../../store/useClosePopups";
import useUnits from "../hooks/useUnits";
import Pagination from "../../../components/shared/Pagination";
import CardWithImg from "../../../components/Cards/CardWithImg";
import EditUnit from "./EditUnit";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
const UnitsTable = ({}) => {
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

  const { show, toggleShow } = useClosePopUps();
  const [isGrid, setIsGrid] = useState(false);

  const openUnitPopup = () => {
    onOpenUnitModal();
    if (show) {
      toggleShow();
    }
  };
  const openUnitEditPopup = () => {
    onOpenUnitModalEdit();
    if (show) {
      toggleShow();
    }
  };

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
      <div className="page_container_table__header">
        <div className="page_container_table__header__btns">
          <Button
            rightIcon={<AddIcon />}
            className="page_container_table__header__btns__add"
            bg="#194C81"
            dir="rtl"
            onClick={() => {
              openUnitPopup();
            }}
          >
            <span className="pl-8"> إضافة جديد</span>
          </Button>
          <Menu>
            <MenuButton
              as={Button}
              marginRight="8px"
              marginLeft="8px"
              rightIcon={<ChevronDownIcon />}
            >
              <span className="pl-8"> فرز حسب</span>
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
              marginRight="8px"
              marginLeft="8px"
              rightIcon={<ChevronDownIcon />}
              borderRadius="md"
              borderWidth="1px"
              bg="white"
              _hover={{ bg: "gray.400" }}
              _expanded={{ bg: "blue.400" }}
              _focus={{ boxShadow: "outline" }}
            >
              <span className="pl-8"> ترتيب حسب</span>
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
          <div className="page_container_table__header__switcher_table">
            <Button backgroundColor="white" border='1px solid gray' padding='8px' onClick={() => setIsGrid(true)}>
              <GridViewOutlinedIcon />
            </Button>
          </div>
          <div className="page_container_table__header__switcher_grid">
            <Button backgroundColor="white" border='1px solid gray' padding='8px' onClick={() => setIsGrid(false)}>
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
                    <Th className="table_header_item">موعد الاستحقاق</Th>
                    <Th className="table_header_item">الإيجار</Th>
                    <Th className="table_header_item">العنوان</Th>
                    <Th className="table_header_item">المساحة</Th>
                    <Th className="table_header_item">حساب فاتورة الكهرباء</Th>
                    <Th className="table_header_item">حساب المياه</Th>
                    <Th className="table_header_item">الغرف</Th>
                    <Th className="table_header_item">المطبخ</Th>
                    <Th className="table_header_item">التكييفات</Th>
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
                          {item.rentCollectionDate}
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
                                openUnitEditPopup();
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

      <Modal isOpen={isOpenUnitModal && !show} onClose={onCloseUnitModal}>
        <ModalOverlay />
        <ModalContent maxWidth="700px">
          <ModalBody padding={"0px"}>
            <CreateUnit onClose={onCloseUnitModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenUnitModalEdit && !show}
        onClose={onCloseUnitModalEdit}
      >
        <ModalOverlay />
        <ModalContent maxWidth="700px">
          <ModalBody>
            <EditUnit onClose={onCloseUnitModalEdit} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UnitsTable;
