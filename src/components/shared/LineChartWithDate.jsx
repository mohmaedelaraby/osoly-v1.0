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

function LineChartWithDate() {
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
        <div className="home_container_charts_table__chart_header">
          الإيجار المحصل
        </div>

        <div className="home_container_charts_table__chart_header">
          <Menu>
            <MenuButton bg={'white'} as={Button}
              marginRight="8px"
              marginLeft="8px"
              rightIcon={<ChevronDownIcon />}
              borderRadius='md'
              borderWidth='1px'
              bg='white'
              _hover={{ bg: 'gray.400' }}
              _expanded={{ bg: 'blue.400' }}
              _focus={{ boxShadow: 'outline' }}>
              آخر 5 شهور
            </MenuButton>
            <MenuList>
              <MenuItem fontSize={'14px'}>آخر 3 شهور</MenuItem>
              <MenuItem fontSize={'14px'}>آخر 5 شهور</MenuItem>
              <MenuItem fontSize={'14px'}>آخر 12 شهور</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>

      <Card width="100%" borderRadius="14px" padding="36px">
        <CardBody padding="0px">
          <LineChart data={Linedata} />
        </CardBody>
      </Card>
    </>
  );
}

export default LineChartWithDate;
