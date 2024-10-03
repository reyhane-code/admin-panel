import MainMenu from "../components/MainMenu";
import PlatformsList from "../components/PlatformsList";

const PlatformsPage = () => {
    const handleMenuItemSelect = (link: string) => {
        window.location.replace(link)
    };
    return (
        <div className="flex items-start w-full">
            <div className=" w-1/4 max-width-[25rem] min-width-[16rem]">
                <MainMenu onMenuItemSelect={handleMenuItemSelect}></MainMenu>
            </div>

            <div className="flex flex-col flex-grow-1">
                <PlatformsList />
            </div>
        </div>

    );
};

export default PlatformsPage;
