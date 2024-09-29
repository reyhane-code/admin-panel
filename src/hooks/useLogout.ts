import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";

const useLogut = () => {
  useQuery(["logout"], () => {
    return HttpRequest.delete("/v1/auth/logout");
  });
};

export default useLogut;
