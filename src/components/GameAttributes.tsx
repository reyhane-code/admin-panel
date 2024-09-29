import { IGetGameResponse } from "../entities/Game";
import CriticScore from "./CriticScore";
import DefinitionItem from "./DefinitionItem";

interface Props {
  game: IGetGameResponse;
}

const GameAttributes = ({ game }: Props) => {
  return (
    <div className="grid grid-cols-2 items-start">
      <DefinitionItem term="Platforms">
        {game?.game?.platforms && game?.game.platforms.length > 0 ? (
          game?.game.platforms.map((platform) => (
            <span
              key={platform.id}
              className="flex bg-base-300 rounded-xl p-2 flex-grow mx-2 mb-2"
            >
              {platform.name}
            </span>
          ))
        ) : (
          <span className="text-gray-500">-</span> // Fallback message
        )}
      </DefinitionItem>
      {game?.game?.metacritic && (
        <DefinitionItem term="Metascore">
          <CriticScore score={game.game.metacritic} />
        </DefinitionItem>
      )}
      <DefinitionItem term="Genres">
        {game?.game.genres?.map((genre) => (
          <span
            className="flex bg-base-300 rounded-xl p-2 flex-grow mx-2 mb-2"
            key={genre.id}
          >
            {genre.name}
          </span>
        ))}
      </DefinitionItem>
      <DefinitionItem term="Publishers">
        {game?.game.publishers?.map((publisher) => (
          <span
            className="flex bg-base-300 rounded-xl p-2 flex-grow mx-2 mb-2"
            key={publisher.id}
          >
            {publisher.name}
          </span>
        ))}
      </DefinitionItem>
    </div>
  );
};

export default GameAttributes;
