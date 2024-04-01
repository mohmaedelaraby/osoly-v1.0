import {
  Card,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import "../../../assets/styels/components/Table.scss";
import { useNavigate } from "react-router-dom";
import money from "../../../assets/icons-svgs/money.svg";
import user from "../../../assets/images/user.png";
import CardWithNumber from "../../../components/Cards/CardWithNumber";
import UserTable from "./UserTable";
import OwnerTable from "../../owners/templete/OwnerTable";

const UserComponent = ({ data }) => {
  const CardsDemo = [
    {
      img: money,
      bg: "#CFB2FE",
      title: "3450 ر.س",
      desc: "مجموع الإيجار",
    },
    {
      img: money,
      bg: "#CFB2FE",
      title: "3450 ر.س",
      desc: "مجموع الإيجار",
    },
    {
      img: money,
      bg: "#CFB2FE",
      title: "3450 ر.س",
      desc: "مجموع الإيجار",
    },
  ];

  return (
    <>
      <div className="page">
        <div className="page_container">
          <div className="page_container_header">
            <div className="page_container_header__title">المستخدمين</div>
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
            <Card>
              <Tabs>
                <TabList>
                  <Tab padding={'16px'}>المستأجرين</Tab>
                  <Tab padding={'16px'}>ملاك العقار</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <UserTable></UserTable>
                  </TabPanel>

                  <TabPanel>
                    <OwnerTable></OwnerTable>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserComponent;
