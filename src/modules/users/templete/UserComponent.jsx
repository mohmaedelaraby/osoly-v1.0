import {
  Card,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import "../../../assets/styels/components/Table.scss";
import totalUsers from "../../../assets/icons-svgs/totalUsers.svg";
import totalrenters from "../../../assets/icons-svgs/totalrenters.svg";
import homesGreen from "../../../assets/icons-svgs/homesGreen.svg";
import CardWithNumber from "../../../components/Cards/CardWithNumber";
import UserTable from "./UserTable";
import OwnerTable from "../../owners/templete/OwnerTable";
import PageHeader from "../../../components/shared/PageHeader";
import { useTranslation } from "react-i18next";
import useStats from "../../../hooks/useStats";


const UserComponent = () => {
  const { t } = useTranslation();
  const { statsData, statsRefetch } = useStats();
  useEffect(()=>{
    statsRefetch()
  },[])
  const CardsDemo = [
    {
      img: totalUsers,
      bg: "#E0F2FF",
      title: "ر.س",
      desc: t("general.total_number"),
    },
    {
      img: homesGreen,
      bg: "#E5FFEE",
      title: "ر.س",
      desc: t("general.total_owners"),
    },
    {
      img: totalrenters,
      bg: "#FFF7E5",
      title: "ر.س",
      desc: t("general.total_tenats"),
    },
  ];

  return (
    <>
      <div className="page">
        <div className="page_container">
          <div className="page_container_header">
            <PageHeader title={t("users.page.header")}></PageHeader>
          </div>
          <div className="page_container_cards">
            {CardsDemo?.map((card, index) => (
              <div className="page_container_cards_card">
                <CardWithNumber
                  key={index}
                  bg={CardsDemo[index]?.bg}
                  desc={CardsDemo[index]?.desc}
                  icon={CardsDemo[index]?.img}
                  number={index == 0 ? statsData?.usersStats?.total : index == 1 ? statsData?.usersStats?.owners : statsData?.usersStats?.tenants }
                ></CardWithNumber>
              </div>
            ))}
          </div>

          <div className="page_container_table">
            <Card>
              <Tabs isLazy>
                <TabList>
                  <Tab padding={"16px"}> {t("general.renters")}</Tab>
                  <Tab padding={"16px"}> {t("general.oweners")}</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <UserTable switchTo={true}></UserTable>
                  </TabPanel>

                  <TabPanel>
                    <OwnerTable switchTo={true}></OwnerTable>
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
