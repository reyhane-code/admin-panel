import MainMenu from "../components/MainMenu";
import GenresList from "../components/GenresList";

const GenresPage = () => {
    const handleMenuItemSelect = (link: string) => {
        window.location.replace(link)
    };
    return (
        <div className="flex items-start w-full">
            <div className=" w-1/4 max-width-[25rem] min-width-[16rem]">
                <MainMenu onMenuItemSelect={handleMenuItemSelect}></MainMenu>
            </div>

            <div className="flex flex-col flex-grow-1">
                <GenresList />
            </div>
        </div>

    );
};

export default GenresPage;
