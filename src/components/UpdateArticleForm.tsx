import { useArticle } from "../hooks/useArticle"
import ArticleForm from "./ArticleForm"
import { HttpRequest } from "../helpers/http-request-class.helper"


interface IProps {
    id: string;
    onSubmit: (id: string, data: any) => void
}
const UpdateArticleForm = ({ id, onSubmit }: IProps) => {

    const { data, isLoading, error } = useArticle(id)
    const handleSubmit = async (updateData: any) => {
        onSubmit(id, updateData)
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
            initialImage={data?.image}
            updating={true} />
    </div>


}



export default UpdateArticleForm