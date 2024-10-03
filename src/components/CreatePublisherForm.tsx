import { useState } from "react"
import PublisherForm from "./PublisherForm"


interface IProps {
    onSubmit: (data: any) => void
}

const CreatePublisherForm = ({ onSubmit }: IProps) => {
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
        <PublisherForm onSubmit={handleSubmit} />
    </div>


}



export default CreatePublisherForm