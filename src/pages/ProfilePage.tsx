import DefaultLayout from "../components/layouts/DefaultLayout";
import { useState } from "react";
import ProfileMenu from "../components/ProfileMenu";
import UserInfoForm from "../components/UserInfoForm";
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

      </div>

    </>
  );
};

export default ProfilePage;
