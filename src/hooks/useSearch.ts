import { useQuery } from "@tanstack/react-query";
import { HttpRequest } from "../helpers/http-request-class.helper";
import Article from "../entities/Article";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import { AxiosError, GenericAbortSignal } from "axios";

interface SearchResult {
  items: {
    articles: Article[];
    games: {
      id: number;
      name: string;
      slug: string;
      description: string;
      image: string;
      metacritic: number;
      rating_top: number;
      platforms: {
        id: number;
        name: string;
        slug: string;
      }[];
      genres: {
        id: number;
        name: string;
      }[];
      publishers: {
        id: number;
        name: string;
      }[];
    }[];
  };
}

const useSearch = (searchText: string) => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>();

  const getSearchData = async (
    searchText: string,
    signal: GenericAbortSignal
  ) => {
    try {
      setError(undefined);

      const response = await HttpRequest.get<SearchResult>(
        `/v1/search/${searchText}`,
        {
          signal,
        }
      );
      setData(response?.data);
    } catch (e: any) {
      if (e?.message != "canceled") {
        setError(e);
      }
    } finally {
      setIsLoading(false);
    }
  };
  let debounceValue: any;
  let lastController: AbortController | undefined;
  useEffect(() => {
    let controller = new AbortController(); // Create an AbortController
    setIsLoading(true);
    setData(undefined);
    setError(undefined);
    if (debounceValue) {
      debounceValue.cancel();
      lastController && lastController.abort();
    }

    debounceValue = debounce(() => {
      getSearchData(searchText, controller.signal);
    }, 500);

    lastController = controller;

    if (searchText) {
      debounceValue();
    } else {
      debounceValue.cancel();
    }

    return () => {
      controller.abort(); // Cleanup function to abort the fetch request
    };
  }, [searchText]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useSearch;
