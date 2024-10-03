// import GameHeading from "../components/GameHeading";
import MainMenu from "../components/MainMenu";
import { useNavigate } from "react-router-dom";
import UsersPage from "./UsersPage";

const HomePage = () => {
  const navigate = useNavigate()
  const handleMenuItemSelect = (link: string) => {
    navigate(link)
  };
  return (
    <div className="flex items-start w-full">
      <UsersPage />
    </div>

  );
};

export default HomePage;
