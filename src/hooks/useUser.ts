import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";
import User from "../entities/User";
import useAuthStore from "../auth.store";

const useUser = () => {
  const setIdentity = useAuthStore((s) => s.setIdentity);

  return useQuery<User, Error>(["user"], async () => {
    try {
      const response = await HttpRequest.get<User>("/v1/user/identity");
      setIdentity(response.data);
      return response.data;
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Error fetching user data:", error);
      // Throw a more descriptive error
      throw new Error("Failed to fetch user data");
    }
  });
};

// HTTP request to get user data
export default useUser;
