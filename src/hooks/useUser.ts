import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";
import User from "../entities/User";


const useUser = (id: number) =>
  useQuery<User, Error>({
    queryKey: ["id", id],
    queryFn: async () => {
      try {
        const response = await HttpRequest.get<User>(`/v1/user/${id}`);
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch user data");
      }
    },
  });

export default useUser;
