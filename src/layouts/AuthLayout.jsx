
import { Outlet } from "react-router-dom";
import "../assets/styels/genric-styles/authLayout.scss";

const AuthLayout = () => {
  return (
      <div className="authlayout">
        <Outlet/>
      </div>
    
  );
};

export default AuthLayout;
