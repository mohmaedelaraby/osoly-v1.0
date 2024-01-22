
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  //const [clientKey, _] = useSessionStorage("clientKey", 0);
  return (
    <div className="">
      <div className="fixed">
        hi im main
      </div>
      <div className="page-wrapper">
      hi im main
        <div className="page-container min-h-screen">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
