// import GameHeading from "../components/GameHeading";
import { useState } from "react";
import MainMenu from "../components/MainMenu";
import UsersList from "../components/UsersList";
import ArticlesList from "../components/ArticlesList";
import GamesList from "../components/GamesList";
import PlatformsList from "../components/PlatformsList";
import GenresList from "../components/GenresList";
import PublishersList from "../components/PublishersList";

const HomePage = () => {
  const [selectedLink, setSelectedLink] = useState("");
  const handleMenuItemSelect = (link: string) => {
    setSelectedLink(link);
  };
  return (
    <div className="flex items-start w-full">
      <div className="w-1/2">
        <MainMenu onMenuItemSelect={handleMenuItemSelect}></MainMenu>
      </div>
      <div className="flex flex-col">
        {selectedLink == '' && <UsersList />}
        {selectedLink == 'users' && <UsersList />}
        {selectedLink == 'articles' && <ArticlesList />}
        {selectedLink == 'games' && <GamesList />}
        {selectedLink == 'platforms' && <PlatformsList />}
        {selectedLink == 'genres' && <GenresList />}
        {selectedLink == 'publishers' && <PublishersList />}
      </div>

    </div>

  );
};

export default HomePage;
