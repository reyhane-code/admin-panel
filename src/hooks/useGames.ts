import { useLocation } from 'react-router-dom';
import useApi from './useApi';
import { ISearchFilterOptions } from '../interfaces';

const useGames = () => {
  // const { search } = useLocation(); // Get the current URL's search params
  // const queryParams = new URLSearchParams(search);

  // // Extract search, filter, and sort parameters from the URL
  // const searchTerm = queryParams.get('search') ? JSON.parse(queryParams.get('search')!) : [];
  // const filter: ISearchFilterOptions[] = queryParams.get('filter') ? JSON.parse(queryParams.get('filter')!) : [];
  // const sortBy = queryParams.get('sortBy') || '';

  // // Construct the API endpoint and parameters
  // const params = {
  //   search,
  //   filter,
  //   sortBy,
  // };

  // // Use the useApi hook to fetch games
  const { data, error, isLoading } = useApi('/v1/games');

  return { data, error, isLoading };
};

export default useGames;
