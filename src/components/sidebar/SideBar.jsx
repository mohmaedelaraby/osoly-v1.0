import React, { useEffect, useState } from "react";
import useWindowDimensions from "../../customHooks/useWindowDimensions";
import {
  sidebarBottom,
  sidebarItems,
  sidebarSettings,
} from "../../mocks/sideBar";
import "../../assets/styels/components/Sidebar.scss";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/originallogo.png";
import HomeSidebar from "../../assets/icons/HomeSidebar";
import EnterPrisesSidebar from "../../assets/icons/EnterPrisesSidebar";
import UsersSidebar from "../../assets/icons/usersSidebar";
import PropertiesSideBar from "../../assets/icons/PropertiesSideBar";
import SettingsSidebar from "../../assets/icons/SettingsSidebar";
import TicketsSidebar from "../../assets/icons/TicketsSidebar";
import InfoSidebar from "../../assets/icons/InfoSidebar";
import LogoutSidebar from "../../assets/icons/logoutSidebar";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import InfoModal from "../modals/InfoModal";
import { useTranslation } from "react-i18next";

function SideBar() {
  // eslint-disable-next-line
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(false);
  const [openSidebar, setopenSidebar] = useState(0);

  /*  const [bgColor, setBgcolor] = useState("#f6f6f6a7");
  const [bgFontColor, setbgFontcolor] = useState("#707FDD"); */
  const [sbColor, setSbcolor] = useState("#194C81");
  const [sbFontColor, setSbFontcolor] = useState("#EFF9FF");

  function iconChecker(icon, fill) {
    if (icon == "home") {
      return <HomeSidebar fill={fill} />;
    }
    if (icon == "enterprise") {
      return <EnterPrisesSidebar fill={fill} />;
    }
    if (icon == "users") {
      return <UsersSidebar fill={fill} />;
    }
    if (icon == "tickets") {
      return <TicketsSidebar fill={fill} />;
    }
    if (icon == "propreties") {
      return <PropertiesSideBar fill={fill} />;
    }
    if (icon == "settings") {
      return <SettingsSidebar fill={fill} />;
    }
    if (icon == "info") {
      return <InfoSidebar fill={fill} />;
    }
    if (icon == "logout") {
      return <LogoutSidebar fill={fill} />;
    }
  }
  useEffect(() => {
    if (sessionStorage.getItem("sbColor")) {
      setSbcolor(sessionStorage.getItem("sbColor"));
    }
    if (sessionStorage.getItem("sbFontColor")) {
      setSbFontcolor(sessionStorage.getItem("sbFontColor"));
    }
  }, []);

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

  const {
    isOpen: isOpenInfoModal,
    onOpen: onOpenInfoModal,
    onClose: onCloseInfoModal,
  } = useDisclosure();
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
      {/*  style={{'background':sbColor}} */}
      <div
        className={
          openSidebar === 0 && width < 427 ? "sidebar non-display" : "sidebar"
        }
      >
        <div className="sidebar__container">
          <div className="sidebar__logo">
            <div
              onClick={() => navigate("/home")}
              className="sidebar__logo__container"
            >
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
          <div className="sidebar__items ">
            <div className="sidebar__items__container sidebar_">
              <div className="top">
                {
                  // eslint-disable-next-line
                  sidebarItems.map((item, i) => (
                    <>
                      <div
                        key={i}
                        className={`${
                          checkIsActive(item.activeRoutes)
                            ? " sidebar__items__container__item active"
                            : "sidebar__items__container__item"
                        }`}
                        onClick={() => {
                          setSelected(i);
                          item.navTo === "/info"
                            ? onOpenInfoModal()
                            : navigate(item.navTo);
                        }}
                      >
                        <div
                          onMouseOver={() => {
                            checkIsActive(item.activeRoutes)
                              ? iconChecker(item.icon, "#194C81")
                              : iconChecker(item.icon, "#EFF9FF");
                          }}
                          className="sidebar__items__container__item__icon"
                        >
                          {checkIsActive(item.activeRoutes)
                            ? iconChecker(item.icon, "#194C81")
                            : iconChecker(item.icon, "#EFF9FF")}
                        </div>
                        {/* <div><HomeSidebar fill="red"/></div> */}
                        <div className="sidebar__items__container__item__text">
                          {t(item.name)}
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
                              >
                                {/*  style={{'color':sbFontColor}} */}
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
                <hr className="sidebar__items_hr" />
                {
                  // eslint-disable-next-line
                  sidebarSettings.map((item, i) => (
                    <>
                      <div
                        key={i}
                        className={`${
                          checkIsActive(item.activeRoutes)
                            ? " sidebar__items__container__item active"
                            : "sidebar__items__container__item"
                        }`}
                        onClick={() => {
                          setSelected(i);
                          item.navTo === "/info"
                            ? onOpenInfoModal()
                            : navigate(item.navTo);
                        }}
                      >
                        <div className="sidebar__items__container__item__icon">
                          {checkIsActive(item.activeRoutes)
                            ? iconChecker(item.icon, "#194C81")
                            : iconChecker(item.icon, "#EFF9FF")}
                        </div>
                        {/* <div><HomeSidebar fill="red"/></div> */}
                        <div className="sidebar__items__container__item__text">
                          {t(item.name)}
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
                              >
                                {/*  style={{'color':sbFontColor}} */}
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
              <div className="bottom">
                {
                  // eslint-disable-next-line
                  sidebarBottom.map((item, i) => (
                    <>
                      <div
                        key={i}
                        className={`${
                          checkIsActive(item.activeRoutes)
                            ? " sidebar__items__container__item active"
                            : "sidebar__items__container__item"
                        }`}
                        onClick={() => {
                          setSelected(i);
                          item.navTo === "/info"
                            ? onOpenInfoModal()
                            : navigate(item.navTo);
                        }}
                      >
                        <div className="sidebar__items__container__item__icon">
                          {selected === i || checkIsActive(item.activeRoutes)
                            ? iconChecker(
                                item.icon,
                                item.navTo === "/info" ? "#EFF9FF" : "#194C81"
                              )
                            : iconChecker(item.icon, "#EFF9FF")}
                        </div>
                        {/* <div><HomeSidebar fill="red"/></div> */}
                        <div className="sidebar__items__container__item__text">
                          {t(item.name)}
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
                              >
                                {/*  style={{'color':sbFontColor}} */}
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
      </div>

      <Modal isOpen={isOpenInfoModal} onClose={onCloseInfoModal}>
        <ModalOverlay />
        <ModalContent maxWidth="407px">
          <ModalBody padding={"0px"}>
            <InfoModal onClose={onCloseInfoModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SideBar;
