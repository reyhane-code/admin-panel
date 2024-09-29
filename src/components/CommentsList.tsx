import useComments from "../hooks/useComments";
import CardContainer from "./CardContainer";
import CardSkeleton from "./CardSkeleton";
import CommentItem from "./CommentItem";
import EmptyList from "./common/EmptyList";
import Pagination from "./common/Pagination";

interface Props {
    entityType: string;
    entityId: number;
}

const CommentsList = ({ entityType, entityId }: Props) => {
    const skeletons = Array.from({ length: 6 }, (_, index) => index + 1);
    const { data, error, isLoading } = useComments(entityType, entityId)
    { isLoading && <span>Loading...</span> }
    { error && <span>An error occurred: {error.message}</span> }

    const renderSkeletons = () => (
        skeletons.map((skeleton) => (
            <CardContainer key={skeleton}>
                <CardSkeleton />
            </CardContainer>
        ))
    );

    const renderComments = () => (

        <ul className="flex ">
            <li>
                {data?.items.map(comment => {
                    const commentLikeCount = data.likes?.find(item => item.comment_id === comment.id)?.count
                    return <CommentItem comment={comment} likes={commentLikeCount}/>
                })}
            </li>
        </ul>
    );

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-6 p-10px">
                {isLoading ? renderSkeletons() :
                    data?.items?.length ?
                        renderComments() : <EmptyList itemType="comment" />}
            </div>
            <div className="mx-auto w-max mt-4">
                {/* {(data && data?.items.length >= 1) && (
              <Pagination
                count={data.pagination.count}
                perPage={perPage}
                page={page}
                setPage={setPage}
              />
            )} */}
            </div>
        </>
    );
}


export default CommentsList