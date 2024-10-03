import List from "./common/List";
import Image from "./common/Image";
import { ImageFormat } from "../enums";
import { IGetArticlesResponse } from "../responses/get-articles.response";
import useApi from "../hooks/useApi";
import Pagination from "./common/Pagination";
import ExpandableText from "./ExpandableText";
import { HttpRequest } from "../helpers/http-request-class.helper";
import UpdateArticleForm from "./UpdateArticleForm";
import { useState } from "react";
import CreateArticleForm from "./CreateArticleForm";
import Modal from "./common/Modal";

const ArticlesList = () => {
  const { data, error, isLoading, setPage, params } = useApi<IGetArticlesResponse, Error>('/v1/articles/all');
  const [id, setId] = useState('')
  const [action, setAction] = useState<'Update' | 'Delete' | 'Create' | ''>('')

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

  const handleDelete = async (id: string) => {
    try {
      const res = await HttpRequest.delete(`/v1/articles/${id}`)
      if (res.status !== 200) {
        throw new Error('something went wrong when deleting')
      }

    } catch (error) {
      throw new Error('something went wrong')

    }
  }
  const onDelete = async (id: string) => {
    setId(id)
    setAction('Delete')
  }

  const onUpdate = async (id: string) => {
    setId(id)
    setAction('Update')
  }

  const onCreate = async () => {
    setAction('Create')
  }

  const closeModal = () => {
    setAction('')
  };



  const headers = [
    "Image",
    "ID",
    "Title",
    "Content",
    "User ID",
    "View",
  ];

  const renderRow = (article: any) => (
    <>
      {headers.map((header, index) => {
        const key = header.toLowerCase().replace(" ", "_"); // Create a key from the header
        if (key == 'content') {
          return (
            <td key={index}>
              <ExpandableText>
                {article[key]}
              </ExpandableText>
            </td>
          );
        }
        else if (key === 'image') {
          return (
            <td key={index}>
              <Image query={{ hashKey: article[key], format: ImageFormat.WEBP }} className="w-20 h-20" />
            </td>
          );
        } else {
          return (
            <td key={index}>
              {article[key] !== undefined ? article[key] : "N/A"} {/* Render cell dynamically */}
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
      title={`${action} Article`}
      id="article-modal"
    >
      {action == 'Update' && <UpdateArticleForm id={id} />}
      {action == 'Create' && <CreateArticleForm />}
    </Modal>

    <Modal
      isOpen={action == 'Delete'}
      onClose={closeModal}
      title={`${action} Article`}
      message="Are you sure you want to delete?"
      id="article-delete-modal"
    >
      <div className="flex space-x-5 border-b border-gray-200 py-2">
        <button
          className="w-15 bg-green-500 text-white px-2 py-2 rounded-sm text-md shadow-md"
          onClick={() => {
            handleDelete(id);
            setAction('')
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

export default ArticlesList;