import useSearch from '../hooks/useSearch';
import { Link } from 'react-router-dom';

interface Props {
    searchText: string
}

const SearchResults = ({ searchText }: Props) => {
    const { data, error, isLoading } = useSearch(searchText);

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='w-full relative'>
            {data?.items.games && data?.items.games.length > 0 &&
                <ul>
                    <li className='flex flex-col'>
                        <h2>Games</h2>
                        {data && data.items.games?.slice(0, 3).map(game => (
                            <Link to={`/games/${game.slug}`} key={game.id} className='absolute left-0 top-0'>{game.name}</Link>
                        ))}
                    </li>
                </ul>}
        </div>
    );
};

export default SearchResults;
