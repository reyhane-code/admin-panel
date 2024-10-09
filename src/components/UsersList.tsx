import List from "./common/List";
import Pagination from "./common/Pagination";
import useApi from "../hooks/useApi";
import { IGetUsersResponse } from "../responses/get-users.response";
import { HttpRequest } from "../helpers/http-request-class.helper";
import User from "../entities/User";
import { useState } from "react";
import Modal from "./common/Modal";
import UpdateUserForm from "./UpdateUserForm";
import CreateUserForm from "./CreateUserForm";
const UsersList = () => {
  const { data, error, isLoading, setPage, params } = useApi<IGetUsersResponse, Error>('/v1/user');
  const [item, setItem] = useState<User | null>()
  const [action, setAction] = useState<'Update' | 'Delete' | 'Create' | ''>('')


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

  const onCreate = async () => {
    setAction('Create')
  }

  const handleCreate = async (data: any) => {
    try {

      const res = await HttpRequest.post(`/v1/user`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!res) {

      }
      if (res.status == 201) {
        setAction('')
      }
    } catch (error) {
      return <p className="text-red-500 text-lg">Can not create</p>
    }
  }


  const onUpdate = async (item: User) => {
    setItem(item)
    setAction('Update')
  }

  const handleUpdate = async (data: any) => {
    try {
      const res = await HttpRequest.put(`/v1/user/admin/${item?.id}`, data)
      if (res.status == 200) {
        setAction('')
      }
      if (!res) {
        throw new Error('can not update!')
      }
    } catch (error) {
      throw new Error('something went wrong!')
    }

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
  const closeModal = () => {
    setAction('')
  };
  return <>
    <Modal
      isOpen={action == 'Create' || action == 'Update'}
      onClose={closeModal}
      title={`${action} Game`}
      id="game-modal"
    >
      {action == 'Update' && <UpdateUserForm onSubmit={handleUpdate} user={item!} />}
      {action == 'Create' && <CreateUserForm onSubmit={handleCreate} />}
    </Modal>
    <List
      onUpdate={onUpdate}
      onCreate={onCreate} headers={headers} data={data?.items!!} renderRow={renderRow}
      disableDelete={true} />
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