import List from "./common/List";
import useApi from "../hooks/useApi";
import Pagination from "./common/Pagination";
import { HttpRequest } from "../helpers/http-request-class.helper";
import { useState } from "react";
import Modal from "./common/Modal";
import { IGetGenresResponse } from "../responses/get-genres.response";
import UpdateGenreForm from "./UpdateGenreForm";
import CreateGenreForm from "./CreateGenreForm";
import Genre from "../entities/Genre";

const GenresList = () => {
  const { data, error, isLoading, setPage, params } = useApi<IGetGenresResponse, Error>('/v1/genres/paginate');

  const [item, setItem] = useState<Genre | null>()
  const [action, setAction] = useState<'Update' | 'Delete' | 'Create' | ''>('')

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

  const handleDelete = async () => {
    try {
      const res = await HttpRequest.delete(`/v1/genres/${item?.id}`)
      if (res.status !== 200) {
        throw new Error('something went wrong when deleting')
      }

    } catch (error) {
      throw new Error('something went wrong')

    }
    setAction('')
  }
  const onDelete = async (item: Genre) => {
    setItem(item)
    setAction('Delete')
  }

  const onUpdate = async (item: Genre) => {
    setItem(item)
    setAction('Update')
  }

  const handleUpdate = async (updateData: any) => {
    const res = await HttpRequest.put(`/v1/genres/${item?.id}`, updateData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!res) {
      throw new Error('can not update!')
    }
    if (res.status == 200) {
      setAction('')
      return res.data
    } else {
      return <p className="text-red-500 text-lg">Something went wrong!</p>
    }
  }

  const onCreate = async () => {
    setAction('Create')
  }

  const handleCreate = async (data: any) => {
    try {

      const res = await HttpRequest.post(`/v1/genres`, data, {
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

  const closeModal = () => {
    setAction('')
  };


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
          <td key={index}>
            {genre[key] !== undefined ? genre[key] : "N/A"} {/* Render cell dynamically */}
          </td>
        );
      })}

    </>
  );

  return <>
    <Modal
      isOpen={action == 'Create' || action == 'Update'}
      onClose={closeModal}
      title={`${action} Genre`}
      id="genre-modal"
    >
      {action == 'Update' && <UpdateGenreForm onSubmit={handleUpdate} genre={item!} />}
      {action == 'Create' && <CreateGenreForm onSubmit={handleCreate} />}
    </Modal>

    <Modal
      isOpen={action == 'Delete'}
      onClose={closeModal}
      title={`${action} Genre`}
      message="Are you sure you want to delete?"
      id="genre-delete-modal"
    >
      <div className="flex space-x-5 border-b border-gray-200 py-2">
        <button
          className="w-15 bg-green-500 text-white px-2 py-2 rounded-sm text-md shadow-md"
          onClick={() => {
            handleDelete();
          }}
        >
          Yes
        </button>
        <button
          className="w-15 bg-red-500 text-white px-2 py-1 rounded-sm text-md shadow-md"
          onClick={() => closeModal()}
        >
          No
        </button>
      </div>
    </Modal>
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

export default GenresList;