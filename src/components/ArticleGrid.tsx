import CardSkeleton from "./CardSkeleton";
import CardContainer from "./CardContainer";
import ErrorPage from "../pages/ErrorPage";
import Pagination from "./common/Pagination";
import ArticleCard from "./ArticleCard";
import { IGetArticlesResponse } from "../responses/get-articles.response";
import EmptyList from "./common/EmptyList";

interface Props {
  data: IGetArticlesResponse;
  error: Error | null;
  isLoading: boolean;
  page: number;
  perPage: number;
  setPage: (page: number) => void;
}

const ArticleGrid = ({ data, error, isLoading, page, setPage, perPage }: Props) => {
  const skeletons = Array.from({ length: 6 }, (_, index) => index + 1);



  if (error) {
    return data ? <p className="text-2xl">{"An error occurred."}</p> : <ErrorPage />;
  }

  const renderSkeletons = () => (
    skeletons.map((skeleton) => (
      <CardContainer key={skeleton}>
        <CardSkeleton />
      </CardContainer>
    ))
  );

  const renderArticleCards = () => (
    data?.items.map((article) => {
      const articleLikeCount = data?.likes?.find(item => item.article_id === article.id)?.count || 0;
      return (
        <CardContainer key={article.id}>
          <ArticleCard article={article} likes={articleLikeCount} />
        </CardContainer>
      );
    })
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-6 p-10px">
        {isLoading ? renderSkeletons() :
          data.items.length ?
            renderArticleCards() :
            <EmptyList itemType="articles" />
        }
      </div>
      <div className="mx-auto w-max mt-4">
        {(data && data?.items.length >= 1) && (
          <Pagination
            count={data.pagination.count}
            perPage={perPage}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
};

export default ArticleGrid;
