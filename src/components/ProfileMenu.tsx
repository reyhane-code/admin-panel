import { useNavigate } from "react-router-dom";
import { HttpRequest } from "../helpers/http-request-class.helper";
import Button from "./common/Button";
import { useState } from "react";
import Alert from "./common/Alert";
import { FaRegUser, FaRegHeart, FaRegBookmark } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import useAuth from "../hooks/useAuth";

interface Props {
  onMenuItemSelect: (link: string) => void;
}

interface MenuItem {
  label: string;
  link: string;
  icon: any
}

const ProfileMenu = ({ onMenuItemSelect }: Props) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth()
  const menuItems: MenuItem[] = [
    { label: "User Information", link: "user", icon: <FaRegUser className="text-lg" /> },
    { label: "Bookmarks", link: "bookmarks", icon: <FaRegBookmark className="text-lg" /> },
    { label: "Likes", link: "likes", icon: <FaRegHeart className="text-lg" /> },
  ];

  const handleLogout = async () => {
    try {
      const res = await HttpRequest.delete("/v1/auth/logout");
      if (res.status === 200) {
        logout()
        navigate("/");
      }
    } catch (error) {
      setError("Cannot Logout!");
    }
  };

  return (
    <>
      {error && <Alert text={error} />}
      {menuItems.map((item) => (
        <Button
          key={item.link}
          className="text-lg my-3 py-3 px-4 pt-2 pb-3 flex items-center justify-center space-x-3"
          color="primary"
          onClick={() => {
            onMenuItemSelect(item.link); // Call the parent function with the selected link
          }}
        >
          <div className="w-full flex items-center justify-between">
            {item.label}{item.icon}
          </div>
        </Button>
      ))}
      <Button
        color="primary"
        className="text-red-700 text-lg w-full p-my-3 py-3 px-4"
        onClick={handleLogout}
      >
        <div className="w-full flex items-center justify-between">
          <span>
            Logout
          </span>
          <MdLogout className="text-lg" />
        </div>
      </Button>
    </>
  );
};

export default ProfileMenu;
