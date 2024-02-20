import { Card, CardBody } from "@chakra-ui/react";
import "../../assets/styels/genric-styles/table.scss";
import PropertyTable from "../../modules/propreties/templete/PropertiesTable";
import useClosePopUps from "../../store/useClosePopups";
import { useEffect, useState } from "react";
import useProperties from "../../modules/propreties/hooks/useAllProperties";
import Pagination from "../../components/shared/Pagination";
/* import Pagination from "../../components/shared/Pagination";
import { useState } from "react"; */

const PropertiesTablePage = () => {
  const {show}=useClosePopUps()
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading, refetch } = useProperties({
    pageNo: currentPage,
    limit: limit,
  });
  useEffect(() => {
    refetch();
    if(show && !isLoading){
      refetch()
    }
  }, [currentPage,show]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
       <div className="table_container">
        {data?.properties && !isLoading? (
          <>
            <Card  maxWidth='1020px' minWidth='1020px' minHeight='85%'>
              <CardBody marginBottom="24px">
                <PropertyTable data={data?.properties}/>
                <div className="table_container_paganation">
                  {
                    <Pagination
                      totalCount={data?.pagination.count}
                      currentPage={currentPage}
                      pageSize={10}
                      onPageChange={handlePageChange}
                    />
                  }
                </div>
              </CardBody>
            </Card>
          </>
        ) : (
          <>
          NO TABLE
          </>
        )}
      </div>
    </>
  );
};

export default PropertiesTablePage;
