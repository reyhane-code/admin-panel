import List from "./common/List";
import Pagination from "./common/Pagination";
import useApi from "../hooks/useApi";
import { IGetUsersResponse } from "../responses/get-users.response";
const UsersList = () => {
  const { data, error, isLoading, setPage, params } = useApi<IGetUsersResponse, Error>('/v1/user');


  if (isLoading) {
    return <div className="container mx-auto mt-5">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto mt-5 text-red-500">
        Error loading users
      </div>
    );
  }
  const onDelete = async (id: number) => {
    console.log('deleting')
  }

  const onUpdate = async () => {
    console.log('updating')
  }


  const headers = [
    "ID",
    "Username",
    "Email",
    "Phone",
    "First Name",
    "Last Name",
    "Role",
    "Active"
  ];

  const onCreate = () => { }


  const renderRow = (user: any) => (
    <>
      {headers.map((header, index) => {
        const key = header.toLowerCase().replace(" ", "_"); // Create a key from the header
        if (key == 'active') {
          return <td>{user[key] ? 'Yes' : 'No'}</td>
        }
        return (
          <td key={index}>
            {user[key] !== undefined ? user[key] : "N/A"} {/* Render cell dynamically */}
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

export default UsersList;