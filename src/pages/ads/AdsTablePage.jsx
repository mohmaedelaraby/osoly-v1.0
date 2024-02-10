import { Card, CardBody } from "@chakra-ui/react";
import "../../assets/styels/genric-styles/table.scss";
import AdsTable from "../../modules/ads/templete/AdsTable";
import Pagination from "../../components/shared/Pagination";
import { useEffect, useState } from "react";
import useClosePopUps from "../../store/useClosePopups";
import useAds from "../../modules/ads/hooks/useAds";

const AdsTablePage = () => {
  const {show ,toggleShow}=useClosePopUps()
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading, refetch } = useAds({
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
      {data?.ads && !isLoading? (
          <>
            <Card width="90%" minHeight='85%'>
              <CardBody marginBottom="24px">
                <AdsTable data={data?.ads}/>
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

export default AdsTablePage;
