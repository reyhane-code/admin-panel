import DefaultLayout from "../components/layouts/DefaultLayout";
import { useState } from "react";
import ProfileMenu from "../components/ProfileMenu";
import UserInfoForm from "../components/UserInfoForm";
import UserBookmarks from "./UserBookmarks";
import UserLikes from "./UserLikes";
import useAuth from "../hooks/useAuth";

const ProfilePage = () => {
  const { isAuthenticated } = useAuth()
  const [selectedLink, setSelectedLink] = useState("");
  const handleMenuItemSelect = (link: string) => {
    setSelectedLink(link);
  };
  return (
    <>
      <DefaultLayout />
      <div className="flex w-full px-3 lg:max-w-[100rem] lg:mx-auto">
        <div className="flex flex-col justify-center items-sterch w-96 max-w-300 me-8 px-6 py-2 space-y-4 shadow-md rounded-lg">
          {isAuthenticated && (
            <ProfileMenu
              onMenuItemSelect={handleMenuItemSelect}
            />
          )}
        </div>
        <div className="w-full grow border-solid border-2 border-gray-200 rounded-lg">
          {selectedLink === "bookmarks" ? (
            <UserBookmarks />
          ) : selectedLink === "likes" ? (
            <UserLikes />
          ) : (
            isAuthenticated && <UserInfoForm />
          )}
        </div>
      </div>
      {/* <div className="avatar">
          <div className="w-24 rounded">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div> */}
    </>
  );
};

export default ProfilePage;
