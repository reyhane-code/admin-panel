import ArticleForm from "./ArticleForm"
import { HttpRequest } from "../helpers/http-request-class.helper"
import { useState } from "react"



const CreateArticleForm = () => {
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const onSubmit = async (data: any) => {
        setIsLoading(true)
        try {

            const res = await HttpRequest.post(`/v1/articles`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!res) {
                setError('can not create!')
            }
            if (res.status == 200) {
                return res.data
            }
        } catch (error) {
            setError('create process went wrong!')
        } finally {
            setIsLoading(false)
        }

    }
    if (isLoading) {
        return <div className="container mx-auto mt-5">Loading...</div>;
    }

    if (error) {
        return (
            <div className="container mx-auto mt-5 text-red-500">
                {error}
            </div>
        );
    }
    return <div>
        <ArticleForm onSubmit={onSubmit} />
    </div>


}



export default CreateArticleForm