import { Link } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";

const NavBar = () => {
  return (
    <div className="flex justify-between items-center sticky z-20 left-0 top-0 right-0 p-2 shadow-lg space-x-4 bg-base-100">
      <Link to="/" >
        <img src="/logo.png" className="max-w-[10vw] w-16 lg:h-16 object-cover" />
      </Link>
      <div className="w-full max-w-[45vw] transform translate-x-0 lg:max-w-[50vw] lg:mx-auto flex justify-end">
        <ThemeSwitch />
      </div>

      {/* <AuthModal /> */}
    </div>
  );
};

export default NavBar;
