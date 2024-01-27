import { Card, CardBody } from "@chakra-ui/react";
import "../../assets/styels/genric-styles/table.scss";
import AdsTable from "../../modules/ads/templete/AdsTable";
/* import Pagination from "../../components/shared/Pagination";
import { useState } from "react"; */

const AdsTablePage = () => {
  /* const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }; */
  return (
    <>
      <div className="table_container">
        <Card width="90%">
          <CardBody  marginBottom='24px'>
            <AdsTable/>
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

export default AdsTablePage;
