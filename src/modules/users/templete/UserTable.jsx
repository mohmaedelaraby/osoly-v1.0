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
import { useDeleteUser } from "../hooks/useDeleteUser";
import { useTranslation } from "react-i18next";
import { useUploadUsersFile } from "../hooks/useUploadUsersFile";
import { useDynamicColors } from "../../../hooks/useDynamicColors";

function UserTable({ switchTo }) {
  const { t } = useTranslation();
  const { primary, secondry } = useDynamicColors();

  const [selectedUser, setSelectedUser] = useState();
  const [file, setFile] = useState("");

  const { mutate: uploadFiles, isSuccess: isSuccessFiles } =
    useUploadUsersFile();

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
    isOpen: isOpenUserModal,
    onOpen: onOpenUserModal,
    onClose: onCloseUserModal,
  } = useDisclosure();

  const {
    isOpen: isOpenUserModalEdit,
    onOpen: onOpenUserModalEdit,
    onClose: onCloseUserModalEdit,
  } = useDisclosure();

  // delete user
  const { mutate, isSuccess } = useDeleteUser();

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
    isSuccess,
    isSuccessFiles,
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
            bg={primary}
            dir="rtl"
            onClick={() => {
              setSortByTmp(null);
              setSortByTmp(null);
              openUserPopup();
            }}
          >
            <span className="pl-8 fo_secondry">
              {" "}
              {t("users.create.title")}{" "}
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
              <span className="pl-8 fo_primary">{t("general.sort")} </span>
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
            <MenuList padding={"24px"} width="257px">
              <div className="menu-select-container">
                <div className="menu-select">
                  <FormControl className="form__input__container">
                    <FormLabel>
                      <Text className="form__input__container__label fo_primary">
                        {t("general.filter")} {t("general.phone")}
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
                      <Text className="form__input__container__label fo_primary">
                        {t("general.filter")} {t("general.email")}
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
                      <Text className="form__input__container__label fo_primary">
                        {t("general.filter")} {t("general.contract_number")}
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
                      <Text className="form__input__container__label fo_primary">
                        {t("general.filter")} {t("general.national_id")}
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
                      setPhoneNumber(phoneNumberTmp);
                      setEmail(emailTmp);
                      setContractNumber(contractNumberTmp);
                      setIdentityId(identityIdTmp);
                    }}
                  >
                    {t("general.apply")}
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
              placeholder={t("search.by_mail")}
              onChange={(e) => {
                setTimeout(() => {
                  setEmail(e.target.value);
                }, 200);
              }}
            />
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
                <Th className="table_header_item">{t("general.name")} </Th>
                <Th className="table_header_item">
                  {t("general.national_id_text")}
                </Th>
                <Th className="table_header_item">{t("general.phone")}</Th>
                <Th className="table_header_item">
                  {t("general.property_name")}{" "}
                </Th>
                <Th className="table_header_item">{t("general.email")}</Th>
                <Th className="table_header_item"> </Th>
              </Tr>
            </Thead>
            <Tbody className="table_body">
              {usersDataType ? (
                <>
                  {usersDataType?.users
                    ?.filter((i) => i.role === USER_ROLES.TENANT)
                    .map((item, index) => (
                      <Tr key={index} className="table_body_row">
                        <Td className="table_body_row_item">
                          {item.firstNameAr}
                        </Td>
                        <Td className="table_body_row_item">-</Td>
                        <Td className="table_body_row_item">
                          {item.phoneNumber}
                        </Td>
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
                                openUserEditPopup(item);
                              }}
                            ></Button>
                          </Stack>
                        </Td>
                      </Tr>
                    ))}
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
