import { Card, CardBody } from "@chakra-ui/react";
import UserTable from "../../modules/users/templete/UserTable";
import "../../assets/styels/genric-styles/table.scss";
import Pagination from "../../components/shared/Pagination";
import { useEffect, useState } from "react";
import useUsers from "../../modules/users/hooks/useUsers";

const UserTablePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading, refetch } = useUsers({
    pageNo: currentPage,
    limit: limit,
  });

  useEffect(() => {
    refetch();
    console.log(data)
  }, [data, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className="table_container">
        {data.users ? (
          <>
            <Card width="90%">
              <CardBody marginBottom="24px">
                <UserTable data={data?.users}/>
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
          <></>
        )}
      </div>
    </>
  );
};

export default UserTablePage;
