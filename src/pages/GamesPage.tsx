import MainMenu from "../components/MainMenu";
import GamesList from "../components/GamesList";

const GamesPage = () => {
    return (
        <div className="flex items-start w-full">
            <div className=" w-1/4 max-width-[25rem] min-width-[16rem]">
                <MainMenu></MainMenu>
            </div>

            <div className="flex flex-col flex-grow-1">
                <GamesList />
            </div>
        </div>

    );
};

export default GamesPage;
