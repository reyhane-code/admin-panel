import MainMenu from "../components/MainMenu";
import ArticlesList from "../components/ArticlesList";

const ArticlesPage = () => {

    return (
        <div className="flex items-start w-full">
            <div className=" w-1/4 max-width-[25rem] min-width-[16rem]">
                <MainMenu />
            </div>

            <div className="flex flex-col flex-grow-1">
                <ArticlesList />
            </div>
        </div>

    );
};

export default ArticlesPage;
