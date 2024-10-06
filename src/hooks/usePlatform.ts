import { useQuery } from "@tanstack/react-query";
import Platform from "../entities/Platform";
import { HttpRequest } from "../helpers/http-request-class.helper";


const usePlatform = (id: number) =>
  useQuery<Platform, Error>({
    queryKey: ["id", id],
    queryFn: async () => {
      try {
        const response = await HttpRequest.get<Platform>(`/v1/platforms/${id}`);
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch platform data");
      }
    },
  });
export default usePlatform;

