import { Card, CardBody } from "@chakra-ui/react";
import UserTable from "../../modules/users/templete/UserTable";
import "../../assets/styels/pages/UserTablePage.scss";

const UserTablePage = () => {
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
      </div>
    </>
  );
};

export default UserTablePage;
