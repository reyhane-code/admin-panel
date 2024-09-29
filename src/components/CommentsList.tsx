import List from "./common/List";
import useApi from "../hooks/useApi";
import Pagination from "./common/Pagination";
import ExpandableText from "./ExpandableText";
import IGetCommentsResponse from "../responses/get-comments.response";

const CommentsList = () => {
  const { data, error, isLoading, setPage, params } = useApi<IGetCommentsResponse, Error>('/v1/comments');


  if (isLoading) {
    return <div className="container mx-auto mt-5">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto mt-5 text-red-500">
        Error loading comments
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
    "Content",
    "User ID",
    "Article ID",
    "Game ID",
    "Entity Type",
    "Confirmed",
  ];

  const renderRow = (comment: any) => (
    <>
      {headers.map((header, index) => {
        const key = header.toLowerCase().replace(" ", "_"); // Create a key from the header
        if (key == 'confirmed') {
          return <div className="border-b border-gray-200 py-2 flex justify-center items-center mx-2">{comment[key] ? 'Yes' : 'No'}</div>
        }
        else if (key == 'content') {
          return (
            <div key={index} className="border-b border-gray-200 py-2 flex justify-center items-center mx-2">
              <ExpandableText>
                {comment[key]}
              </ExpandableText>
            </div>
          );
        }
        else {
          return (
            <div key={index} className="border-b border-gray-200 py-2 flex justify-center items-center mx-2">
              {comment[key] !== undefined ? comment[key] : "N/A"} {/* Render cell dynamically */}
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

export default CommentsList;