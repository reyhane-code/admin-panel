import { useQuery } from "@tanstack/react-query";
import Article from "../entities/Article";
import { HttpRequest } from "../helpers/http-request-class.helper";

export interface ArticleData {
  article: Article;
  likes: number;
}

export const useArticle = (id: string) =>
  useQuery<ArticleData, Error>({
    queryKey: ["id", id],
    queryFn: async () => {
      try {
        const response = await HttpRequest.get<ArticleData>(`/v1/articles/${id}`);
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch article data");
      }
    },
  });