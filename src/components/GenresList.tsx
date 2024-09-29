import List from "./common/List";
import useApi from "../hooks/useApi";
import Pagination from "./common/Pagination";
import { IGetGenresResponse } from "../responses/get-genres.response";

const GenresList = () => {
  const { data, error, isLoading, setPage, params } = useApi<IGetGenresResponse, Error>('/v1/genres/paginate');


  if (isLoading) {
    return <div className="container mx-auto mt-5">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto mt-5 text-red-500">
        Error loading genres
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
    "User ID"
  ];

  const renderRow = (genre: any) => (
    <>
      {headers.map((header, index) => {
        const key = header.toLowerCase().replace(" ", "_"); // Create a key from the header
        return (
          <div key={index} className="border-b border-gray-200 py-2 flex justify-center items-center mx-2">
            {genre[key] !== undefined ? genre[key] : "N/A"} {/* Render cell dynamically */}
          </div>
        );
      })}

    </>
  );

  return <>
    <List onDelete={onDelete} onUpdate={onUpdate} headers={headers} data={data?.items!!} renderRow={renderRow} headersCount={3} />
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

export default GenresList;