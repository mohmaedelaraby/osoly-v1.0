import {
  Button,
  Card,
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
import "../../../assets/styels/components/Table.scss";
import {
  AddIcon,
  ChevronDownIcon,
  DeleteIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import CreateEnterpraiseUser from "./CreateEnterpraiseUser";
import CardWithNumber from "../../../components/Cards/CardWithNumber";
import blueCrown from "../../../assets/icons-svgs/blueCrown.svg";
import goldCrown from "../../../assets/icons-svgs/goldCrown.svg";
import silverCrown from "../../../assets/icons-svgs/silverCrown.svg";
import Pagination from "../../../components/shared/Pagination";
import useEnterPrisesUsers from "../hooks/useEnterprisesUsers";
import usePlans from "../hooks/usePlans";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditEnterpraiseUser from "./EditEnterpraiseUser";
import { useTranslation } from "react-i18next";
import PageHeader from "../../../components/shared/PageHeader";
import { useEnterprisesDeleteUser } from "../hooks/useDeleteEnterprisesUser";
import { useDynamicColors } from "../../../hooks/useDynamicColors";
import useStats from "../../../hooks/useStats";
import dayjs from "dayjs";

const UserEnterpraiseTable = () => {
  const { t } = useTranslation();
  const { primary, secondry } = useDynamicColors();

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

  //search by name

  // delete user
  const { mutate, isSuccess } = useEnterprisesDeleteUser();

  //sorting and filtering local
  const [sortByTmp, setSortByTmp] = useState();
  const [planIdTmp, setPlanIdTmp] = useState();
  const [nameTmp, setNameTmp] = useState();
  const [sortDirectionTmp, setSortDirectionTmp] = useState("asc");
  //sorting and filtering param data
  const [sortBy, setSortBy] = useState();
  const [planId, setPlanId] = useState();
  const [name, setName] = useState();
  const [sortDirection, setSortDirection] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const [selectedPlan, setSelectedPlan] = useState();

  const { usersEnterPrisesData, usersEnterPrisesRefetch } = useEnterPrisesUsers(
    {
      pageNo: currentPage,
      limit: limit,
      sortBy: sortBy,
      sortDirection: sortDirection,
      planId: planId,
      name: name,
    }
  );

  const { PlansData, PlansRefetch } = usePlans();
  useEffect(() => {
    PlansRefetch();
  }, [PlansData]);

  useEffect(() => {
    setTimeout(() => {
      usersEnterPrisesRefetch();
    }, 500);
  }, [
    currentPage,
    isOpenModalEdit,
    isOpenModal,
    sortBy,
    sortDirection,
    planId,
    name,
    isSuccess,
  ]);

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

  //get stats
  const { statsData, statsRefetch } = useStats();
  useEffect(() => {
    statsRefetch();
  }, []);

  const CardsImages = [
    {
      img: goldCrown,
    },
    {
      img: silverCrown,
    },
    {
      img: blueCrown,
    },
  ];

  return (
    <>
      <div className="page">
        <div className="page_container">
          <div className="page_container_header">
            <PageHeader title={t("enterprise.page.header")}></PageHeader>
          </div>
          <div className="page_container_cards">
            {statsData?.enterpriseStats?.map((card, index) => (
              <div className="page_container_cards_card">
                <CardWithNumber
                  key={index}
                  bg={card?.color}
                  desc={card?.planName}
                  icon={CardsImages[index].img}
                  number={card?.subscribers}
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
                    bg={primary}
                    dir="rtl"
                    onClick={() => {
                      openCreatePopup();
                    }}
                  >
                    <span className="pl-8 fo_secondry">
                      {t("enterprise.page.add_user")}
                    </span>
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
                      <span className="pl-8 fo_primary fo_primary">
                        {t("general.sort")}
                      </span>
                    </MenuButton>
                    <MenuList padding={"24px"} width="257px">
                      <div className="menu-select">
                        <FormControl className="form__input__container">
                          <FormLabel>
                            <Text className="form__input__container__label fo_primary fo_primary">
                              {t("general.sort")} {t("general.plan")}
                            </Text>
                          </FormLabel>
                          <Select
                            placeholder={t("general.sort")}
                            name="sortBY"
                            onChange={(e) => {
                              setPlanIdTmp(e.target.value);
                              setTimeout(() => {}, 0);
                            }}
                          >
                            {PlansData?.plans?.map((item, index) => (
                              <option id={index} value={item.id}>
                                {item?.name}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      <div className="menu-select mt-8">
                        <FormControl className="form__input__container">
                          <FormLabel>
                            <Text className="form__input__container__label  fo_primary">
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
                      <div className="menu-select mt-24">
                        <Stack
                          direction="row"
                          width="100%"
                          justify="space-between"
                        >
                          <Button
                            padding="0px 16px"
                            variant="solid"
                            color={secondry}
                            bg={primary}
                            type="submit"
                            onClick={() => {
                              setPlanId(planIdTmp);
                              setName(nameTmp);
                            }}
                          >
                            {t("general.apply")}
                          </Button>
                          <Button
                            onClick={() => {
                              setPlanId(null);
                              setName(null);
                              setPlanIdTmp(null);
                              setNameTmp(null);
                            }}
                            padding="0px 16px"
                            color={"#010B38"}
                            variant="outline"
                          >
                            {t("general.delete")}
                          </Button>
                        </Stack>
                      </div>
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
                      <span className="pl-8 fo_primary">
                        {t("general.filter")}
                      </span>
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
                              <Radio value="asc"> {t("general.asc")}</Radio>
                              <Radio value="desc"> {t("general.desc")}</Radio>
                            </Stack>
                          </RadioGroup>
                        </FormControl>
                      </MenuItem>
                      <div className="menu-select">
                        <FormControl className="form__input__container">
                          <FormLabel>
                            <Text className="form__input__container__label fo_primary fo_primary">
                              {t("general.filter")}
                            </Text>
                          </FormLabel>
                          <Select
                            placeholder={t("general.filter")}
                            name="sortBY"
                            onChange={(e) => {
                              setSortByTmp(e.target.value);
                              setTimeout(() => {}, 0);
                            }}
                          >
                            <option value="expireDate">
                              {t("general.expire_date")}
                            </option>
                          </Select>
                        </FormControl>
                      </div>
                      <div className="menu-select mt-24">
                        <Stack
                          direction="row"
                          width="100%"
                          justify="space-between"
                        >
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
                              setSortBy(null);
                            }}
                            padding="0px 16px"
                            color={"#010B38"}
                            variant="outline"
                          >
                            {t("general.delete")}
                          </Button>
                        </Stack>
                      </div>
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
                      placeholder={t("search.by_enterprise_name")}
                      onChange={(e) => {
                        setTimeout(() => {
                          setName(e.target.value);
                        }, 200);
                      }}
                    />
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
                          <Th className="table_header_item">
                            {t("general.name")}
                          </Th>
                          <Th className="table_header_item">
                            {t("general.num_of_units")}
                          </Th>
                          <Th className="table_header_item">
                            {t("general.plan_type")}
                          </Th>
                          <Th className="table_header_item">
                            {t("general.num_of_users")}
                          </Th>
                          <Th className="table_header_item">
                            {t("general.expire_date")}
                          </Th>
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
                                  {item?.plan?.numberOfUsers}
                                </Td>
                                <Td className="table_body_row_item">
                                  {dayjs(new Date(item.expireDate)).format(
                                    "YYYY-MM-DD"
                                  )}
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
                                      color={"white"}
                                      variant="solid"
                                      bg={"#CC3636"}
                                      alignItems="center"
                                      paddingRight="8px"
                                      justifyContent="center"
                                      onClick={() => {
                                        mutate(item.id);
                                      }}
                                    ></Button>
                                    <Button
                                      className="table_body_row_item_btns_editbtn"
                                      width={"25%"}
                                      rightIcon={<EditOutlinedIcon />}
                                      color={"white"}
                                      variant="solid"
                                      alignItems="center"
                                      justifyContent="center"
                                      paddingRight="8px"
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
