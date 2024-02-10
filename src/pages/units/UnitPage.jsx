

import { Card, CardBody } from "@chakra-ui/react";
import "../../assets/styels/genric-styles/table.scss";
import { useEffect, useState } from "react";
import useClosePopUps from "../../store/useClosePopups";
import useUnits from "../../modules/units/hooks/useUnits";
import Pagination from "../../components/shared/Pagination";
import UnitsTable from "../../modules/units/templete/UnitsTable";

const UnitPage = () => {
  const {show}=useClosePopUps()
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading, refetch } = useUnits({
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
        {data?.users && !isLoading? (
          <>
            <Card width="90%" minHeight='85%'>
              <CardBody marginBottom="24px">
                <UnitsTable data={data?.properties}/>
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

export default UnitPage;
