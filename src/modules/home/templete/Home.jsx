import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaBuilding, FaHouseUser, FaTicketAlt, FaUser } from "react-icons/fa";
import "../style/Home.scss";
import PieChartComponent from "../../../components/Charts/PieChart";
import BarChartComponent from "../../../components/Charts/BarChart";
const Home = () => {
  const currentUserJson = localStorage.getItem("currentUser");
  const homeData = JSON.parse(currentUserJson)
  const [pieData,setPieData]=useState()
  const [ownersCount,setOwnersCount]=useState(0)
  const [propertiesCount,setPropertiesCount]=useState(0)
  const [tenantsCount,setTenantsCount]=useState(0)
  const [metricData,setMetricData]=useState()
  const [barData,setBarData]=useState()
  const metircArr = [
    {
      tile: "Tenants",
      label: "Tickets",
      icon: <FaUser />,
      num:0
    },
    {
      tile: "Owners",
      label: "Owner",
      icon: <FaHouseUser />,
      num:0
    },
    {
      tile: "Properties",
      label: "Property",
      icon: <FaBuilding />,
      num:0
    },
  ];
 const metricVals =[]
  useEffect(()=>{
    console.log(homeData.stats)
    setPieData(homeData?.stats?.ticketsStats)
    setBarData(homeData?.stats?.unitsStats)
    setOwnersCount(homeData?.stats?.ownersCount)
    setPropertiesCount(homeData?.stats?.propertiesCount)
    setTenantsCount(homeData?.stats?.tenantsCount)
    
  },[])
  useEffect(()=>{
   setMetricData([homeData?.stats?.tenantsCount,homeData?.stats?.ownersCount,homeData?.stats?.propertiesCount])
  },[ownersCount,propertiesCount,tenantsCount])
 

  return (
    <>
      <div className="home">
        <div className="home_container">
          <div className="home_container_cards">
            {metricData && metircArr?.map((item, i) => (
              <div key={i} className="home_container_cards_card">
                <Card width="90%">
                  <CardHeader paddingBottom="8px">
                    <Heading>
                      <div className="home_container_cards_card_header">
                        <div className="home_container_cards_card_header_icon">
                          {item.icon}
                        </div>
                        <div className="home_container_cards_card_header_title">
                          {item.tile}
                        </div>
                      </div>
                    </Heading>
                  </CardHeader>
                  <CardBody paddingTop="0px">
                    <span className="home_container_cards_card_num">
                     {metricData[i]}
                    </span>
                    <span className="home_container_cards_card_label">
                      {item.label}
                    </span>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
          <div className="home_container_charts_table">
            <div className="home_container_charts_table__chart">
              <Card width="100%">
                <CardHeader paddingBottom="8px">
                  <Heading>
                    <Text fontSize="24px" fontWeight="bold">
                      Tickets
                    </Text>
                  </Heading>
                </CardHeader>
                <CardBody paddingTop="0px">
                  <PieChartComponent data={pieData} />
                </CardBody>
              </Card>
            </div>
            <div className="home_container_charts_table__table">
            <Card width="100%">
                <CardHeader paddingBottom="8px">
                  <Heading>
                    <Text fontSize="24px" fontWeight="bold">
                      Units
                    </Text>
                  </Heading>
                </CardHeader>
                <CardBody paddingTop="0px">
                  <BarChartComponent data={barData}  dataKeyValue={"value"}  name={"name"} />
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
