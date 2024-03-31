import "../../assets/styels/genric-styles/table.scss";
import useClosePopUps from "../../store/useClosePopups";
import { useEffect, useState } from "react";
import useProperties from "../../modules/propreties/hooks/useAllProperties";
import Pagination from "../../components/shared/Pagination";
import PropertiesComponent from "../../modules/propreties/templete/PropertiesComponent";

const PropertiesTablePage = () => {
  return (
    <>
      <PropertiesComponent />
    </>
  );
};

export default PropertiesTablePage;
