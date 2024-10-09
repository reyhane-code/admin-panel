import { NavLink, useNavigate } from "react-router-dom";
import Button from "./common/Button";
import { useState } from "react";
import Alert from "./common/Alert";
import { FaRegUser } from "react-icons/fa";
import { GrArticle } from "react-icons/gr";
import { IoGameController } from "react-icons/io5";
import { GiPlatform } from "react-icons/gi";
import { BiArchiveOut } from "react-icons/bi";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
import { HttpRequest } from "../helpers/http-request-class.helper";
import useAuth from "../hooks/useAuth";



interface MenuItem {
    label: string;
    link: string;
    icon?: any
}

const MainMenu = () => {
    const [error, setError] = useState<string | null>(null);
    const menuItems: MenuItem[] = [
        { label: "Users", link: "", icon: <FaRegUser className="text-xl" /> },
        { label: "Articles", link: "articles", icon: <GrArticle className="text-xl" /> },
        { label: "Games", link: "games", icon: <IoGameController className="text-xl" /> },
        { label: "Platforms", link: "platforms", icon: <GiPlatform className="text-xl" /> },
        { label: "Genres", link: "genres", icon: <GiPerspectiveDiceSixFacesRandom className="text-xl" /> },
        { label: "Publishers", link: "publishers", icon: <BiArchiveOut className="text-xl" /> }
    ];

    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const res = await HttpRequest.delete("/v1/auth/logout");
            if (res.status === 200) {
                logout()
                navigate("/login");
            }
        } catch (error) {
            setError("Cannot Logout!");
        }
    };

    return (
        <>
            {error && <Alert text={error} />}
            <div className="flex flex-col justify-center items-sterch w-80 max-w-250 me-8 mx-5 space-y-4 shadow-md rounded-lg">
                {menuItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={`/${item.link}`}
                        className={({ isActive, isPending }) =>
                            isActive ? "bg-gray-100" : ""
                        }
                    >
                        <div className="text-lg my-3 py-3 px-4 pt-2 pb-3 flex items-center justify-center space-x-3">
                            <div className={`w-full flex items-center gap-x-2`}>
                                {item.icon}
                                {item.label}
                            </div>
                        </div>
                    </NavLink>



                ))}
                <button
                    className="text-red-700 text-lg w-full p-my-3 py-3 px-4"
                    onClick={handleLogout}
                >
                    <div className="w-full flex items-center justify-between">
                        <span>
                            Logout
                        </span>
                        <MdLogout className="text-lg" />
                    </div>
                </button>
            </div>

        </>
    );
};

export default MainMenu;
