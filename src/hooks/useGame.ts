import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";

interface IGame {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image: string;
  metacritic: number;
  rating_top: number;
}
const useGame = (id: string) =>
  useQuery<IGame, Error>({
    queryKey: ["id", id],
    queryFn: async () => {
      try {
        const response = await HttpRequest.get<IGame>(`/v1/games/find/${id}`);
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch game data");
      }
    },
  });

export default useGame;
