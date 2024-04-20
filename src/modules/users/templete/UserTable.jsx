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
import React, { useEffect, useState } from "react";
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

function UserTable({ switchTo }) {
  const [selectedUser, setSelectedUser] = useState();
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

  const openUserPopup = () => {
    onOpenUserModal();
  };
  const openUserEditPopup = (user) => {
    setSelectedUser(user);
    onOpenUserModalEdit();
  };
  //sorting and filtering local
  const sortItems = [
    "phoneNumber",
    "email",
    "phoneNumber",
    "firstNameEn",
    "lastNameEn",
    "firstNameAr",
    "lastNameAr",
  ];

  const [sortByTmp, setSortByTmp] = useState(null);
  const [sortDirectionTmp, setSortDirectionTmp] = useState("asc");

  const [phoneNumberTmp, setPhoneNumberTmp] = useState(null);
  const [emailTmp, setEmailTmp] = useState(null);
  const [identityIdTmp, setIdentityIdTmp] = useState(null);
  const [contractNumberTmp, setContractNumberTmp] = useState(null);
  //sorting and filtering param data
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [identityId, setIdentityId] = useState(null);
  const [contractNumber, setContractNumber] = useState(null);

  const [currentUserPage, setCurrentUserPage] = useState(1);
  const userlimit = 10;

  const {
    usersData: usersDataType,
    usersisLoading: userDataLodaing,
    usersRefetch: userDataReftech,
  } = useUsers({
    pageNo: currentUserPage,
    limit: userlimit,
    sortDirection: sortDirection,
    sortBy: sortBy,
    phoneNumber: phoneNumber,
    email: email,
    identityId: identityId,
    contractNumber: contractNumber,
  });

  useEffect(() => {
    setTimeout(() => {
      userDataReftech();
    }, 500);
    console.log(switchTo);
  }, [
    switchTo,
    currentUserPage,
    isOpenUserModal,
    isOpenUserModalEdit,
    sortBy,
    sortDirection,
    phoneNumber,
    email,
    identityId,
    contractNumber,
  ]);

  const handlePageUserChange = (page) => {
    setCurrentUserPage(page);
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
              setSortByTmp(null);
              setSortByTmp(null);
              openUserPopup();
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
                    dir="ltr"
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
            <MenuList padding={"24px"} width="257px">
              <div className="menu-select">
                <FormControl className="form__input__container">
                  <FormLabel>
                    <Text className="form__input__container__label">
                      ترتيب حسب رقم التليفون
                    </Text>
                  </FormLabel>
                  <Input
                    name="subTitle"
                    type="text"
                    className="form__input__container__input"
                    placeholder=""
                    onChange={(e) => {
                      setPhoneNumberTmp(e.target.value);
                    }}
                  />
                </FormControl>
              </div>

              <div className="menu-select mt-8">
                <FormControl className="form__input__container">
                  <FormLabel>
                    <Text className="form__input__container__label">
                      ترتيب حسب البريد الإلكتروني
                    </Text>
                  </FormLabel>
                  <Input
                    name="subTitle"
                    type="text"
                    className="form__input__container__input"
                    placeholder=""
                    onChange={(e) => {
                      setEmailTmp(e.target.value);
                    }}
                  />
                </FormControl>
              </div>

              <div className="menu-select mt-8">
                <FormControl className="form__input__container">
                  <FormLabel>
                    <Text className="form__input__container__label">
                      ترتيب حسب رقم العقد
                    </Text>
                  </FormLabel>
                  <Input
                    name="subTitle"
                    type="text"
                    className="form__input__container__input"
                    placeholder=""
                    onChange={(e) => {
                      setContractNumberTmp(e.target.value);
                    }}
                  />
                </FormControl>
              </div>

              <div className="menu-select mt-8">
                <FormControl className="form__input__container">
                  <FormLabel>
                    <Text className="form__input__container__label">
                      ترتيب حسب رقم الهيئه
                    </Text>
                  </FormLabel>
                  <Input
                    name="subTitle"
                    type="text"
                    className="form__input__container__input"
                    placeholder=""
                    onChange={(e) => {
                      setIdentityIdTmp(e.target.value);
                    }}
                  />
                </FormControl>
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
                      setPhoneNumber(phoneNumberTmp);
                      setEmail(emailTmp);
                      setContractNumber(contractNumberTmp);
                      setIdentityId(identityIdTmp);
                    }}
                  >
                    تطبيق
                  </Button>
                  <Button
                    onClick={() => {
                      setPhoneNumber("");
                      setEmail("");
                      setContractNumber("");
                      setIdentityId("");
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
              {usersDataType ? (
                <>
                  {usersDataType?.users
                    ?.filter((i) => i.role === USER_ROLES.TENANT)
                    .map((item, index) => (
                      <Tr
                        key={index}
                        className="table_body_row"
                        onClick={() => {}}
                      >
                        <Td className="table_body_row_item">
                          {item.firstNameAr} {item.role}
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
                                openUserEditPopup(item);
                              }}
                            ></Button>
                          </Stack>
                        </Td>
                      </Tr>
                    ))}{" "}
                </>
              ) : (
                <>
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

        {
          <Pagination
            totalCount={usersDataType?.paginationOption.count}
            currentPage={currentUserPage}
            pageSize={10}
            onPageChange={handlePageUserChange}
          />
        }
      </div>

      <Modal isOpen={isOpenUserModal} onClose={onCloseUserModal}>
        <ModalOverlay />
        <ModalContent maxWidth="700px">
          <ModalBody padding="0px">
            <CreateUser
              onClose={onCloseUserModal}
              userRule={USER_ROLES.TENANT}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenUserModalEdit} onClose={onCloseUserModalEdit}>
        <ModalOverlay />
        <ModalContent maxWidth="700px">
          <ModalBody padding="0px">
            <EditUser
              onClose={onCloseUserModalEdit}
              userRule={USER_ROLES.TENANT}
              id={selectedUser?.id}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserTable;
