import { useQuery } from "@tanstack/react-query";
import { Game, IGetGameResponse } from "../entities/Game";
import { HttpRequest } from "../helpers/http-request-class.helper";

const useGame = (slug: string) =>
  useQuery<IGetGameResponse, Error>({
    queryKey: ["slug", slug],
    queryFn: async () => {
      try {
        const response = await HttpRequest.get<IGetGameResponse>(`/v1/games/${slug}`);
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch game data");
      }
    },
  });

export default useGame;
