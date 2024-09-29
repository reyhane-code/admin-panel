import { useParams } from "react-router-dom";
import ExpandableText from "../components/ExpandableText";
import LikeButton from "../components/common/LikeButton";
import { useArticle } from "../hooks/useArticle";
import Image from "../components/common/Image";
import { ImageFormat } from "../enums";
import BookmarkButton from "../components/common/BookmarkButton";

const ArticleDetailPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useArticle(id!);

  if (isLoading)
    return <span className="loading loading-ring loading-lg"></span>;

  if (error || !data) throw error;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="col-start">
        {data.article.image && (
          <Image
            query={{ hashKey: data?.article.image, format: ImageFormat.WEBP }}
            altText={data.article.title}
            className="transform group-hover:scale-[1.05] transition-all duration-300 ease-in bg-cover"
          />
        )}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl">{data?.article.title}</h1>
          <LikeButton
            id={data?.article.id}
            entity="article"
            initialLikes={data?.likes}
          ></LikeButton>
          <BookmarkButton id={data.article.id} entity="article" />
        </div>

        <ExpandableText>{data?.article.content}</ExpandableText>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
