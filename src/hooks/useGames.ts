import { useLocation } from 'react-router-dom';
import useApi from './useApi';
import { ISearchFilterOptions } from '../interfaces';
import { useQuery } from '@tanstack/react-query';

interface Game {
  id: number;
  name: string;
  description?: string;
  slug: string;
  image: string;
  metacritic?: number;
  rating_top?: number;
}

const fetchGames = async () => { 
  
}
const useGames = () => {
  useQuery(['games', () => { }])
};

export default useGames;
