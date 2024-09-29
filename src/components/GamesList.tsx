import List from "./common/List";
import Image from "./common/Image";
import { ImageFormat } from "../enums";
import { useArticles } from "../hooks/useArticles";
import useApi from "../hooks/useApi";
import { IGetGamesResponse } from "../responses/get-games.response";
import Pagination from "./common/Pagination";
import ExpandableText from "./ExpandableText";

const GamesList = () => {
  const { data, error, isLoading, params, setPage } = useApi<IGetGamesResponse, Error>('/v1/games/all');


  if (isLoading) {
    return <div className="container mx-auto mt-5">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto mt-5 text-red-500">
        Error loading articles
      </div>
    );
  }
  const onDelete = async (id: number) => {
    console.log('deleting')
  }

  const onUpdate = async () => {
    console.log('deleting')
  }


  const headers = [
    "ID",
    "Name",
    "Description",
    "Background Image",
    "Rating Top",
    "Metacritic",
    "User ID"
  ];

  const renderRow = (game: any) => (
    <>
      {headers.map((header, index) => {
        const key = header.toLowerCase().replace(" ", "_"); // Create a key from the header
        if (key == 'description') {
          return (
            <div key={index} className="border-b border-gray-200 py-2 flex justify-center items-center mx-2">
             <ExpandableText>{game[key]}</ExpandableText>
            </div>
          );
        }
        else if (key === 'background_image') {
          return (
            <div key={index} className="border-b border-gray-200 py-2 flex justify-center items-center mx-2">
              <Image query={{ hashKey: game[key], format: ImageFormat.WEBP }} />
            </div>
          );
        } else {
          return (
            <div key={index} className="border-b border-gray-200 py-2 flex justify-center items-center mx-2">
              {game[key] !== undefined ? game[key] : "N/A"} {/* Render cell dynamically */}
            </div>
          );
        }
      })}
    </>
  );
  return <>
    <List onDelete={onDelete} onUpdate={onUpdate} headers={headers} data={data?.items!!} renderRow={renderRow} headersCount={7} />
    <div className="mx-auto w-max mt-4">
      {(data && data?.items.length >= 1) && (
        <Pagination
          count={data.pagination.count}
          perPage={params.perPage || 10}
          page={params.page || 1}
          setPage={setPage}
        />
      )}
    </div>
  </>
};

export default GamesList;