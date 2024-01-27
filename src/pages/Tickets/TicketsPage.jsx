import React from "react";
import { tickets } from "../../mocks/tickets";
import TicketCard from "../../modules/Tickets/templete/TicketCard";
import "../../assets/styels/pages/tickets.scss";

const TicketsPage = () => {
  return (
    <>
      <div className="tickets_container">
        {tickets.map((item, index) => (
          <>
            <div className="tickets_item">
              <TicketCard item={item} key={index}></TicketCard>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default TicketsPage;
