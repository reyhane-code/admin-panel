import List from "./common/List";
import Image from "./common/Image";
import { ImageFormat } from "../enums";
import useApi from "../hooks/useApi";
import { IGetGamesResponse } from "../responses/get-games.response";
import Pagination from "./common/Pagination";
import ExpandableText from "./ExpandableText";
import { useState } from "react";
import { HttpRequest } from "../helpers/http-request-class.helper";
import Modal from "./common/Modal";
import UpdateGameForm from "./UpdateGameForm ";
import CreateGameForm from "./CreateGameForm";

const GamesList = () => {
  const { data, error, isLoading, params, setPage } = useApi<IGetGamesResponse, Error>('/v1/games/all');
  const [id, setId] = useState('')
  const [action, setAction] = useState<'Update' | 'Delete' | 'Create' | ''>('')


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
  const handleDelete = async (id: string) => {
    try {
      const res = await HttpRequest.delete(`/v1/games/${id}`)
      if (res.status !== 200) {
        throw new Error('something went wrong when deleting')
      }

    } catch (error) {
      throw new Error('something went wrong')

    }
    setAction('')
  }
  const onDelete = async (id: string) => {
    setId(id)
    setAction('Delete')
  }

  const onUpdate = async (id: string) => {
    setAction('Update')
    setId(id)


  }

  const handleUpdate = async (data: any) => {

    const res = await HttpRequest.put(`/v1/games/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!res) {
      throw new Error('can not update!')
    }
    if (res.status == 200) {
      setAction('')
    }

  }

  const onCreate = async () => {
    setAction('Create')
  }

  const handleCreate = async (data: any) => {
    try {

      const res = await HttpRequest.post(`/v1/games`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!res) {
        console.error('can not create')
      }
      if (res.status == 201) {
        setAction('')
        return res.data

      }
    } catch (error) {
      console.error('can not create')
    }
  }

  const closeModal = () => {
    setAction('')
  };


  const headers = [
    "Image",
    "ID",
    "Name",
    "Description",
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
        else if (key === 'image') {
          return (
            <td key={index}>
              <Image query={{ hashKey: game[key], format: ImageFormat.WEBP }} className="w-20 h-20" />
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
    <Modal
      isOpen={action == 'Create' || action == 'Update'}
      onClose={closeModal}
      title={`${action} Game`}
      id="game-modal"
    >
      {action == 'Update' && <UpdateGameForm onSubmit={handleUpdate} id={id} />}
      {action == 'Create' && <CreateGameForm onSubmit={handleCreate} />}
    </Modal>

    <Modal
      isOpen={action == 'Delete'}
      onClose={closeModal}
      title={`${action} Game`}
      message="Are you sure you want to delete?"
      id="game-delete-modal"
    >
      <div className="flex space-x-5 border-b border-gray-200 py-2">
        <button
          className="w-15 bg-green-500 text-white px-2 py-2 rounded-sm text-md shadow-md"
          onClick={() => {
            handleDelete(id);
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
    <List onCreate={onCreate}
      onDelete={onDelete} onUpdate={onUpdate}
      headers={headers}
      data={data?.items!!}
      renderRow={renderRow}
      primaryKey="slug"
    />
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