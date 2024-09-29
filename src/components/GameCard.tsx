import { Link } from "react-router-dom";
import CriticScore from "./CriticScore";
import Emoji from "./Emoji";
import Image from "./common/Image";
import { FaHeart } from "react-icons/fa6";
import { ImageFormat } from "../enums";

interface Props {
  game: {
    id: number;
    name: string;
    slug: string;
    description: string;
    background_image: string;
    metacritic: number;
    rating_top: number;
    platforms: {
      id: number;
      name: string;
      slug: string;
    }[];
    genres: {
      id: number;
      name: string;
    }[];
    publishers: {
      id: number;
      name: string;
    }[];
  };
  likes?: number;
}

const GameCard = ({ game, likes = 0 }: Props) => {
  return (
    <Link
      to={"/games/" + game.slug}
      className="group card w-full bg-base-300 cursor-pointer"
    >
      <Image
        query={{ hashKey: game.background_image, format: ImageFormat.WEBP }}
        altText={game.name}
        className="transform group-hover:scale-[1.05] transition-all duration-300 ease-in bg-cover"
      />
      <div className="card-body !p-3">
        <div className="h-full flex flex-col justify-between w-full">
          <h2 className="card-title text-base lg:text-lg">{game.name}</h2>
          <div className="flex items-center justify-between w-full mt-6">
            <div className="flex items-center space-x-1">
              {game.platforms?.slice(0, 2)?.map((p) => (
                <div
                  className="bg-neutral-800 rounded-sm px-2 py-0.5 flex-center"
                  key={p.id}
                >
                  <span className="text-xs text-neutral-200"> {p.name}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-x-2">
              <CriticScore score={game.metacritic} />

              <div className="flex items-center gap-x-1">
                <span className="text-sm">{likes}</span>
                <FaHeart className="text-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
