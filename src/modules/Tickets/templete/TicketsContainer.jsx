import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  SearchIcon,
  SmallCloseIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { ticketsStatus, ticketsTypes } from "../../../enums/TicketsEnum";
import money from "../../../assets/icons-svgs/money.svg";
import "../../../assets/styels/components/page.scss";
import user from "../../../assets/images/user.png";
import CardWithNumber from "../../../components/Cards/CardWithNumber";
import useTickets from "../hooks/useTickets";
import Pagination from "../../../components/shared/Pagination";
import { useUpdateTickets } from "../hooks/useUpdateTickets";
import TicketCard from "./TicketCard";
import MenuIcon from "@mui/icons-material/Menu";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import { useTranslation } from "react-i18next";
import PageHeader from "../../../components/shared/PageHeader";
import { useDynamicColors } from "../../../hooks/useDynamicColors";

function TicketsContainer() {
  const { t } = useTranslation();
  const {primary,secondry}=useDynamicColors()

  const [isGrid, setIsGrid] = useState(false);
  const [showOpenTickets, setShowIsTickets] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const [currentActivePage, setCurrentActivePage] = useState(1);
  const activeLimit = 1000;
  const { mutate, isSuccess } = useUpdateTickets();

  //sorting and filtering local
  const [sortByTmp, setSortByTmp] = useState(null);
  const [sortDirectionTmp, setSortDirectionTmp] = useState("asc");

  const [typeTmp, setTypeTmp] = useState(null);
  const [statusTmp, setStatusTmp] = useState(null);
  //sorting and filtering param data
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const [type, setType] = useState(null);
  const [status, setStatus] = useState(null);

  const {
    data: allData,
    isLoading: allLoading,
    refetch: allrefetch,
  } = useTickets({
    pageNo: currentPage,
    limit: limit,
    sortBy: sortBy,
    sortDirection: sortDirection,
    type: type,
    status: status,
  });

  const {
    data: activeData,
    isLoading: activeLoading,
    refetch: activerefetch,
  } = useTickets({
    pageNo: currentActivePage,
    limit: activeLimit,
    sortBy: sortBy,
    sortDirection: sortDirection,
    type: type,
    status: status,
  });

  useEffect(() => {
    setTimeout(() => {
      allrefetch();
    }, 500);
  }, [currentPage, isSuccess, sortBy, sortDirection, type, status]);

  useEffect(() => {
    setTimeout(() => {
      activerefetch();
    }, 500);
  }, [currentActivePage, isSuccess, sortBy, sortDirection, type, status]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const updateStatus = (status, item) => {
    let body = { status: status };
    mutate({ id: item?.id, body: body });
    /*  activerefetch();
    allrefetch(); */
  };

  return (
    <>
      <div className="page">
        <div className="page_container">
          <div className="page_container_header">
            <PageHeader title={t("general.tickets")}></PageHeader>
          </div>
          <div className="page_container_cards page_container_cards_four_items">
            <div className="page_container_cards_card">
              <CardWithNumber
                bg={"#FFE4CE"}
                desc= {t("general.total_number")}
                icon={money}
                number={250}
              ></CardWithNumber>
            </div>
            <div className="page_container_cards_card">
              <CardWithNumber
                bg={"#FFF7E5"}
                desc={t("tickets.ACTIVE")}
                icon={money}
                number={250}
              ></CardWithNumber>
            </div>
            <div className="page_container_cards_card">
              <CardWithNumber
                bg={"#EFF9FF"}
                desc={t("tickets.PROCESSING")}
                icon={money}
                number={250}
              ></CardWithNumber>
            </div>
            <div className="page_container_cards_card">
              <CardWithNumber
                bg={"#E5FFEE"}
                desc={t("tickets.CLOSED")}
                icon={money}
                number={250}
              ></CardWithNumber>
            </div>
          </div>
          <div className="page_container_table ">
            <Card>
              <div className="page_container_table__header pr-16 pl-16 pb-16 pt-16">
                <div className="page_container_table__header__btns">
                  <Menu closeOnSelect={false}>
                    <MenuButton
                      as={Button}
                      marginRight="8px"
                      marginLeft="8px"
                      bg={secondry}
                      border={"1px solid #C8C9CC"}
                      borderRadius="8px"
                      rightIcon={<ChevronDownIcon />}  colorScheme={'white'}
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
                            dir="rtl"
                            name="sortBY"
                            onChange={(e) => {
                              setSortByTmp(e.target.value);
                              setTimeout(() => {}, 0);
                            }}
                          >
                            <option value={null}> {t("general.filter")}</option>

                            <option value={"createdAt"}> {t("general.date")}</option>
                          </Select>
                        </FormControl>
                      </div>
                      <MenuItem closeOnSelect={true}>
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
                              setSortDirection(null);
                              setSortBy(null);
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
                      bg={secondry}
                      border={"1px solid #C8C9CC"}
                      borderRadius="8px"
                      rightIcon={<ChevronDownIcon />}  colorScheme={'white'}
                    >
                      <span className="pl-8 fo_primary">{t("general.filter")}</span>
                    </MenuButton>
                    <MenuList padding={"24px"} width="257px">
                      <div className="menu-select mb-24">
                        <FormControl className="form__input__container">
                          <FormLabel>
                            <Text className="form__input__container__label fo_primary">
                              {Object.entries(ticketsTypes).map((item) => (
                                <></>
                              ))}
                              {t("general.filter")} {t("general.type")}
                            </Text>
                          </FormLabel>
                          <Select
                            dir="rtl"
                            name="type"
                            onChange={(e) => {
                              setTypeTmp(e.target.value);
                              setTimeout(() => {}, 0);
                            }}
                          >
                            <option value={null}> {t("general.type")}</option>
                            {Object.values(ticketsTypes).map((item, index) => (
                              <>
                                <option id={index} value={item}>
                                  {item}
                                </option>
                              </>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      <div className="menu-select mb-24">
                        <FormControl className="form__input__container">
                          <FormLabel>
                            <Text className="form__input__container__label fo_primary">
                              {t("general.filter")} {t("general.status")}
                            </Text>
                          </FormLabel>
                          <Select
                            dir="rtl"
                            name="status"
                            onChange={(e) => {
                              setStatusTmp(e.target.value);
                              setTimeout(() => {}, 0);
                            }}
                          >
                            <option value={null}> {t("general.status")}</option>
                            {Object.values(ticketsStatus).map((item, index) => (
                              <>
                                <option id={index} value={item}>
                                  {item}
                                </option>
                                ;
                              </>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      <MenuItem closeOnSelect={true}>
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
                              setStatus(statusTmp);
                              setType(typeTmp);
                            }}
                          >
                            {t("general.apply")}
                          </Button>
                          <Button
                            onClick={() => {
                              setStatus(null);
                              setType(null);
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
                    <InputLeftElement pointerEvents="none">
                      <SearchIcon color="gray.300" />
                    </InputLeftElement>
                    <Input type="text" placeholder="" />
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

              <hr />
              <div className="page_container_table__content pr-16 pl-16 ">
                <div className="w-100 mb-24">
                  <div className="page_container_table__content_header_flex">
                    <div className="page_container_table__content_header_flex_text">
                    {t("general.open_tickets")} 
                    </div>
                    <div className="page_container_table__content_header_flex_btn">
                      {showOpenTickets ? (
                        <Button
                          rightIcon={<ViewOffIcon />}
                          colorScheme="white"
                          variant="ghost"
                          dir="rtl"
                          onClick={() => {
                            setShowIsTickets(false);
                          }}
                        >
                          {t("general.hide")} 
                        </Button>
                      ) : (
                        <>
                          <Button
                            rightIcon={<ViewIcon />}
                            colorScheme="white"
                            variant="ghost"
                            dir="rtl"
                            onClick={() => {
                              setShowIsTickets(true);
                            }}
                          >
                            {t("general.show")} 
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  {showOpenTickets ? (
                    <>
                      {!isGrid ? (
                        <>
                          <TableContainer
                            width={"100%"}
                            borderBottom="1px solid #EDEEF2"
                            borderRight="1px solid #EDEEF2"
                            borderTop="1px solid #EDEEF2"
                            overflowY="auto"
                            overflowX="auto"
                            minHeight="340px"
                            maxHeight="340px"
                            borderRadius={"12px"}
                          >
                            <Table className="table" variant="simple">
                              <Thead className="table_header">
                                <Tr>
                                  <Th className="table_header_item">
                                  {t("general.ticket_number")} 
                                  </Th>
                                  <Th className="table_header_item">{t("general.type")} </Th>
                                  <Th className="table_header_item">{t("general.status")} </Th>
                                  <Th className="table_header_item">
                                  {t("general.unit_or_property")} 
                                  </Th>
                                  <Th className="table_header_item">{t("general.description")} </Th>
                                  <Th className="table_header_item">
                                  {t("general.attachment")}
                                  </Th>
                                  <Th className="table_header_item">{t("general.senter")}</Th>
                                  <Th className="table_header_item"> </Th>
                                </Tr>
                              </Thead>
                              <Tbody className="table_body">
                                {activeData?.tickets &&
                                  activeData?.tickets
                                    .filter(
                                      (i) => i.status == ticketsStatus.ACTIVE
                                    )
                                    .map((item, index) => (
                                      <Tr
                                        key={index}
                                        className="table_body_row"
                                      >
                                        <Td className="table_body_row_item">
                                          {item.id}
                                        </Td>
                                        <Td className="table_body_row_item">
                                          {t(item.type)}
                                        </Td>
                                        <Td className="table_body_row_item">
                                          {t(item.status)}
                                        </Td>
                                        <Td className="table_body_row_item">
                                          {item.unit.name}
                                        </Td>
                                        <Td className="table_body_row_item">
                                          {item.description}
                                        </Td>
                                        <Td className="table_body_row_item">
                                          -
                                        </Td>
                                        <Td className="table_body_row_item">
                                          {item.unit?.tenant?.firstNameAr}
                                        </Td>
                                        <Td className="table_body_row_item">
                                          <Stack
                                            alignItems={"center"}
                                            direction={"row"}
                                            spacing={4}
                                          >
                                            <Button
                                              width={"100%"}
                                              rightIcon={<SmallCloseIcon />}
                                              colorScheme="red"
                                              variant="outline"
                                              onClick={() => {
                                                updateStatus(
                                                  ticketsStatus.CLOSED,
                                                  item
                                                );
                                              }}
                                            >
                                              {t("general.reject")}
                                            </Button>
                                            <Button
                                              width={"100%"}
                                              rightIcon={<CheckIcon />}
                                              backgroundColor="#2EA154"
                                              color={secondry}
                                              variant="solid"
                                              onClick={() => {
                                                updateStatus(
                                                  ticketsStatus.PROCESSING,
                                                  item
                                                );
                                              }}
                                            >
                                              {t("general.accept")}
                                            </Button>
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
                            {activeData?.tickets &&
                              activeData?.tickets
                                ?.filter(
                                  (i) => i.status == ticketsStatus.ACTIVE
                                )
                                .map((item, index) => (
                                  <>
                                    <TicketCard item={item}></TicketCard>
                                  </>
                                ))}
                          </div>
                        </>
                      )}

                      {
                        <div className="flex-center mt-8">
                          <Pagination
                            totalCount={activeData?.pagination.count}
                            currentPage={currentActivePage}
                            pageSize={10}
                            onPageChange={handlePageChange}
                          />
                        </div>
                      }
                    </>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="w-100">
                  <div className="page_container_table__content_header">
                    كل التذاكر
                  </div>
                  {!isGrid ? (
                    <>
                      <TableContainer
                        width={"100%"}
                        borderBottom="1px solid #EDEEF2"
                        borderRight="1px solid #EDEEF2"
                        borderTop="1px solid #EDEEF2"
                        overflowY="auto"
                        overflowX="auto"
                        minHeight="340px"
                        maxHeight="340px"
                        borderRadius={"12px"}
                      >
                        <Table className="table" variant="simple">
                          <Thead className="table_header">
                            <Tr>
                              <Th className="table_header_item">رقم التذكرة</Th>
                              <Th className="table_header_item">النوع</Th>
                              <Th className="table_header_item">الحالة</Th>
                              <Th className="table_header_item">
                                الوحدة/العقار
                              </Th>
                              <Th className="table_header_item">الوصف</Th>
                              <Th className="table_header_item">المرفقات</Th>
                              <Th className="table_header_item">المرسل</Th>
                              <Th className="table_header_item"> </Th>
                            </Tr>
                          </Thead>
                          <Tbody className="table_body">
                            {allData?.tickets &&
                              allData?.tickets.map((item, index) => (
                                <Tr key={index} className="table_body_row">
                                  <Td className="table_body_row_item">
                                    {item.id}
                                  </Td>
                                  <Td className="table_body_row_item">
                                    {item.type}
                                  </Td>
                                  <Td className="table_body_row_item">
                                    {item.status}
                                  </Td>
                                  <Td className="table_body_row_item">
                                    {item.unit.name}
                                  </Td>
                                  <Td className="table_body_row_item">
                                    {item.description}
                                  </Td>
                                  <Td className="table_body_row_item">-</Td>
                                  <Td className="table_body_row_item">
                                    {item.unit?.tenant?.firstNameAr}
                                  </Td>

                                  <Td className="table_body_row_item">
                                    {status === ticketsStatus.ACTIVE ||
                                    status === ticketsStatus.PROCESSING ? (
                                      <>
                                        <Stack
                                          alignItems={"center"}
                                          direction={"row"}
                                          spacing={4}
                                        >
                                          <Button
                                            width={"100%"}
                                            rightIcon={<SmallCloseIcon />}
                                            colorScheme="red"
                                            variant="outline"
                                            onClick={() => {
                                              updateStatus(
                                                ticketsStatus.CLOSED,
                                                item
                                              );
                                            }}
                                          >
                                            {t("general.reject")}
                                          </Button>
                                          <Button
                                            width={"100%"}
                                            rightIcon={<CheckIcon />}
                                            backgroundColor="#2EA154"
                                            color={secondry}
                                            variant="solid"
                                            onClick={() => {
                                              updateStatus(
                                                item.status ==
                                                  ticketsStatus.ACTIVE
                                                  ? ticketsStatus.PROCESSING
                                                  : ticketsStatus.CLOSED,
                                                item
                                              );
                                            }}
                                          >
                                            {t("general.accept")}
                                          </Button>
                                        </Stack>
                                      </>
                                    ) : (
                                      <></>
                                    )}
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
                        {allData?.tickets &&
                          allData?.tickets?.map((item, index) => (
                            <>
                              <TicketCard item={item}></TicketCard>
                            </>
                          ))}
                      </div>
                    </>
                  )}

                  {
                    <>
                      <div className="flex-center mt-8 mb-8">
                        <Pagination
                          totalCount={allData?.pagination.count}
                          currentPage={currentPage}
                          pageSize={10}
                          onPageChange={handlePageChange}
                        />
                      </div>
                    </>
                  }
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default TicketsContainer;
