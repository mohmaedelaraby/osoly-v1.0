import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBoolean,
} from "@chakra-ui/react";
import {
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  DragHandleIcon,
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
import CardWithImg from "../../../components/Cards/CardWithImg";
import useTickets from "../hooks/useTickets";
import Pagination from "../../../components/shared/Pagination";
import { useUpdateTickets } from "../hooks/useUpdateTickets";
import TicketCard from "./TicketCard";

function TicketsContainer() {
  const [isEditingFilter, setIsEditingFilter] = useBoolean();
  const [isEditingSort, setIsEditingSort] = useBoolean();
  const [statuss, setStatus] = useState("All");
  const [typee, setType] = useState("All");
  const [filterdTickets, setFilterdTickets] = useState();
  const [isGrid, setIsGrid] = useState(false);
  const [showOpenTickets, setShowIsTickets] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const { mutate, isSuccess } = useUpdateTickets();
  const [tickets, setTickets] = useState();

  const { data, isLoading, refetch } = useTickets({
    pageNo: currentPage,
    limit: limit,
  });

  useEffect(() => {
    refetch();
    if (data) {
    }
  }, [currentPage, isSuccess]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const updateStatus = (status, item) => {
    let body = { status: status };
    mutate({ id: item?.id, body: body });
    refetch();
  };
  useEffect(() => {
    if (statuss !== "All") {
      const newFiltered = data?.tickets.filter((s) => s.status == statuss);
      setFilterdTickets(newFiltered);
    } else {
      setFilterdTickets(data?.tickets);
    }
  }, [statuss]);
  useEffect(() => {
    let newFiltered;
    if (typee !== "All") {
      if (typee == "processing") {
        newFiltered = data?.tickets.sort(function (a, b) {
          return a.type - b.type;
        });
      } else {
        newFiltered = data?.tickets.sort(function (a, b) {
          return b.type - a.type;
        });
      }
      setFilterdTickets(newFiltered);
    }
  }, [typee]);
  return (
    <>
      <div className="page">
        <div className="page_container">
          <div className="page_container_header">
            <div className="page_container_header__title">التذاكر</div>
            <div className="page_container_header__icons">
              <img src={user} alt="user" width="40px" height="40px" />
            </div>
          </div>
          <div className="page_container_cards page_container_cards_four_items">
            <div className="page_container_cards_card">
              <CardWithNumber
                bg={"#FFE4CE"}
                desc={"العدد الكلي"}
                icon={money}
                number={250}
              ></CardWithNumber>
            </div>
            <div className="page_container_cards_card">
              <CardWithNumber
                bg={"#FFF7E5"}
                desc={"النشطة"}
                icon={money}
                number={250}
              ></CardWithNumber>
            </div>
            <div className="page_container_cards_card">
              <CardWithNumber
                bg={"#EFF9FF"}
                desc={"قيد المعالجة"}
                icon={money}
                number={250}
              ></CardWithNumber>
            </div>
            <div className="page_container_cards_card">
              <CardWithNumber
                bg={"#E5FFEE"}
                desc={"مغلقه"}
                icon={money}
                number={250}
              ></CardWithNumber>
            </div>
          </div>
          <div className="page_container_table ">
            <Card>
              <div className="page_container_table__header pr-16 pl-16 pb-16 pt-16">
                <div className="page_container_table__header__btns">
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

                <div className="page_container_table__header__switcher">
                  <div className="page_container_table__header__switcher_grid">
                    <Button onClick={() => setIsGrid(false)}>
                      <CalendarIcon />
                    </Button>
                  </div>
                  <div className="page_container_table__header__switcher_table">
                    <Button onClick={() => setIsGrid(true)}>
                      <DragHandleIcon />
                    </Button>
                  </div>
                </div>
              </div>

              <hr />
              <div className="page_container_table__content pr-16 pl-16 ">
                <div className="w-100 mb-24">
                  <div className="page_container_table__content_header_flex">
                    <div className="page_container_table__content_header_flex_text">
                      التذاكر المفتوحة
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
                          اخفاء
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
                            اظهار
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
                                    رقم التذكرة
                                  </Th>
                                  <Th className="table_header_item">النوع</Th>
                                  <Th className="table_header_item">الحالة</Th>
                                  <Th className="table_header_item">
                                    الوحدة/العقار
                                  </Th>
                                  <Th className="table_header_item">الوصف</Th>
                                  <Th className="table_header_item">
                                    المرفقات
                                  </Th>
                                  <Th className="table_header_item">المرسل</Th>
                                  <Th className="table_header_item"> </Th>
                                </Tr>
                              </Thead>
                              <Tbody className="table_body">
                                {data?.tickets &&
                                  data?.tickets
                                    .filter(
                                      (i) =>
                                        i.status == ticketsStatus.solved
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
                                              leftIcon={<SmallCloseIcon />}
                                              colorScheme="red"
                                              variant="outline"
                                              onClick={() => {
                                                updateStatus(
                                                  ticketsStatus.canceled,
                                                  item
                                                );
                                              }}
                                            >
                                              رفض
                                            </Button>
                                            <Button
                                              width={"100%"}
                                              leftIcon={<CheckIcon />}
                                              backgroundColor="#2EA154"
                                              color="white"
                                              variant="solid"
                                              onClick={() => {
                                                updateStatus(
                                                  ticketsStatus.solved,
                                                  item
                                                );
                                              }}
                                            >
                                              قبول
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
                            {data?.tickets &&
                              data?.tickets
                                ?.filter(
                                  (i) => i.status == ticketsStatus.solved
                                )
                                .map((item, index) => (
                                  <>
                                  {/*  <CardWithImg
                                    key={index}
                                    address={item.description}
                                    title={item.unit.address}
                                    isBtns={true}
                                    isVertical={false}
                                    name={item.unit.tenant.firstNameAr}
                                    header={item.type}
                                  ></CardWithImg> */}

                                  <TicketCard item={item}></TicketCard>
                                  </>
                                 
                                ))}
                          </div>
                        </>
                      )}

                      {
                        <div className="flex-center mt-8">
                          <Pagination
                            totalCount={data?.pagination.count}
                            currentPage={currentPage}
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
                            {data?.tickets &&
                              data?.tickets.map((item, index) => (
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
                                </Tr>
                              ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </>
                  ) : (
                    <>
                      <div className="page_container_table__content__grid">
                        {data?.tickets &&
                          data?.tickets?.map((item, index) => (
                            <>
                             <TicketCard item={item}></TicketCard>
                            </>
                           /*  <CardWithImg
                              key={index}
                              address={item.description}
                              title={item.unit.address}
                              isBtns={true}
                              isVertical={false}
                              name={item.unit.tenant.firstNameAr}
                              header={item.type}
                            ></CardWithImg> */
                          ))}
                      </div>
                    </>
                  )}

                  {
                    <>
                      <div className="flex-center mt-8 mb-8">
                        <Pagination
                          totalCount={data?.pagination.count}
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
