import Platform from "../entities/Platform";
import { HttpRequest } from "../helpers/http-request-class.helper";

const usePlatform = async (id?: number) => {
  const res = await HttpRequest.get<Platform>(`/v1/platforms/${id}`);
  return res.data;
};

export default usePlatform;
