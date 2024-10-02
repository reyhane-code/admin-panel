import List from "./common/List";
import useApi from "../hooks/useApi";
import Pagination from "./common/Pagination";
import { IGetPlatformsResponse } from "../responses/get-platforms.response";

const PlatformsList = () => {
  const { data, error, isLoading, setPage, params } = useApi<IGetPlatformsResponse, Error>('/v1/platforms/paginate');


  if (isLoading) {
    return <div className="container mx-auto mt-5">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto mt-5 text-red-500">
        Error loading platforms
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
    "User ID"
  ];

  const renderRow = (platform: any) => (
    <>
      {headers.map((header, index) => {
        const key = header.toLowerCase().replace(" ", "_"); // Create a key from the header
        return (
          <td key={index}>
            {platform[key] !== undefined ? platform[key] : "N/A"} {/* Render cell dynamically */}
          </td>
        );
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

export default PlatformsList;