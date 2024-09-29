import GameGrid from "./GameGrid";
import useApi from "../hooks/useApi";
import { IGetGamesResponse } from "../responses/get-games.response";
import EmptyList from "./common/EmptyList";

const GamesContainer = () => {
    const { data, error, isLoading, params, setPage} = useApi<IGetGamesResponse, Error>('/v1/games');

    return (
        <>
            {isLoading && <span>Loading...</span>}
            {error && <span>An error occurred: {error.message}</span>}
            {data ? (
                <GameGrid data={data} error={error} isLoading={isLoading} page={params.page || 1} setPage={setPage} perPage={params.perPage || 10} />
            ) : (
                <EmptyList itemType="games" />
            )}
        </>
    );
};

export default GamesContainer;


