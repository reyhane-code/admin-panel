import { useNavigate } from "react-router-dom";
import Button from "./common/Button";
import { useState } from "react";
import Alert from "./common/Alert";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineComment } from "react-icons/md";
import { GrArticle } from "react-icons/gr";
import { IoGameController } from "react-icons/io5";
import { GiPlatform } from "react-icons/gi";

interface Props {
    onMenuItemSelect: (link: string) => void;
}

interface MenuItem {
    label: string;
    link: string;
    icon?: any
}

const MainMenu = ({ onMenuItemSelect }: Props) => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const menuItems: MenuItem[] = [
        { label: "Users", link: "users", icon: <FaRegUser className="text-lg" /> },
        { label: "Articles", link: "articles", icon: <GrArticle className="text-lg" /> },
        { label: "Games", link: "games", icon: <IoGameController className="text-lg" /> },
        {
            label: "Comments", link: "comments", icon: <MdOutlineComment className="text-lg" />
        },
        { label: "Platforms", link: "platforms", icon: <GiPlatform className="text-lg" /> },
        { label: "Genres", link: "genres" },
        { label: "Publishers", link: "publishers" }
    ];


    return (
        <>
            {error && <Alert text={error} />}
            <div className="flex flex-col justify-center items-sterch w-80 max-w-250 me-8 px-6 py-2 space-y-4 shadow-md rounded-lg">
                {menuItems.map((item) => (
                    <Button
                        key={item.link}
                        className="text-lg my-3 py-3 px-4 pt-2 pb-3 flex items-center justify-center space-x-3"
                        color="primary"
                        onClick={() => {
                            onMenuItemSelect(item.link); // Call the parent function with the selected link
                        }}
                    >
                        <div className="w-full flex items-center justify-start gap-x-2">
                            {item.icon}{item.label}
                        </div>
                    </Button>
                ))}

            </div>

        </>
    );
};

export default MainMenu;
