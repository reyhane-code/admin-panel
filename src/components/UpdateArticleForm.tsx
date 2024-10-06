import { useArticle } from "../hooks/useArticle"
import ArticleForm from "./ArticleForm"
import Article from "../entities/Article"


interface IProps {
    article: Article;
    onSubmit: (data: any) => void
}
const UpdateArticleForm = ({ article, onSubmit }: IProps) => {

    const { data, isLoading, error } = useArticle(article.id)
    const handleSubmit = async (updateData: any) => {
        onSubmit(updateData)
    }
    if (isLoading) {
        return <div className="container mx-auto mt-5">Loading...</div>;
    }

    if (error) {
        return (
            <div className="container mx-auto mt-5 text-red-500">
                Error loading article
            </div>
        );
    }
    return <div>
        <ArticleForm onSubmit={handleSubmit} initialContent={data?.content}
            initialTitle={data?.title}
            initialImage={data?.image} />
    </div>


}



export default UpdateArticleForm