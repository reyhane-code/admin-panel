import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import { HttpRequest } from "../helpers/http-request-class.helper";
import { IPaginationQuery, ISearchFilterOptions } from "../interfaces";

const useApi = <TData = unknown, TError = unknown>(endpoint: string) => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const query: IPaginationQuery = qs.parse(search, { ignoreQueryPrefix: true });
  const setQuery = (newQuery: Partial<IPaginationQuery>) => {
    // Create a new query object by merging the existing query with the newQuery
    const updatedQuery = { ...query, ...newQuery } as any;

    // Remove any properties from updatedQuery that are set to undefined
    Object.keys(newQuery).forEach((key) => {
      if ((newQuery as any)[key] == undefined) {
        delete updatedQuery[key];
      }
    });

    // Navigate to the new query string
    navigate({ search: qs.stringify(updatedQuery, { addQueryPrefix: true }) });
  };

  const generateSetQuery = (newQuery: Partial<IPaginationQuery>) => {
    // Create a new query object by merging the existing query with the newQuery
    const updatedQuery = { ...query, ...newQuery } as any;

    // Remove any properties from updatedQuery that are set to undefined
    Object.keys(newQuery).forEach((key) => {
      if ((newQuery as any)[key] == undefined) {
        delete updatedQuery[key];
      }
    });
    return qs.stringify(updatedQuery, { addQueryPrefix: true });
  };

  const addArrayItemToQuery = (
    params: URLSearchParams,
    key: string,
    index: number,
    item: ISearchFilterOptions
  ) => {
    params.append(`${key}[${index}][field]`, item.field);
    params.append(`${key}[${index}][operation]`, item.operation);
    params.append(`${key}[${index}][value]`, String(item.value));
  };

  const generateQueryString = (query: IPaginationQuery): string => {
    const params = new URLSearchParams();

    // Add pagination parameters
    if (query.page) params.append("page", String(query.page));
    if (query.perPage) params.append("perPage", String(query.perPage));

    // Add search parameters
    query.search?.forEach((item, index) => {
      addArrayItemToQuery(params, "search", index, item);
    });

    // Add filter parameters
    query.filter?.forEach((item, index) => {
      addArrayItemToQuery(params, "filter", index, item);
    });

    // Add sortBy parameter
    if (query.sortBy) params.append("sortBy", query.sortBy);

    return params.toString();
  };

  const fetchData = async (): Promise<TData> => {
    const queryString = generateQueryString(query);
    const response = await HttpRequest.get<TData>(`${endpoint}?${queryString}`);

    if (!response) {
      throw new Error("Network response was not ok");
    }

    return response.data;
  };

  const { data, error, isLoading } = useQuery<TData, TError>(
    [endpoint, query],
    fetchData,
    {
      retry: false, // Disable automatic retries for failed requests
      onError: (error) => {
        console.error("Error fetching data:", error);
      },
    }
  );

  const addItem = (item: ISearchFilterOptions, type: "filter" | "search") => {
    setTimeout(() => {
      const existingItems: () => any[] = () => (query[type] as any[]) || [];
      const itemExists = existingItems().some(
        (existingItem) =>
          existingItem.field === item.field &&
          existingItem.operation === item.operation &&
          existingItem.value === item.value
      );

      if (!itemExists) {
        setQuery({ [type]: [...existingItems(), item] });
      } else {
        console.warn(
          `${type.charAt(0).toUpperCase() + type.slice(1)} item already exists`
        );
      }
    }, 1000);
  };

  const generateRouteQuery = (
    item: ISearchFilterOptions,
    type: "filter" | "search"
  ) => {
    const existingItems: () => any[] = () => (query[type] as any[]) || [];
    const itemExists = existingItems().some(
      (existingItem) =>
        existingItem.field === item.field &&
        existingItem.operation === item.operation &&
        existingItem.value === item.value
    );

    if (!itemExists) {
      return generateSetQuery({
        [type]: [item],
      });
    } else {
      console.warn(
        `${type.charAt(0).toUpperCase() + type.slice(1)} item already exists`
      );
    }
  };

  const removeItemsByField = (fieldName: string, type: "filter" | "search") => {
    const existingItems = query[type] || [];
    // Filter out the entire item that matches the field name
    const filteredItems = existingItems.filter(
      (item) => item.field !== fieldName
    );

    setQuery({
      [type]: filteredItems?.length ? filteredItems : undefined,
    });
  };

  const replaceItemByField = (
    fieldName: string,
    newItem: ISearchFilterOptions,
    type: "filter" | "search"
  ) => {
    const existingItems = query[type] || [];

    // Check if the item to be replaced exists
    const itemIndex = existingItems.findIndex(
      (item) => item.field === fieldName
    );

    if (itemIndex !== -1) {
      // Create a new array with the item replaced
      const updatedItems = [...existingItems];
      updatedItems[itemIndex] = newItem; // Replace the item at the found index

      setQuery({
        [type]: updatedItems.length ? updatedItems : undefined,
      });
    } else {
      addItem(newItem, type);
    }
  };

  const setSortBy = (sortBy: string) => {
    setQuery({ sortBy });
  };

  const setPage = (page: number) => {
    setQuery({ page });
  };

  const setPerPage = (perPage: number) => {
    setQuery({ perPage });
  };

  const params: IPaginationQuery = {
    search: query.search || [],
    filter: query.filter || [],
    sortBy: query.sortBy || "",
    page: query.page || 1,
    perPage: query.perPage || 10,
  };

  return {
    data,
    error,
    isLoading,
    addItem,
    generateRouteQuery,
    removeItemsByField,
    replaceItemByField,
    setSortBy,
    setPage,
    setPerPage,
    query,
    params,
  };
};

export default useApi;
