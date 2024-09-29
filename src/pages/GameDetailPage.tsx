import { useParams } from "react-router-dom";
import ExpandableText from "../components/ExpandableText";
import GameAttributes from "../components/GameAttributes";
import useGame from "../hooks/useGame";
import LikeButton from "../components/common/LikeButton";
import GameScreenshots from "../components/GameScreenshots";
import BookmarkButton from "../components/common/BookmarkButton";
import CommentsList from "../components/CommentsList";
import CommentButton from "../components/common/CommentButton";

const GameDetailPage = () => {
  const { slug } = useParams();
  const { data, isLoading, error } = useGame(slug!);

  if (isLoading)
    return <span className="loading loading-ring loading-lg"></span>;

  if (error || !data) {
    console.log(error);
    throw error;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="col-start">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl">{data?.game.name}</h1>
          <div className="flex items-center gap-x-3">
            <LikeButton
              id={data?.game?.id}
              entity="game"
              initialLikes={data?.likes}
            ></LikeButton>
            <BookmarkButton id={data.game.id} entity="game" />
          </div>
        </div>
        <ExpandableText>{data?.game.description}</ExpandableText>
        <GameAttributes game={data} />
      </div>
      {data?.game?.screenshots && (
        <div>
          <GameScreenshots screenshots={data?.game?.screenshots} />
        </div>
      )}
      {/* <CommentButton id={data?.game?.id} */}
        {/* entity="game" initialComments={0}> */}
      {/* </CommentButton> */}
      <div>
        <CommentsList entityType="game" entityId={data?.game.id} />
      </div>
    </div>
  );
};

export default GameDetailPage;
