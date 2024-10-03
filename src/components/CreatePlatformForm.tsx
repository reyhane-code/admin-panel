import ArticleForm from "./ArticleForm"
import { useState } from "react"
import PlatformFrom from "./PlatformForm"


interface IProps {
    onSubmit: (data: any) => void
}

const CreatePlatformForm = ({ onSubmit }: IProps) => {
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
        <PlatformFrom onSubmit={handleSubmit} />
    </div>


}



export default CreatePlatformForm