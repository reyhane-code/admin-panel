import ArticleForm from "./ArticleForm"
import { useState } from "react"


interface IProps {
    onSubmit: (data: any) => void
}

const CreateArticleForm = ({ onSubmit }: IProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async (data: any) => {
        setIsLoading(true)
        onSubmit(data)
        setIsLoading(false)

    }
    if (isLoading) {
        return <div className="container mx-auto mt-5">Loading...</div>;
    }

    return <div>
        <ArticleForm onSubmit={handleSubmit} updating={false} />
    </div>


}



export default CreateArticleForm