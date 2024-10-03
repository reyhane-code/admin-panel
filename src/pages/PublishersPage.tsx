import MainMenu from "../components/MainMenu";
import PublishersList from "../components/PublishersList";

const PublishersPage = () => {
    const handleMenuItemSelect = (link: string) => {
        window.location.replace(link)
    };
    return (
        <div className="flex items-start w-full">
            <div className=" w-1/4 max-width-[25rem] min-width-[16rem]">
                <MainMenu onMenuItemSelect={handleMenuItemSelect}></MainMenu>
            </div>

            <div className="flex flex-col flex-grow-1">
                <PublishersList />
            </div>
        </div>

    );
};

export default PublishersPage;
