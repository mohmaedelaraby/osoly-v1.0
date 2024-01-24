import { Outlet } from "react-router-dom";
import "../assets/genric-styles/mainLayout.css";
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
