import {
  Button,
  Card,
  CardBody,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import LineChart from "../Charts/LineChart";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { useDynamicColors } from "../../hooks/useDynamicColors";

function LineChartWithDate() {
  const { t } = useTranslation();
  const {primary,secondry}=useDynamicColors()
  const basicBoxStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxSize: '250px',
    color: 'white',
    textShadow: '0 0 20px black',
    fontWeight: 'bold',
    fontSize: '20px',
    px: 4,
   
  }
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

  return (
    <>
      <div className="flex-between">
        <div className="home_container_charts_table__chart_header fo_primary">
          {t("general.rent_collect")}
        </div>

        <div className="home_container_charts_table__chart_header">
          <Menu>
            <MenuButton
              bg={'white'}
              as={Button}
              color={primary}
              marginRight="8px"
              marginLeft="8px"
              rightIcon={<ChevronDownIcon />}  colorScheme={'white'}
              borderRadius="md"
              borderWidth="1px"
              _hover={{ bg: "gray.400" }}
              _expanded={{ bg: "blue.400" }}
              _focus={{ boxShadow: "outline" }}
            >
              {t("general.last")} 5  {t("general.months")}
            </MenuButton>
            <MenuList>
              <MenuItem fontSize={"14px"}>{t("general.last")} 3  {t("general.months")}</MenuItem>
              <MenuItem fontSize={"14px"}>{t("general.last")} 5  {t("general.months")}</MenuItem>
              <MenuItem fontSize={"14px"}>{t("general.last")} 12  {t("general.months")}</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>

      <Card width="100%" borderRadius="14px" padding="36px"   filter='auto' blur='8px'>
        <CardBody padding="0px" >
          <LineChart data={Linedata} />
        </CardBody>
      </Card>
    </>
  );
}

export default LineChartWithDate;
