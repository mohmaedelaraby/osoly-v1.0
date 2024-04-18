import {
  Button,
  Card,
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
import React, { useEffect, useState } from "react";
import "../../../assets/styels/components/Table.scss";
import {
  AddIcon,
  ChevronDownIcon,
  DeleteIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import CreateEnterpraiseUser from "./CreateEnterpraiseUser";
import CardWithNumber from "../../../components/Cards/CardWithNumber";
import money from "../../../assets/icons-svgs/money.svg";
import user from "../../../assets/images/user.png";
import Pagination from "../../../components/shared/Pagination";
import useEnterPrisesUsers from "../hooks/useEnterprisesUsers";
import usePlans from "../hooks/usePlans";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditEnterpraiseUser from "./EditEnterpraiseUser";

const UserEnterpraiseTable = () => {
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const {
    isOpen: isOpenModalEdit,
    onOpen: onOpenModalEdit,
    onClose: onCloseModalEdit,
  } = useDisclosure();
  const [sortBy, setSortBy] = useState();
  const [sortDierction, setSortDierction] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const [selectedPlan, setSelectedPlan] = useState();

  const { usersEnterPrisesData, usersEnterPrisesRefetch } = useEnterPrisesUsers(
    {
      pageNo: currentPage,
      limit: limit,
      sortBy:sortBy,
      sortDierction:sortDierction
    }
  );

  const { PlansData, PlansRefetch } = usePlans();
  useEffect(() => {
    PlansRefetch();
  }, [PlansData]);

  useEffect(() => {
    usersEnterPrisesRefetch();
    console.log("first")
  }, [currentPage, isOpenModalEdit, isOpenModal , sortBy]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openCreatePopup = () => {
    onOpenModal();
  };
  const openEditPopup = (plan) => {
    setSelectedPlan(plan);
    onOpenModalEdit();
  };

  const CardsDemo = [
    {
      img: money,
      bg: "#CFB2FE",
      title: "3450",
      desc: "مجموع الإيجار",
    },
    {
      img: money,
      bg: "#CFB2FE",
      title: "3450",
      desc: "مجموع الإيجار",
    },
    {
      img: money,
      bg: "#CFB2FE",
      title: "3450",
      desc: "مجموع الإيجار",
    },
  ];

  return (
    <>
      <div className="page">
        <div className="page_container">
          <div className="page_container_header">
            <div className="page_container_header__title">المؤسسة</div>
            <div className="page_container_header__icons">
              <img src={user} alt="user" width="40px" height="40px" />
            </div>
          </div>
          <div className="page_container_cards">
            {CardsDemo?.map((card, index) => (
              <div className="page_container_cards_card">
                <CardWithNumber
                  key={index}
                  bg={card.bg}
                  desc={card.desc}
                  icon={card.img}
                  number={card.title}
                ></CardWithNumber>
              </div>
            ))}
          </div>

          <div className="page_container_table">
            <Card paddingBottom="16px">
              <div className="page_container_table__header p-16 pb-0">
                <div className="page_container_table__header__btns">
                  <Button
                    rightIcon={<AddIcon />}
                    className="page_container_table__header__btns__add"
                    bg="#194C81"
                    dir="rtl"
                    onClick={() => {
                      openCreatePopup();
                    }}
                  >
                    <span className="pl-8"> إضافة مؤسس</span>
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
                    <MenuList padding={"24px"}>
                      <MenuItem>
                        <FormControl className="form__input__container">
                          <FormLabel>
                            <Text className="form__input__container__label">
                              نوع الفرز
                            </Text>
                          </FormLabel>
                          <RadioGroup
                            onChange={setSortDierction}
                            value={sortDierction}
                          >
                            <Stack direction="row">
                              <Radio value="asc">تصاعدي</Radio>
                              <Radio value="desc">تنازلي</Radio>
                            </Stack>
                          </RadioGroup>
                        </FormControl>
                      </MenuItem>
                      <div className="menu-select">
                        <FormControl className="form__input__container">
                          <FormLabel>
                            <Text className="form__input__container__label">
                              فرز حسب
                            </Text>
                          </FormLabel>
                          <Select
                            placeholder="فرز حسب"
                            dir="ltr"
                            name="sortBY"
                            onChange={(e) => {
                              setSortBy(e.target.value);
                              setTimeout(() => {}, 0);
                            }}
                          >
                            <option value="expireDate">تاريخ الانتهاء</option>
                          </Select>
                        </FormControl>
                      </div>
                    </MenuList>
                  </Menu>

                  {/*  <Menu>
                    <MenuButton
                      as={Button}
                      bg={"white"}
                      border={"1px solid #C8C9CC"}
                      borderRadius="8px"
                      rightIcon={<ChevronDownIcon />}
                    >
                      <span className="pl-8">ترتيب حسب</span>
                    </MenuButton>
                    <MenuList padding={"24px"}>
                      <MenuItem> <ThemeProvider theme={MuiTheme}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                            النوع
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              //value={age}
                              label="النوع"
                              //onChange={handleChange}
                            >
                              <MenuItem value={10}> الاسم</MenuItem>
                              <MenuItem value={20}>الباقه</MenuItem>
                            </Select>
                          </FormControl>
                        </ThemeProvider></MenuItem>
                      <MenuItem> <ThemeProvider theme={MuiTheme}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                            النوع
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              //value={age}
                              label="النوع"
                              //onChange={handleChange}
                            >
                              <MenuItem value={10}> الاسم</MenuItem>
                              <MenuItem value={20}>الباقه</MenuItem>
                            </Select>
                          </FormControl>
                        </ThemeProvider></MenuItem>
                    </MenuList>
                  </Menu> */}
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
                <>
                  <TableContainer
                    overflowY="auto"
                    overflowX="scroll"
                    minHeight="340px"
                    maxHeight="340px"
                    width="100%"
                  >
                    <Table className="table" variant="simple">
                      <Thead className="table_header">
                        <Tr>
                          <Th className="table_header_item">الاسم</Th>
                          <Th className="table_header_item">عدد الوحدات</Th>
                          <Th className="table_header_item">الباقة</Th>
                          <Th className="table_header_item">عدد المستخدمين </Th>
                          <Th className="table_header_item"> </Th>
                        </Tr>
                      </Thead>
                      <Tbody className="table_body">
                        {usersEnterPrisesData ? (
                          usersEnterPrisesData?.enterprises?.map((item) => (
                            <>
                              <Tr className="table_body_row">
                                <Td className="table_body_row_item">
                                  {item?.username}
                                </Td>
                                <Td className="table_body_row_item">
                                  {item?.units?.length}
                                </Td>
                                <Td className="table_body_row_item">
                                  {item?.plan ? item?.plan?.name : "-"}
                                </Td>
                                <Td className="table_body_row_item">
                                  {item?.users?.length}
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
                                      leftIcon={<DeleteIcon />}
                                      color="white"
                                      variant="solid"
                                      bg={"#CC3636"}
                                      alignItems="center"
                                      justifyContent="center"
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
                                        openEditPopup(item);
                                      }}
                                    ></Button>
                                  </Stack>
                                </Td>
                              </Tr>
                            </>
                          ))
                        ) : (
                          <></>
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </>

                {
                  <Pagination
                    totalCount={usersEnterPrisesData?.pagination.count}
                    currentPage={currentPage}
                    pageSize={10}
                    onPageChange={handlePageChange}
                  />
                }
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpenModal} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent maxWidth="700px">
          <ModalBody padding="0px">
            <CreateEnterpraiseUser
              onClose={onCloseModal}
              plans={PlansData?.plans}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenModalEdit} onClose={onCloseModalEdit}>
        <ModalOverlay />
        <ModalContent maxWidth="700px">
          <ModalBody padding="0px">
            <EditEnterpraiseUser
              onClose={onCloseModalEdit}
              plans={PlansData?.plans}
              item={selectedPlan}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserEnterpraiseTable;
