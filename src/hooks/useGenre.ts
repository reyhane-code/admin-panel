import { useQuery } from "@tanstack/react-query";
import Genre from "../entities/Genre";
import { HttpRequest } from "../helpers/http-request-class.helper";

const useGenre = (id: number) =>
  useQuery<Genre, Error>({
    queryKey: ["id", id],
    queryFn: async () => {
      try {
        const response = await HttpRequest.get<Genre>(`/v1/genres/${id}`);
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch genre data");
      }
    },
  });

export default useGenre;
