import { Card, CardBody } from "@chakra-ui/react";
import "../../assets/styels/genric-styles/table.scss";
import UserEnterpraiseTable from "../../modules/enterpraiseUsers/templete/EnterpraiseUserTable";
/* import Pagination from "../../components/shared/Pagination";
import { useState } from "react"; */

const EnterpraisUserTablePage = () => {
  /* const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }; */
  return (
    <>
      <div className="table_container">
        <Card width="90%">
          <CardBody  marginBottom='24px'>
            <UserEnterpraiseTable/>
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

export default EnterpraisUserTablePage;
