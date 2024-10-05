import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";
import Publisher from "../entities/Publisher";


const usePublishers = () =>
  useQuery(["publishers"], () =>
    HttpRequest.get<Publisher[]>("/v1/publishers").then((res) => res.data)
  );

export default usePublishers;
