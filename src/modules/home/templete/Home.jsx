import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import user from "../../../assets/images/user.png";

import React, { useEffect, useState } from "react";
import { FaBuilding, FaHouseUser, FaTicketAlt, FaUser } from "react-icons/fa";
import "../style/Home.scss";

import CardWithImg from "../../../components/Cards/CardWithImg";
import CardWithNumber from "../../../components/Cards/CardWithNumber";
import moneyIcon from "../../../assets/icons-svgs/money.svg";
import interfaceIcon from "../../../assets/icons-svgs/interface.svg";
import houseIcon from "../../../assets/icons-svgs/house.svg";
import homesIcon from "../../../assets/icons-svgs/homes.svg";
import LineChart from "../../../components/Charts/LineChart";
import { useTranslation } from "react-i18next";
import PieChartComponent from "../../../components/Charts/PieChart";
import PieChartComponentWithOneValue from "../../../components/Charts/PieChartWithOneValue";
const Home = () => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "ar" : "en";
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  };

  const currentUserJson = localStorage.getItem("currentUser");
  const homeData = JSON.parse(currentUserJson);
  const [pieData, setPieData] = useState();
  const [ownersCount, setOwnersCount] = useState(0);
  const [propertiesCount, setPropertiesCount] = useState(0);
  const [tenantsCount, setTenantsCount] = useState(0);
  const [metricData, setMetricData] = useState();
  const [barData, setBarData] = useState();

  const metircArr = [
    {
      tile: "Tenants",
      label: "Tickets",
      icon: <FaUser />,
      num: 0,
    },
    {
      tile: "Owners",
      label: "Owner",
      icon: <FaHouseUser />,
      num: 0,
    },
    {
      tile: "Properties",
      label: "Property",
      icon: <FaBuilding />,
      num: 0,
    },
  ];
  const metricVals = [];
  useEffect(() => {
    console.log(homeData.stats);
    setPieData(homeData?.stats?.ticketsStats);
    setBarData(homeData?.stats?.unitsStats);
    setOwnersCount(homeData?.stats?.ownersCount);
    setPropertiesCount(homeData?.stats?.propertiesCount);
    setTenantsCount(homeData?.stats?.tenantsCount);
  }, []);
  useEffect(() => {
    setMetricData([
      homeData?.stats?.tenantsCount,
      homeData?.stats?.ownersCount,
      homeData?.stats?.propertiesCount,
    ]);
  }, [ownersCount, propertiesCount, tenantsCount]);

  const rentTable = [
    {
      name: "شقة 120",
      date: "20-03-2024 ",
      property: "عمارة 20",
      price: "120 ",
    },
    {
      name: "شقة 120",
      date: "20-03-2024 ",
      property: "عمارة 20",
      price: "120 ",
    },
    {
      name: "شقة 120",
      date: "20-03-2024 ",
      property: "عمارة 20",
      price: "120 ",
    },
    {
      name: "شقة 120",
      date: "20-03-2024 ",
      property: "عمارة 20",
      price: "120 ",
    },
    {
      name: "شقة 120",
      date: "20-03-2024 ",
      property: "عمارة 20",
      price: "120 ",
    },
  ];

  const PieTest = [
    {
      label: "solved",
      value: 20,
    },
    {
      label: "processing",
      value: 40,
    },
    {
      label: "canceled",
      value: 20,
    },
    {
      label: "reviewing",
      value: 20,
    },
  ];
  const Linedata = [
    {
      name: "Nov",
      value: 2400,
    },
    {
      name: "Dec",
      value: 1398,
    },
    {
      name: "Jan",
      value: 9800,
    },
    {
      name: "Feb",
      value: 3908,
    },
    {
      name: "Mar",
      value: 4800,
    },
    {
      name: "Apr",
      value: 3800,
    },
  ];

  const datat = [
    { value: 25, label: "A" },
    { value: 25, label: "b" },
    { value: 25, label: "c" },
    { value: 25, label: "d" },
  ];

  return (
    <>
      <div className="home">
        <div className="home_container">
          <div className="home_container_header">
            <div className="home_container_header__title">
              {t("general.hello")} {homeData?.enterprise.name}
            </div>
            <div className="home_container_header__icons">
              <img
                src={user}
                alt="user"
                width="40px"
                height="40px"
                onClick={handleChangeLanguage}
              />
            </div>
          </div>
          <div className="home_container_cards">
            {/* {metricData && metircArr?.map((item, i) => (
              <div key={i} className="home_container_cards_card">
                <CardWithNumber></CardWithNumber>
              </div>
            ))} */}
            <CardWithNumber
              icon={houseIcon}
              number={250}
              desc={"إجمالي الوحدات المؤجرة"}
              bg={"#E2FBD7"}
            ></CardWithNumber>
            <CardWithNumber
              icon={homesIcon}
              number={170}
              desc={"  إجمالي العقارات"}
              bg={"#EFF9FF"}
            ></CardWithNumber>
            <CardWithNumber
              icon={moneyIcon}
              number={"20k"}
              desc={"  تحصيل الشهر الحالي"}
              bg={"#F3EBFF"}
            ></CardWithNumber>
            <CardWithNumber
              icon={interfaceIcon}
              number={120}
              desc={"إجمالي التذاكر المفتوحة"}
              bg={"#FFE4CE"}
            ></CardWithNumber>
          </div>
          <div className="home_container_charts_table">
            <div className="home_container_charts_table__chart w-100 ml-24">
              <div className="home_container_charts_table__chart_header">
                الإيجار المحصل
              </div>

              <Card width="100%" borderRadius="14px" padding="36px">
                <CardBody padding="0px">
                  <LineChart data={Linedata} />
                </CardBody>
              </Card>
            </div>

            <div className="home_container_charts_table__chart ml-24">
              <div className="home_container_charts_table__chart_header">
                التذاكر
              </div>

              <Card width="100%" borderRadius="14px" padding="36px">
                <CardBody padding="0px">
                  <PieChartComponent data={PieTest}></PieChartComponent>
                </CardBody>
              </Card>
            </div>

            <div className="home_container_charts_table__chart">
              <div className="home_container_charts_table__chart_header">
                المستخدمين الجدد
              </div>

              <Card width="100%" borderRadius="14px" padding="36px">
                <CardBody padding="0px">
                  <div className="home_container_charts_table__chart_card_title">
                    نسبة زيادة عدد المستخدمين الجدد لهذا الشهر
                  </div>
                  <PieChartComponentWithOneValue
                    data={datat}
                  ></PieChartComponentWithOneValue>
                  <div className="home_container_charts_table__chart_card_footer">
                  
                    <div className="home_container_charts_table__chart_card_footer_txt">
                   
                    نسبة المستخدمين الجدد
                    </div>
                   
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* <div className="home_container_charts_table__table">
              <Card width="100%">
                <CardHeader paddingBottom="8px">
                  <Heading>
                    <Text fontSize="24px" fontWeight="bold">
                      Units
                    </Text>
                  </Heading>
                </CardHeader>
                <CardBody paddingTop="0px">
                  <BarChartComponent
                    data={barData}
                    dataKeyValue={"value"}
                    name={"name"}
                  />
                </CardBody>
              </Card>
            </div> */}
          </div>
          <div className="home_container_tables">
            <div className="home_container_item_tables ml-12">
              <div className="home_container_tables_item_header">
                <div className="home_container_tables_item_header_title">
                  الإيجارات المستحقة
                </div>
                <div className="home_container_tables_item_header_btn">
                  <Button
                    backgroundColor="white"
                    colorScheme="gray"
                    variant="outline"
                  >
                    عرض الكل
                  </Button>
                </div>
              </div>
              <div className="home_container_tables_item_table">
                <Card>
                  <TableContainer>
                    <Table variant="simple">
                      <Tbody padding="16px">
                        {rentTable.map((item, index) => (
                          <Tr>
                            <Td>
                              <div className="pt-8 pb-8">{item.name}</div>
                            </Td>
                            <Td>{item.date}</Td>
                            <Td>{item.property}</Td>
                            <Td>{item.price}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Card>
              </div>
            </div>

            <div className="home_container_item_tables mr-12">
              <div className="home_container_tables_item_header">
                <div className="home_container_tables_item_header_title">
                  أحدث التذاكر
                </div>
                <div className="home_container_tables_item_header_btn">
                  <Button
                    backgroundColor="white"
                    colorScheme="gray"
                    variant="outline"
                  >
                    عرض الكل
                  </Button>
                </div>
              </div>
              <div className="home_container_tables_item_table">
                <div>
                  {[1, 2].map((i) => (
                    <>
                      <div style={{ marginBottom: "16px" }}>
                        <CardWithImg
                          header="طلب خدمة"
                          address=".دریگ رارق هدافتسا دروم اساسا یحارط دوجوم یایند لها هتسویپ تالاوس یوگباوج و یلصا یاهدرواتسد ینیچفورح لماش زاین دروم نامزو دسر نایاپ هب پیات تخس طیارش و اهراکهار هئارا"
                          title=" شقة 107"
                          name="محمد ممدوح"
                          desc="شقه"
                          height="100%"
                          isBtns={true}
                          isVertical={true}
                        ></CardWithImg>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
