import { Card, CardBody } from "@chakra-ui/react";
import UserTable from "../../modules/users/templete/UserTable";
import "../../assets/styels/pages/UserTable.scss";
/* import Pagination from "../../components/shared/Pagination";
import { useState } from "react"; */

const UserTablePage = () => {
  /* const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }; */
  return (
    <>
      <div className="table_container">
        <Card width="90%">
          <CardBody  marginBottom='24px'>
            <UserTable/>
          </CardBody>
        </Card>
        {/*  {
          <Pagination
            totalCount={12}
            currentPage={0}
            pageSize={12}
            onPageChange={handlePageChange}
          />
        } */}
      </div>
    </>
  );
};

export default UserTablePage;
