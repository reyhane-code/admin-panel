import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";


const useUserData = <T>(entity: string, requestType: string) => {

  return useQuery<T, Error>([`${requestType}/user`, entity], async () => {
    try {
      const response = await HttpRequest.get<T>(
        `/v1/${requestType}/user/${entity}`,
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  });
};

export default useUserData;
