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
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
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
import { AddIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { USER_ROLES } from "../../../enums/UserRoles";
import CreateUser from "./CreateUser";

function UserTable() {
  const {
    isOpen: isOpenUserModal,
    onOpen: onOpenUserModal,
    onClose: onCloseUserModal,
  } = useDisclosure();

  const { show, toggleShow } = useClosePopUps();
  const openUserPopup = () => {
    onOpenUserModal();
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
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
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
                <Th className="table_header_item">الهوية الوطنية</Th>
                <Th className="table_header_item">رقم الجوال</Th>
                <Th className="table_header_item">قيمة المسدد</Th>
                <Th className="table_header_item">موعد سداد الاستحقاق</Th>
                <Th className="table_header_item">اسم العقار </Th>

                <Th className="table_header_item">البريد الإلكتروني</Th>
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
          <ModalCloseButton />
          <ModalBody>
            <CreateUser />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserTable;
