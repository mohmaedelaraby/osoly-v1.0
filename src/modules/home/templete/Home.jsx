import {
  Button,
  Card,
  CardBody,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { FaBuilding, FaHouseUser, FaUser } from "react-icons/fa";
import "../style/Home.scss";

import CardWithImg from "../../../components/Cards/CardWithImg";
import CardWithNumber from "../../../components/Cards/CardWithNumber";
import moneyIcon from "../../../assets/icons-svgs/money.svg";
import interfaceIcon from "../../../assets/icons-svgs/interface.svg";
import houseIcon from "../../../assets/icons-svgs/house.svg";
import homesIcon from "../../../assets/icons-svgs/homes.svg";
import { useTranslation } from "react-i18next";
import PieChartComponent from "../../../components/Charts/PieChart";
import PieChartComponentWithOneValue from "../../../components/Charts/PieChartWithOneValue";
import LineChartWithDate from "../../../components/shared/LineChartWithDate";
import PageHeader from "../../../components/shared/PageHeader";
import useTickets from "../../Tickets/hooks/useTickets";
import useUnits from "../../units/hooks/useUnits";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { t } = useTranslation();

  const currentUserJson = localStorage.getItem("currentUser");
  const homeData = JSON.parse(currentUserJson);
  const [pieData, setPieData] = useState();
  const [ownersCount, setOwnersCount] = useState(0);
  const [propertiesCount, setPropertiesCount] = useState(0);
  const [tenantsCount, setTenantsCount] = useState(0);
  const [metricData, setMetricData] = useState();
  const [barData, setBarData] = useState();
  const navigate = useNavigate();
  const {
    data: allData,
    isLoading: allLoading,
    refetch: allrefetch,
  } = useTickets({
    pageNo: 1,
    limit: 10,
  });

  const { unitsData, isUnitsLoading, unitsReftch } = useUnits({
    pageNo: 1,
    limit: 10,
  });

  useEffect(() => {
    allrefetch();
    unitsReftch();
  }, []);

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

  useEffect(()=>{
    let dashboardSettings = localStorage.getItem("dashboardSettings");
    dashboardSettings = JSON.parse(dashboardSettings)
    var bg_elementsecondry  = document.getElementById('bg_secondry')
    if(bg_elementsecondry){
      bg_elementsecondry.style.backgroundColor = dashboardSettings?.dashboardFontColor;
    }
    var bg_elementprimery  = document.getElementById('bg_primary')
    if(bg_elementprimery){
      bg_elementprimery.style.backgroundColor = dashboardSettings?.dashboardColor;
    }


    var fo_elementsecondry  = document.getElementById('fo_secondry')
    if(fo_elementsecondry){
      fo_elementsecondry.style.color = dashboardSettings?.dashboardFontColor;
    }
    var fo_elementprimery  = document.getElementById('fo_primary')
    if(fo_elementprimery){
      fo_elementprimery.style.color =  dashboardSettings?.dashboardColor;
    }
  },[])
  

  return (
    <>
      <div className="home">
        <div className="home_container">
          <div className="home_container_header">
            <PageHeader
              title={homeData?.enterprise.username}
              addtionTitle={t("general.hello")}
            ></PageHeader>
          </div>
          <div className="home_container_cards">
            <CardWithNumber
              icon={houseIcon}
              number={250}
              desc={t("home.cards.total_numbers_of_rent_units")}
              bg={"#E2FBD7"}
            ></CardWithNumber>
            <CardWithNumber
              icon={homesIcon}
              number={170}
              desc={t("home.cards.total_numbers_of_units")}
              bg={"#EFF9FF"}
            ></CardWithNumber>
            <CardWithNumber
              icon={moneyIcon}
              number={"20k"}
              desc={t("home.cards.total_money")}
              bg={"#F3EBFF"}
            ></CardWithNumber>
            <CardWithNumber
              icon={interfaceIcon}
              number={120}
              desc={t("home.cards.total_open_tickets")}
              bg={"#FFE4CE"}
            ></CardWithNumber>
          </div>
          <div className="home_container_charts_table">

            <div className="home_container_charts_table__chart w-100 ml-24">
              <LineChartWithDate />
            </div>

            <div className="home_container_charts_table__chart ml-24">
              <div  id="fo_primary" className="home_container_charts_table__chart_header">
                {t("general.tickets")}
              </div>

              <Card width="100%" borderRadius="14px" padding="36px">
                <CardBody padding="0px">
                  <PieChartComponent data={PieTest}></PieChartComponent>
                </CardBody>
              </Card>
            </div>

            <div className="home_container_charts_table__chart">
              <div  id="fo_primary" className="home_container_charts_table__chart_header" >
                {t("home.charts.new_users_title")}
              </div>

              <Card width="100%" borderRadius="14px" padding="36px" maxHeight='364px'>
                <CardBody padding="0px">
                  <div className="home_container_charts_table__chart_card_title">
                    {t("home.charts.new_users_desc")}
                  </div>
                  <PieChartComponentWithOneValue
                    data={datat}
                  ></PieChartComponentWithOneValue>
                  <div className="home_container_charts_table__chart_card_footer">
                    <div className="home_container_charts_table__chart_card_footer_txt">
                      <span>
                        <Icon viewBox="0 0 200 200" color="green.500">
                          <path
                            fill="currentColor"
                            d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                          />
                        </Icon>
                      </span>
                      <span> {t("home.charts.new_users_discalmer")} </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>


          <div className="home_container_tables">
            <div className="home_container_item_tables ml-12">
              <div className="home_container_tables_item_header">
                <div className="home_container_tables_item_header_title" id="fo_primary">
                  {t("home.charts.rent_title")}
                </div>
                <div className="home_container_tables_item_header_btn">
                  <Button
                    backgroundColor="white"
                    colorScheme="gray"
                    variant="outline"
                    onClick={() => {
                      navigate("/propreties");
                    }}
                  >
                    {t("general.show_all")}
                  </Button>
                </div>
              </div>
              <div className="home_container_tables_item_table">
                <Card>
                  <TableContainer>
                    <Table variant="simple">
                      <Tbody padding="16px">
                        {!isUnitsLoading &&
                          unitsData?.units?.slice(0, 4).map((item, index) => (
                            <Tr id={index}>
                              <Td>
                                <div className="pt-16 pb-16">{item.name}</div>
                              </Td>
                              <Td>{item.rentCollectionDate}</Td>
                              <Td>{item.address}</Td>
                              <Td>{item.rent} ر.س</Td>
                            </Tr>
                          ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Card>
              </div>
            </div>

            <div className="home_container_item_tables_ticket mr-12">
              <div className="home_container_tables_item_header">
                <div className="home_container_tables_item_header_title" id="fo_primary">
                  {t("general.latest")} {t("general.tickets")}
                </div>
                <div className="home_container_tables_item_header_btn">
                  <Button
                    backgroundColor="white"
                    colorScheme="gray"
                    variant="outline"
                    onClick={() => {
                      navigate("/tickets");
                    }}
                  >
                    {t("general.show_all")}
                  </Button>
                </div>
              </div>
              <div className="home_container_tables_item_table">
                <div>
                  {!allLoading &&
                    allData?.tickets?.slice(0, 2).map((i, index) => (
                      <>
                        <div style={{ marginBottom: "16px" }}>
                          <CardWithImg
                            key={index}
                            header={i?.type}
                            address={i?.unit?.address}
                            title={i?.unit?.name}
                            name={i?.tenant?.firstNameAr}
                            desc={i?.description}
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
