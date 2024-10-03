import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";
import Publisher from "../entities/Publisher";

const usePublisher = (id: string) =>
  useQuery<Publisher, Error>({
    queryKey: ["id", id],
    queryFn: async () => {
      try {
        const response = await HttpRequest.get<Publisher>(`/v1/publishers/${id}`);
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch publisher data");
      }
    },
  });

export default usePublisher;
