import React, { useEffect, useState } from "react";
import useWindowDimensions from "../../customHooks/useWindowDimensions";
import { sidebarItems } from "../../mocks/sideBar";
import "../../assets/styels/components/Sidebar.scss";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/originallogo.png";

function SideBar() {
  // eslint-disable-next-line
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(false);
  const [openSidebar, setopenSidebar] = useState(0);

 /*  const [bgColor, setBgcolor] = useState("#f6f6f6a7");
  const [bgFontColor, setbgFontcolor] = useState("#707FDD"); */
  const [sbColor, setSbcolor] = useState("#F1F2F7");
  const [sbFontColor, setSbFontcolor] = useState("black");



  useEffect(()=>{
  
    if(sessionStorage.getItem("sbColor")){
        setSbcolor(sessionStorage.getItem("sbColor"))
    }
    if(sessionStorage.getItem("sbFontColor")){
        setSbFontcolor(sessionStorage.getItem("sbFontColor"))
    }
  },[])

  const { width } = useWindowDimensions();
  const checkIsActive = (activeRoutes) => {
    let isActive = false;
    activeRoutes?.map((item) => {
      if (item === location.pathname) {
        isActive = true;
      }
    });
    return isActive;
  };
  return (
    <>
      {width < 427 ? (
        <div
          className="menu-icon"
          onClick={() => {
            setopenSidebar(1);
          }}
        >
          <img src="" alt="menu" className="menu-icon-img" />
        </div>
      ) : (
        <div></div>
      )}

      <div
        className={
          openSidebar === 0 && width < 427 ? "sidebar non-display" : "sidebar"
        }
        style={{'background':sbColor}}
      >
        <div className="sidebar__container">
          <div className="sidebar__logo">
            <div className="sidebar__logo__container">
              <img src={logo} alt="logo" className="sidebar__logo__img" />
            </div>
            {width < 427 ? (
              <div
                className="sidebar__logo__closeicon"
                onClick={() => {
                  setopenSidebar(0);
                }}
              >
                <img
                  src=""
                  alt="menu"
                  className="sidebar__logo__closeicon__img"
                />
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="sidebar__items">
            <div className="sidebar__items__container">
              {
                // eslint-disable-next-line
                sidebarItems.map((item, i) => (
                  <>
                    <div
                      key={i}
                      className={`${
                        selected === i || checkIsActive(item.activeRoutes)
                          ? " sidebar__items__container__item active"
                          : "sidebar__items__container__item"
                      }`}
                      onClick={() => {
                        setSelected(i);
                        navigate(item.navTo);
                      }}
                    >
                      <div className="sidebar__items__container__item__icon">
                        {selected === i || checkIsActive(item.activeRoutes)
                          ? item.activeIcon
                          : item.icon}
                      </div>

                      <div className="sidebar__items__container__item__text" style={{'color':sbFontColor}}>
                        {item.name}
                      </div>
                    </div>

                    <div className="sidebar__items__container_nested">
                      {(selected === i || checkIsActive(item.activeRoutes)) &&
                      item.nestedChildern ? (
                        item.nestedChildern.map((child, j) => (
                          <>
                            <div
                              onClick={() => {
                                navigate(child.navTo);
                              }}
                              className={`${
                                checkIsActive(child.active)
                                  ? "sidebar__items__container_nested__item nested_active"
                                  : "sidebar__items__container_nested__item "
                              }`}
                              style={{'color':sbFontColor}}
                            >
                              {child.name}
                            </div>
                          </>
                        ))
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
