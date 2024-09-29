// import GameHeading from "../components/GameHeading";
import { useState } from "react";
import MainMenu from "../components/MainMenu";
import UsersList from "../components/UsersList";
import ArticlesList from "../components/ArticlesList";
import GamesList from "../components/GamesList";
import PlatformsList from "../components/PlatformsList";
import GenresList from "../components/GenresList";
import PublishersList from "../components/PublishersList";
import CommentsList from "../components/CommentsList";

const HomePage = () => {
  const [selectedLink, setSelectedLink] = useState("");
  const handleMenuItemSelect = (link: string) => {
    setSelectedLink(link);
  };
  return (
    <div className="flex justify-between items-start w-full">
      <div className="grid grid-cols-12 w-1/4">
        <MainMenu onMenuItemSelect={handleMenuItemSelect}></MainMenu>
      </div>
      <div className="">
      {selectedLink == '' && <UsersList />}
      {selectedLink == 'users' && <UsersList />}
      {selectedLink == 'articles' && <ArticlesList />}
      {selectedLink == 'games' && <GamesList />}
      {selectedLink == 'platforms' && <PlatformsList />}
      {selectedLink == 'genres' && <GenresList />}
      {selectedLink == 'publishers' && <PublishersList />}
      {selectedLink == 'comments' && <CommentsList />}
      </div>

    </div>

  );
};

export default HomePage;
