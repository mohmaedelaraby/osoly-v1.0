import React, { useEffect, useState } from "react";
import CardWithImg from "../../../components/Cards/CardWithImg";
import {
  Button,
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
import useProperties from "../hooks/useAllProperties";
import useClosePopUps from "../../../store/useClosePopups";
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
  const { show, toggleShow } = useClosePopUps();
  const [selectId, setSelectedId] = useState();
  const [isGrid, setIsGrid] = useState(false);

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
  const openPropertyEditPopup = (user) => {
    onOpenProperyModalEdit();
    setSelectedId(user.id);
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
              openPropertyPopup();
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
              borderRadius="md"
              borderWidth="1px"
              bg="white"
              _hover={{ bg: "gray.400" }}
              _expanded={{ bg: "blue.400" }}
              _focus={{ boxShadow: "outline" }}
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
      <Modal isOpen={isOpenProperyModal && !show} onClose={onCloseProperyModal}>
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
