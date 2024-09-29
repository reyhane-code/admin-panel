import List from "./common/List";
import Image from "./common/Image";
import { ImageFormat } from "../enums";
import { IGetArticlesResponse } from "../responses/get-articles.response";
import useApi from "../hooks/useApi";
import Pagination from "./common/Pagination";
import ExpandableText from "./ExpandableText";
import { HttpRequest } from "../helpers/http-request-class.helper";

const ArticlesList = () => {
  const { data, error, isLoading, setPage, params } = useApi<IGetArticlesResponse, Error>('/v1/articles/all');


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
  const onDelete = async (id: number) => {
    try {
      const res = await HttpRequest.delete(`/v1/articles/${id}`)
      if (res.status !== 200) {
        throw new Error('something went wrong when deleting')
      }

    } catch (error) {
      throw new Error('something went wrong')

    }
  }

  const onUpdate = async () => {
    console.log('deleting')
  }


  const headers = [
    "ID",
    "Title",
    "Content",
    "User ID",
    "Image",
    "View",
  ];

  const renderRow = (article: any) => (
    <>
      {headers.map((header, index) => {
        const key = header.toLowerCase().replace(" ", "_"); // Create a key from the header
        if (key == 'content') {
          return (
            <div key={index} className="border-b border-gray-200 py-2 flex justify-center items-center mx-2">
              <ExpandableText>
                {article[key]}
              </ExpandableText>
            </div>
          );
        }
        else if (key === 'image') {
          return (
            <div key={index} className="border-b border-gray-200 py-4 flex justify-center items-center mx-2">
              <Image query={{ hashKey: article[key], format: ImageFormat.WEBP }} />
            </div>
          );
        } else {
          return (
            <div key={index} className="border-b border-gray-200 py-2 flex justify-center items-center mx-2">
              {article[key] !== undefined ? article[key] : "N/A"} {/* Render cell dynamically */}
            </div>
          );
        }
      })}

    </>
  );

  return <>
    <List onDelete={onDelete} onUpdate={onUpdate} headers={headers} data={data?.items!!} renderRow={renderRow} headersCount={6} />
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