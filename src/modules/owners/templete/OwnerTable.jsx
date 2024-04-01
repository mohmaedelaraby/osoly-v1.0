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
import CreateOwner from "./CreateOwner";
import useClosePopUps from "../../../store/useClosePopups";
import { USER_ROLES } from "../../../enums/UserRoles";
import useUsers from "../../users/hooks/useUsers";
import Pagination from "../../../components/shared/Pagination";

const OwnerTable = ({ data }) => {
  const {
    isOpen: isOpenOwnerModal,
    onOpen: onOpenOwnerModal,
    onClose: onCloseOwnerModal,
  } = useDisclosure();

  const { show, toggleShow } = useClosePopUps();

  const openOwnerPopup = () => {
    onOpenOwnerModal();
    if (show) {
      toggleShow();
    }
  };

  //owner fetch data
  const [currentOwnerPage, setCurrentOwnerPage] = useState(1);
  const ownerlimit = 10;
  const {
    usersData: ownerDataType,
    usersisLoading: ownerDataLodaing,
    usersRefetch: ownerDataReftech,
  } = useUsers({
    pageNo: currentOwnerPage,
    limit: ownerlimit,
  });

  useEffect(() => {
    ownerDataReftech();
    if (show && !ownerDataLodaing) {
      ownerDataReftech();
    }
  }, [currentOwnerPage, show]);

  const handlePageOwnerChange = (page) => {
    setCurrentOwnerPage(page);
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
              openOwnerPopup();
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
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
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
                <Th className="table_header_item">البريد الإلكتروني</Th>
                <Th className="table_header_item">رقم الجوال</Th>
                <Th className="table_header_item">عقدد العقارات</Th>
                <Th className="table_header_item">رقم عقد الوساطة</Th>
              </Tr>
            </Thead>
            <Tbody className="table_body">
              {ownerDataType &&
                ownerDataType?.users
                  ?.filter((i) => (i.role = USER_ROLES.OWNER))
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
                      <Td className="table_body_row_item">{item.email}</Td>
                      <Td className="table_body_row_item">
                        {item.phoneNumber}
                      </Td>
                      <Td className="table_body_row_item">
                        {item?.ownedProperties?.length}
                      </Td>
                      <Td className="table_body_row_item">-</Td>
                    </Tr>
                  ))}
            </Tbody>
          </Table>
        </TableContainer>

        {
          <Pagination
            totalCount={ownerDataType?.paginationOption.count}
            currentPage={currentOwnerPage}
            pageSize={10}
            onPageChange={handlePageOwnerChange}
          />
        }
      </div>

      <Modal isOpen={isOpenOwnerModal && !show} onClose={onCloseOwnerModal}>
        <ModalOverlay />
        <ModalContent maxWidth="700px">
          <ModalCloseButton />
          <ModalBody>
            <CreateOwner />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OwnerTable;
