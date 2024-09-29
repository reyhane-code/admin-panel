import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";
import { IPaginationQuery, ISearchFilterOptions } from "../interfaces";
import { useArticleQueryStore } from "../store";
import { IGetArticlesResponse } from "../responses/get-articles.response";
import { FilterOperationEnum } from "../enums";


const fetchArticles = async (
  articlesQuery: IPaginationQuery,
  page: number,
  perPage: number,
  search?: string
) => {
  const searchParam: ISearchFilterOptions[] =
    (search && search.length > 1)
      ? [{
        field: 'title',
        operation: FilterOperationEnum.ILIKE,
        value: `%${search}%`
      }]
      : articlesQuery.search!;

  const params = {
    page,
    perPage,
    filter: articlesQuery.filter,
    search: searchParam,
    sortBy: articlesQuery.sortBy,
  };
  try {
    const res = await HttpRequest.get<IGetArticlesResponse>("/v1/articles/paginate", {
      params,
    });
    return res.data;
  } catch (error) {
    console.log("error: ", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

export const useArticles = (page: number = 1, perPage: number = 10, search?: string) => {
  const { query: articlesQuery } = useArticleQueryStore();

  return useQuery<IGetArticlesResponse, Error>(["articles", articlesQuery, page, search], () =>
    fetchArticles(articlesQuery, page, perPage, search)
  );
};
