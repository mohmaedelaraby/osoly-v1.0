import React, { useEffect, useState } from "react";
import "../../assets/styels/pages/tickets.scss";
import TicketsContainer from "../../modules/Tickets/templete/TicketsContainer";
import { Card, CardBody } from "@chakra-ui/react";
import { tickets } from "../../mocks/tickets";
import useTickets from "../../modules/Tickets/hooks/useTickets";
import Pagination from "../../components/shared/Pagination";
import { Pagination_Types } from "../../enums/PaginationEnum";

const TicketsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading, refetch } = useTickets({
    pageNo: currentPage,
    limit: limit,
  });
  useEffect(() => {
    refetch();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className="tickets_page">
        {data && data?.tickets ? (
          <>
            <Card
              width="90%"
              minHeight="85%"
              maxHeight="85%"
              overflowY="scroll"
            >
              <CardBody marginBottom="24px">
                <TicketsContainer data={data?.tickets} />
                <div className="table_container_paganation">
                  {
                    <Pagination
                      type={Pagination_Types.LoadMore}
                      totalCount={data?.pagination.count}
                      currentPage={currentPage}
                      pageSize={25}
                      onPageChange={handlePageChange}
                    />
                  }
                </div>
              </CardBody>
            </Card>
          </>
        ) : (
          <>NO Tickets</>
        )}
      </div>
    </>
  );
};

export default TicketsPage;
