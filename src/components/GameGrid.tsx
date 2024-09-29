import React from "react";
import GameCard from "./GameCard";
import CardSkeleton from "./CardSkeleton";
import CardContainer from "./CardContainer";
import { IGetGamesResponse } from "../responses/get-games.response";
import ErrorPage from "../pages/ErrorPage";
import Pagination from "./common/Pagination";
import EmptyList from "./common/EmptyList";

interface Props {
  data: IGetGamesResponse;
  error: Error | null;
  isLoading: boolean;
  page: number;
  perPage: number;
  setPage: (page: number) => void;
}

const GameGrid = ({ data, error, isLoading, page, setPage, perPage }: Props) => {
  const skeletons = Array.from({ length: 6 }, (_, index) => index + 1);

  if (error) {
    return data ? <p className="text-2xl">{"An error occurred."}</p> : <ErrorPage />;
  }

  const renderSkeletons = () => (
    skeletons.map((skeleton) => (
      <CardContainer key={skeleton}>
        <CardSkeleton />
      </CardContainer>
    ))
  );

  const renderGameCards = () => (
    data?.items.map((game) => {
      const gameLikeCount = data.likes?.find(item => item.game_id === game.id)?.count
      return (
        <CardContainer key={game.id}>
          <GameCard game={game} likes={gameLikeCount} />
        </CardContainer>
      );
    })
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-6 p-10px">
        {isLoading ? renderSkeletons() :
          data.items.length ?
            renderGameCards() : <EmptyList itemType="games" />}
      </div>
      <div className="mx-auto w-max mt-4">
        {(data && data?.items.length >= 1) && (
          <Pagination
            count={data.pagination.count}
            perPage={perPage}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
};

export default GameGrid;
