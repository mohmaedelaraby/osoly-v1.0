import React from "react";
import "../../assets/styels/pages/tickets.scss";
import TicketsContainer from "../../modules/Tickets/templete/TicketsContainer";
import { Card, CardBody } from "@chakra-ui/react";
import { tickets } from "../../mocks/tickets";

const TicketsPage = () => {
  return (
    <>
     <div className="tickets_page">
        {tickets? (
          <>
            <Card width="90%" minHeight='85%' maxHeight='85%' overflowY='scroll'>
              <CardBody marginBottom="24px">
                <TicketsContainer/>  
              </CardBody>
            </Card>
          </>
        ) : (
          <>
          NO Tickets
          </>
        )}
      </div>
    </>
  );
};

export default TicketsPage;
