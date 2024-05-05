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
import "../style/Home.scss";

import CardWithImg from "../../../components/Cards/CardWithImg";
import CardWithNumber from "../../../components/Cards/CardWithNumber";
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
import { useDynamicColors } from "../../../hooks/useDynamicColors";
import useStats from "../../../hooks/useStats";
import dayjs from "dayjs";
const Home = () => {
  const { t } = useTranslation();

  const currentUserJson = sessionStorage.getItem("currentUser");
  const homeData = JSON.parse(currentUserJson);
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

  //get stats
  const { statsData, statsRefetch } = useStats();
  useEffect(() => {
    statsRefetch();
  }, []);

  const { primary, secondry } = useDynamicColors();

  return (
    <>
      <div className="home">
        <div className="home_container">
          <div className="home_container_header ">
            <PageHeader
              title={homeData?.enterprise.username}
              addtionTitle={t("general.hello")}
            ></PageHeader>
          </div>
          <div className="home_container_cards">
            <CardWithNumber
              icon={houseIcon}
              number={statsData?.homeStats?.totalRentedUnits}
              desc={t("home.cards.total_numbers_of_rent_units")}
              bg={"#E2FBD7"}
            ></CardWithNumber>
            <CardWithNumber
              icon={homesIcon}
              number={statsData?.homeStats?.totalProperties}
              desc={t("home.cards.total_numbers_of_units")}
              bg={"#EFF9FF"}
            ></CardWithNumber>
            {/*  <CardWithNumber
              icon={moneyIcon}
              number={"20k"}
              desc={t("home.cards.total_money")}
              bg={"#F3EBFF"}
            ></CardWithNumber> */}
            <CardWithNumber
              icon={interfaceIcon}
              number={statsData?.homeStats?.totalActiveTickets}
              desc={t("home.cards.total_open_tickets")}
              bg={"#FFE4CE"}
            ></CardWithNumber>
          </div>
          <div className="home_container_charts_table">
            <div className="home_container_charts_table__chart w-100 ml-24">
              <div className="home_container_charts_table__chart_blur">
                <LineChartWithDate />
                <div className="home_container_charts_table__chart_blur_phase"></div>
              </div>
            </div>

            <div className="home_container_charts_table__chart ml-24">
              <div className="home_container_charts_table__chart_header fo_primary">
                {t("general.tickets")}
              </div>

              <Card width="100%" borderRadius="14px" padding="36px">
                <CardBody padding="0px">
                  <PieChartComponent
                    numbers={statsData?.homeStats?.ticketsStatsPercentage}
                  ></PieChartComponent>
                </CardBody>
              </Card>
            </div>

            <div className="home_container_charts_table__chart">
              <div className="home_container_charts_table__chart_header fo_primary">
                {t("home.charts.new_users_title")}
              </div>

              <Card
                width="100%"
                borderRadius="14px"
                padding="36px"
                maxHeight="364px"
              >
                <CardBody padding="0px">
                  <div className="home_container_charts_table__chart_card_title">
                    {t("home.charts.new_users_desc")}
                  </div>
                  <PieChartComponentWithOneValue
                    number={statsData?.homeStats?.newUsersPercentage
                      ?.toString()
                      .slice(0, 4)}
                  ></PieChartComponentWithOneValue>
                  <div className="home_container_charts_table__chart_card_footer">
                    <div className="home_container_charts_table__chart_card_footer_txt">
                      <span>
                        <Icon viewBox="0 0 200 200">
                          <path
                            fill={primary}
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
                <div className="home_container_tables_item_header_title fo_primary">
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
                              <Td>
                                {dayjs(
                                  new Date(item.rentCollectionDate)
                                ).format("YYYY-MM-DD")}
                              </Td>
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
                <div className="home_container_tables_item_header_title fo_primary">
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
                            img={i?.image}
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
