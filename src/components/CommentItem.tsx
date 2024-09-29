import Comment from "../entities/Comment";
import LikeButton from "./common/LikeButton";

interface Props {
  comment: Comment;
  likes?: number;

}
const CommentItem = ({ comment, likes }: Props) => {
  return (
    <div className="w-full flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <span className="text-base lg:text-lg font-medium">
          {comment.user.username ??
            `${comment.user.first_name} ${comment.user.last_name}`}
        </span>
      </div>

      <p className="text-sm">{comment.content}</p>
      <div className="flex justify-end w-full">
        <LikeButton
          id={comment.id}
          entity="comment"
          initialLikes={likes}
        ></LikeButton>
        {/* replay icon */}
      </div>
    </div>
  );
};

export default CommentItem;
