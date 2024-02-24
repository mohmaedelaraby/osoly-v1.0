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

  const { PropertiesData, isLoading, PropertiesRefetch } = useProperties({
    pageNo: currentPage,
    limit: limit,
  });
  useEffect(() => {
    PropertiesRefetch();
    if(show && !isLoading){
      PropertiesRefetch()
    }
  }, [currentPage,show]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
       <div className="table_container">
        {PropertiesData?.properties && !isLoading? (
          <>
            <Card  maxWidth='1020px' minWidth='1020px' minHeight='85%'>
              <CardBody marginBottom="24px">
                <PropertyTable data={PropertiesData?.properties}/>
                <div className="table_container_paganation">
                  {
                    <Pagination
                      totalCount={PropertiesData?.pagination.count}
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
