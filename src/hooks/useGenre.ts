import Genre from "../entities/Genre";
import { HttpRequest } from "../helpers/http-request-class.helper";

const useGenre = async (id?: number) => {
  const res = await HttpRequest.get<Genre>(`/v1/genres/${id}`);
  return res.data
};

export default useGenre;
