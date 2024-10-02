import List from "./common/List";
import useApi from "../hooks/useApi";
import Pagination from "./common/Pagination";
import { IGetPublishersResponse } from "../responses/get-publisher.response";

const PublishersList = () => {
  const { data, error, isLoading, setPage, params } = useApi<IGetPublishersResponse, Error>('/v1/publishers/paginate');


  if (isLoading) {
    return <div className="container mx-auto mt-5">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto mt-5 text-red-500">
        Error loading publishers
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

  const renderRow = (publisher: any) => (
    <>
      {headers.map((header, index) => {
        const key = header.toLowerCase().replace(" ", "_"); // Create a key from the header
        return (
          <td key={index}>
            {publisher[key] !== undefined ? publisher[key] : "N/A"} {/* Render cell dynamically */}
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

export default PublishersList;