import { Link } from "react-router-dom";
import Image from "./common/Image";
import { FaEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { ImageFormat } from "../enums";
import Article from "../entities/Article";

interface Props {
  article: Article;
  likes?: number;
}

const ArticleCard = ({ article, likes }: Props) => {
  return (
    <Link
      to={`/articles/${article.id}`}
      className="group card w-full bg-base-300 cursor-pointer"
    >

      <Image
        query={{ hashKey: article.image, format: ImageFormat.WEBP, }}
        altText={article.title}
        className="transform group-hover:scale-[1.05] transition-all duration-300 ease-in bg-cover"
      />

      <div className="card-body !p-3">
        <div className="h-full flex flex-col justify-between w-full">
          <h2 className="card-title text-base lg:text-lg">{article.title}</h2>
          <div className="flex items-center space-x-3 self-end">
            <div className="flex items-center space-x-1">
              <span className="text-sm">{article.view}</span>
              <FaEye className="text-md" />
            </div>
            <div className="flex items-center space-x-1">
              {likes !== undefined && (
                <>
                  <span className="text-sm">{likes}</span>
                  <FaHeart className="text-md" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
