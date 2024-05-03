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
import "../../../assets/styels/components/page.scss";

import money from "../../../assets/icons-svgs/money.svg";
import houseIcon from "../../../assets/icons-svgs/house.svg";
import homesIcon from "../../../assets/icons-svgs/homes.svg";
import CardWithNumber from "../../../components/Cards/CardWithNumber";

import PropertiesTable from "./PropertiesTable";
import UnitsTable from "../../units/templete/UnitsTable";
import PageHeader from "../../../components/shared/PageHeader";
import { useTranslation } from "react-i18next";
import useStats from "../../../hooks/useStats";

const PropertiesComponent = ({ data, owenerId }) => {
  const { t } = useTranslation();
  //get stats 
  const { statsData, statsRefetch } = useStats();
  useEffect(()=>{
    statsRefetch()
  },[])

  const CardsDemo = [
    {
      img: houseIcon,
      bg: "#EFF9FF",
      title: " ر.س",
      desc: t("general.total_properties"),
    },
    {
      img: homesIcon,
      bg: "#E4FFDF",
      title: "ر.س",
      desc: t("general.total_numbers_units"),
    },
    {
      img: money,
      bg: "#CFB2FE",
      title: "ر.س",
      desc: t("general.total_rent_money"),
    },
  ];

  return (
    <>
      <div className="page">
        <div className="page_container">
          <div className="page_container_header">
            <PageHeader title={t("propreties.page.header")}></PageHeader>
          </div>
          <div className="page_container_cards">
            {CardsDemo?.map((card, index) => (
              <div className="page_container_cards_card">
                <CardWithNumber
                  key={index}
                  bg={card.bg}
                  desc={card.desc}
                  icon={card.img}
                  number={index == 0 ? statsData?.propertiesUnitsStats?.properties : index == 1 ? statsData?.propertiesUnitsStats?.units: (statsData?.propertiesUnitsStats?.totalRent +" "+card.title) }
                ></CardWithNumber>
              </div>
            ))}
          </div>
          <div className="page_container_table">
            <Card>
              <Tabs isLazy>
                <TabList>
                  <Tab padding={"16px"}>{t("general.properties")}</Tab>
                  <Tab padding={"16px"}>{t("general.units")}</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <PropertiesTable />
                  </TabPanel>

                  <TabPanel>
                    <UnitsTable></UnitsTable>
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

export default PropertiesComponent;
