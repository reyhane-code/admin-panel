import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";
import Publisher from "../entities/Publisher";

interface PublishersData {
  items: Publisher[]
}

const usePublishers = () =>
  useQuery(["platforms"], () =>
    HttpRequest.get<PublishersData>("/v1/publishers").then((res) => res.data)
  );

export default usePublishers;
