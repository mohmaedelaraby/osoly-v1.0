import { Outlet } from "react-router-dom";
import "../assets/styels/genric-styles/mainLayout.scss";
import SideBar from "../components/sidebar/SideBar";
import { useEffect, useState } from "react";


const MainLayout = () => {
  const [bgColor, setBgcolor] = useState("#f6f6f6a7");

  useEffect(()=>{
    if(sessionStorage.getItem("bgColor")){
      setBgcolor(sessionStorage.getItem("bgColor"))
    }
  },[])
  return (
      <div className="homepage">
        <SideBar/>
        <div id="bg_secondry" className="w-100 layout">
        <Outlet/>
        </div>
      </div>
    
  );
};

export default MainLayout;
