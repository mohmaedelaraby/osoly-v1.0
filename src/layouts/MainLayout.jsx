import { Outlet } from "react-router-dom";
import "../assets/styels/genric-styles/mainLayout.scss";
import SideBar from "../components/sidebar/SideBar";

const MainLayout = () => {
  return (
      <div className="homepage">
        <SideBar/>
        <div className="w-100">
        <Outlet/>
        </div>
      </div>
    
  );
};

export default MainLayout;
