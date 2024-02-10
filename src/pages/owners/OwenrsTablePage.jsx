import { Card, CardBody } from "@chakra-ui/react";
import "../../assets/styels/genric-styles/table.scss";
import OwnerTable from "../../modules/owners/templete/OwnerTable";
import Pagination from "../../components/shared/Pagination";
import { useEffect, useState } from "react";
import useClosePopUps from "../../store/useClosePopups";
import useUsers from "../../modules/users/hooks/useUsers";

const OwenrsTablePage = () => {
  const {show }=useClosePopUps()
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading, refetch } = useUsers({
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
                <OwnerTable data={data?.users}/>
                <div className="table_container_paganation">
                  {
                    <Pagination
                      totalCount={data?.paginationOption.count}
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

export default OwenrsTablePage;
