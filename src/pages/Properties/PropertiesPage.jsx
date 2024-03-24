import "../../assets/styels/genric-styles/table.scss";
import useClosePopUps from "../../store/useClosePopups";
import { useEffect, useState } from "react";
import useProperties from "../../modules/propreties/hooks/useAllProperties";
import Pagination from "../../components/shared/Pagination";
import PropertiesComponent from "../../modules/propreties/templete/PropertiesComponent";


const PropertiesTablePage = () => {
  const {show}=useClosePopUps()
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { PropertiesData, isLoading, PropertiesRefetch } = useProperties({
    pageNo: currentPage,
    limit: limit,
  });
  useEffect(() => {
    PropertiesRefetch();
    if(show && !isLoading){
      PropertiesRefetch()
    }
  }, [currentPage,show]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
       <div>
        {PropertiesData?.updatedProperties && !isLoading? (
          <>
            
             <div className="genric_page">
             <PropertiesComponent/>
               
             </div>
          </>
        ) : (
          <>
          NO Page
          </>
        )}
      </div>
    </>
  );
};

export default PropertiesTablePage;
