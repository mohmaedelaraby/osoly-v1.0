import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import React from "react";
import {  FaBuilding, FaHouseUser, FaUser } from "react-icons/fa";
import '../style/Home.scss'
import PieChart from "../../../components/Charts/PieChart";
const Home = () => {
  const arr = [
    {
      tile: "Users",
      label: "User",
      icon:<FaUser/>,
      num: 12,
    },
    {
      tile: "Owners",
      label: "Owner",
      icon:<FaHouseUser/>,
      num: 102,
    },
    {
      tile: "Properties",
      label: "Property",
      icon:<FaBuilding/>,
      num: 1122,
    },
  ];
  return (
    <>
      <div className="home">
        <div className="home_container">
          <div className="home_container_cards">
            {arr.map((item, i) => (
              <div key={i} className="home_container_cards_card">
                <Card width='80%'>
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
                  <CardBody paddingTop='0px'>
                    <span className="home_container_cards_card_num">{item.num}</span>
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
              <PieChart/>
            </div>
            <div className="home_container_charts_table__table">

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
