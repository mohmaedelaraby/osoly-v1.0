import { Outlet } from "react-router-dom";
import "../assets/genric-styles/mainLayout.css";
import SideBar from "../components/sidebar/SideBar";

const MainLayout = () => {
  return (
      <div className="homepage">
        <SideBar/>
        <Outlet/>
      </div>
    
  );
};

export default MainLayout;
