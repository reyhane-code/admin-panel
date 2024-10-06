import { useQuery } from "@tanstack/react-query";
import Article from "../entities/Article";
import { HttpRequest } from "../helpers/http-request-class.helper";


export const useArticle = (id: number) =>
  useQuery<Article, Error>({
    queryKey: ["id", id],
    queryFn: async () => {
      try {
        const response = await HttpRequest.get<Article>(`/v1/articles/admin/${id}`);
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch article data");
      }
    },
  });