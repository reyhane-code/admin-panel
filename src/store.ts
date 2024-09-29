import { create } from "zustand";
import { IPaginationQuery, ISearchFilterOptions } from "./interfaces";

interface QueryStore {
    query: IPaginationQuery;
    setSearch: (search?: ISearchFilterOptions) => void;
    setFilter: (filter?: ISearchFilterOptions) => void;
    setSortBy: (sortOrder: string) => void;
}

const createQueryStore = () => {
    return create<QueryStore>((set) => ({
        query: {},
        setSearch: (search?: ISearchFilterOptions) =>
            set((store) => {
                if (search) {
                    const existingSearches = store.query.search || [];
                    const searchField = search.field;
                    const updatedSearches = existingSearches.filter(s => s.field !== searchField);
                    updatedSearches.push(search);

                    return { query: { ...store.query, search: updatedSearches } };
                }
                return { query: { ...store.query } }
            }),

        setFilter: (filter?: ISearchFilterOptions) =>
            set((store) => {
                if (filter) {
                    const existingFilters = store.query.filter || [];
                    const filterField = filter.field;
                    const updatedFilters = existingFilters.filter(f => f.field !== filterField);
                    updatedFilters.push(filter);
                    return { query: { ...store.query, filter: updatedFilters } };

                }
                return { query: { ...store.query } }
            }),

        setSortBy: (sortBy) =>
            set((store) => ({
                query: { ...store.query, sortBy },
            })),
    }));
};

export const useGameQueryStore = createQueryStore();
export const useArticleQueryStore = createQueryStore();

