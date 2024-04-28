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
import "../../../assets/styels/components/page.scss";

import money from "../../../assets/icons-svgs/money.svg";
import CardWithNumber from "../../../components/Cards/CardWithNumber";

import PropertiesTable from "./PropertiesTable";
import UnitsTable from "../../units/templete/UnitsTable";
import PageHeader from "../../../components/shared/PageHeader";
import { useTranslation } from "react-i18next";

const PropertiesComponent = ({ data, owenerId }) => {
  const { t } = useTranslation();

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
                  number={card.title}
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
