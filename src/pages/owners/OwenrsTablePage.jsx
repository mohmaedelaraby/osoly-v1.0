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

  const { usersData, usersisLoading, usersRefetch } = useUsers({
    pageNo: currentPage,
    limit: limit,
  });
  useEffect(() => {
    usersRefetch();
    if(show && !usersisLoading){
      usersRefetch()
    }
  }, [currentPage,show]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
       <div className="table_container">
        {usersData?.users && !usersisLoading? (
          <>
            <Card  maxWidth='1020px' minWidth='1020px' minHeight='85%'>
              <CardBody marginBottom="24px">
                <OwnerTable data={usersData?.users}/>
                <div className="table_container_paganation">
                  {
                    <Pagination
                      totalCount={usersData?.paginationOption.count}
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
