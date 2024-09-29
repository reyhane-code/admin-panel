import useApi from "../hooks/useApi";
import { IGetArticlesResponse } from "../responses/get-articles.response";
import ArticleGrid from "./ArticleGrid";
import EmptyList from "./common/EmptyList";

const ArticlesContainer = () => {
    const { data, error, isLoading, params, setPage } = useApi<IGetArticlesResponse, Error>('/v1/articles/paginate');


    return (
        <>
            {isLoading && <span>Loading...</span>}
            {error && <span>An error occurred: {error.message}</span>}
            {data ? (
                <ArticleGrid data={data} error={error} isLoading={isLoading} page={params.page || 1} setPage={setPage} perPage={params.perPage || 10} />
            ) : (
                <EmptyList itemType="articles" />

            )}
        </>
    );
};

export default ArticlesContainer;
