import NavBar from "../NavBar";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      <NavBar />
      <div className="p-5">
        <Outlet />
      </div>
    </>
  );
};

export default DefaultLayout;
