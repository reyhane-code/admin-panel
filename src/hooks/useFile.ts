import { HttpRequest } from "../helpers/http-request-class.helper";
import { IGetFileQuery } from "../interfaces";

const useFile = async ({
  hashKey,
  width,
  height,
  quality,
  format,
  fit,
}: IGetFileQuery) => {
  return HttpRequest.get(`/v1/files`, {
    params: {
      hashKey,
      width,
      height,
      quality,
      format,
      fit,
    },
  });
};

export default useFile;
