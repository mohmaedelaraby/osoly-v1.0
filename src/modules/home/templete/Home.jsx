import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaBuilding, FaHouseUser, FaTicketAlt, FaUser } from "react-icons/fa";
import "../style/Home.scss";
import PieChartComponent from "../../../components/Charts/PieChart";
import BarChartComponent from "../../../components/Charts/BarChart";
import CardWithImg from "../../../components/Cards/CardWithImg";
import CardWithNumber from "../../../components/Cards/CardWithNumber";
import moneyIcon from "../../../assets/icons-svgs/money.svg";
import interfaceIcon from "../../../assets/icons-svgs/interface.svg";
import houseIcon from "../../../assets/icons-svgs/house.svg";
import homesIcon from "../../../assets/icons-svgs/homes.svg";
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
            {/* {metricData && metircArr?.map((item, i) => (
              <div key={i} className="home_container_cards_card">
                <CardWithNumber></CardWithNumber>
              </div>
            ))} */}
            <CardWithNumber icon={houseIcon} number={250} desc={'إجمالي الوحدات المؤجرة'} bg={'#E2FBD7'}></CardWithNumber>
            <CardWithNumber icon={homesIcon} number={170} desc={'  إجمالي العقارات'} bg={'#EFF9FF'}></CardWithNumber>
            <CardWithNumber icon={moneyIcon} number={'20k'} desc={'  تحصيل الشهر الحالي'} bg={'#F3EBFF'}></CardWithNumber>
            <CardWithNumber icon={interfaceIcon} number={120} desc={'إجمالي التذاكر المفتوحة'} bg={'#FFE4CE'}></CardWithNumber>
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
