import React, { useEffect, useState } from "react";
import "../../assets/styels/pages/tickets.scss";
import TicketsContainer from "../../modules/Tickets/templete/TicketsContainer";
import { Card, CardBody } from "@chakra-ui/react";
import { tickets } from "../../mocks/tickets";
import useTickets from "../../modules/Tickets/hooks/useTickets";
import Pagination from "../../components/shared/Pagination";
import { Pagination_Types } from "../../enums/PaginationEnum";

const TicketsPage = () => {
  /*  */
  return (
    <>
      <>
        <TicketsContainer />
      </>
    </>
  );
};

export default TicketsPage;
