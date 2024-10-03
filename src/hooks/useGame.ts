import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";
import { Game } from "../entities/Game";

const useGame = (slug: string) =>
  useQuery<Game, Error>({
    queryKey: ["slug", slug],
    queryFn: async () => {
      try {
        const response = await HttpRequest.get<Game>(`/v1/games/${slug}`);
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch game data");
      }
    },
  });

export default useGame;
