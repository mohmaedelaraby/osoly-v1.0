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
import React, { useEffect, useState } from "react";
import useClosePopUps from "../../../store/useClosePopups";
import useUsers from "../hooks/useUsers";
import Pagination from "../../../components/shared/Pagination";
import {
  AddIcon,
  ChevronDownIcon,
  DeleteIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { USER_ROLES } from "../../../enums/UserRoles";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

function UserTable() {
  const {
    isOpen: isOpenUserModal,
    onOpen: onOpenUserModal,
    onClose: onCloseUserModal,
  } = useDisclosure();

  const {
    isOpen: isOpenUserModalEdit,
    onOpen: onOpenUserModalEdit,
    onClose: onCloseUserModalEdit,
  } = useDisclosure();

  const { show, toggleShow } = useClosePopUps();
  const openUserPopup = () => {
    onOpenUserModal();
    if (show) {
      toggleShow();
    }
  };
  const openUserEditPopup = () => {
    onOpenUserModalEdit();
    if (show) {
      toggleShow();
    }
  };

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

  return (
    <>
      <div className="page_container_table__header">
        <div className="page_container_table__header__btns">
          <Button
            rightIcon={<AddIcon/>}
            className="page_container_table__header__btns__add"
            bg="#194C81"
            dir="rtl"
            onClick={() => {
              openUserPopup();
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
            <MenuButton as={Button}
              marginRight="8px"
              marginLeft="8px"
              rightIcon={<ChevronDownIcon />}
              borderRadius='md'
              borderWidth='1px'
              bg='white'
              _hover={{ bg: 'gray.400' }}
              _expanded={{ bg: 'blue.400' }}
              _focus={{ boxShadow: 'outline' }}>
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
                <Th className="table_header_item">الهوية الوطنية</Th>
                <Th className="table_header_item">رقم الجوال</Th>
                <Th className="table_header_item">قيمة المسدد</Th>
                <Th className="table_header_item">موعد سداد الاستحقاق</Th>
                <Th className="table_header_item">اسم العقار </Th>

                <Th className="table_header_item">البريد الإلكتروني</Th>
                <Th className="table_header_item"> </Th>
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
                      <Td className="table_body_row_item">{item?.email}</Td>
                      <Td className="table_body_row_item_btns">
                        <Stack
                          alignItems={"center"}
                          direction={"row"}
                          spacing={4}
                        >
                          <Button
                            className="table_body_row_item_btns_deletebtn"
                            width={"25%"}
                            leftIcon={<DeleteIcon />}
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
                            leftIcon={<EditOutlinedIcon />}
                            color="white"
                            variant="solid"
                            alignItems="center"
                            justifyContent="center"
                            bg={"#194C81"}
                            onClick={() => {
                              openUserEditPopup();
                            }}
                          ></Button>
                        </Stack>
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

      <Modal isOpen={isOpenUserModal && !show} onClose={onCloseUserModal}>
        <ModalOverlay />
        <ModalContent maxWidth="700px">
          <ModalBody padding="0px">
            <CreateUser onClose={onCloseUserModal} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isOpenUserModalEdit && !show}
        onClose={onCloseUserModalEdit}
      >
        <ModalOverlay />
        <ModalContent maxWidth="700px">
          <ModalBody padding="0px">
            <EditUser onClose={onCloseUserModalEdit} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserTable;
