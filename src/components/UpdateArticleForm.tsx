import { useArticle } from "../hooks/useArticle"
import ArticleForm from "./ArticleForm"
import { HttpRequest } from "../helpers/http-request-class.helper"


interface IProps {
    id: string
}
const UpdateArticleForm = ({ id }: IProps) => {

    const { data, isLoading, error } = useArticle(id)
    const onSubmit = async (updataData: any) => {
        const res = await HttpRequest.put(`/v1/articles/${id}`, updataData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!res) {
            throw new Error('can not update!')
        }
        if (res.status == 200) {
            return res.data
        }

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
        <ArticleForm onSubmit={onSubmit} initialContent={data?.content} initialTitle={data?.title} initialImage={data?.image} />
    </div>


}



export default UpdateArticleForm