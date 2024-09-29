import { useQuery } from "@tanstack/react-query";
import Platform from "../entities/Platform";
import { HttpRequest } from "../helpers/http-request-class.helper";

interface PlatformsData {
  items: Platform[]
}

const usePlatforms = () =>
  useQuery(["platforms"], () =>
    HttpRequest.get<PlatformsData>("/v1/platforms").then((res) => res.data)
  );

export default usePlatforms;
