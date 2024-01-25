import { Card, CardBody } from "@chakra-ui/react";
import UserTable from "../../modules/users/templete/UserTable";
import "../../assets/styels/pages/UserTablePage.scss";
import Pagination from "../../components/shared/Pagination";
import { useState } from "react";

const UserTablePage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className="table_container">
        <Card width="90%">
          <CardBody>
            <Card>
              <CardBody>
                <UserTable />
              </CardBody>
            </Card>
          </CardBody>
        </Card>
        {
          <Pagination
            totalCount={12}
            currentPage={0}
            pageSize={12}
            onPageChange={handlePageChange}
          />
        }
      </div>
    </>
  );
};

export default UserTablePage;
