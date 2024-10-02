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
        Error loading games
      </div>
    );
  }
  const onDelete = async (id: number) => {
    console.log('deleting')
  }

  const onUpdate = async () => {
    console.log('deleting')
  }

  const onCreate = async () => { }

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
            <td key={index}>
              <ExpandableText>{game[key]}</ExpandableText>
            </td>
          );
        }
        else if (key === 'background_image') {
          return (
            <td key={index}>
              <Image query={{ hashKey: game[key], format: ImageFormat.WEBP }} />
            </td>
          );
        } else {
          return (
            <td key={index}>
              {game[key] !== undefined ? game[key] : "N/A"} {/* Render cell dynamically */}
            </td>
          );
        }
      })}
    </>
  );
  return <>
    <List onCreate={onCreate} onDelete={onDelete} onUpdate={onUpdate} headers={headers} data={data?.items!!} renderRow={renderRow} />
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