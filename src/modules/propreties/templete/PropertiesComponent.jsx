import {
  Button,
  Card,
  Checkbox,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../../../assets/styels/components/Table.scss";
import "../../../assets/styels/components/page.scss";
import {
  AddIcon,
  CalendarIcon,
  ChevronDownIcon,
  DragHandleIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import CreateProperty from "./CreateProperty";
import useClosePopUps from "../../../store/useClosePopups";
import money from "../../../assets/icons-svgs/money.svg";
import user from "../../../assets/images/user.png";
import CardWithNumber from "../../../components/Cards/CardWithNumber";
import Pagination from "../../../components/shared/Pagination";
import useProperties from "../hooks/useAllProperties";
import CardWithImg from "../../../components/Cards/CardWithImg";
import CreateUnit from "../../units/templete/CreateUnit";
import useUnits from "../../units/hooks/useUnits";
import PropertiesTable from "./PropertiesTable";
import UnitsTable from "../../units/templete/UnitsTable";

const PropertiesComponent = ({ data, owenerId }) => {
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
  const navigate = useNavigate();


  return (
    <>
      <div className="page">
        <div className="page_container">
          <div className="page_container_header">
            <div className="page_container_header__title">العقارات/الوحدات</div>
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
                  <Tab padding={'16px'}>عقارات</Tab>
                  <Tab padding={'16px'}>وحدات</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                  <PropertiesTable/>
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
