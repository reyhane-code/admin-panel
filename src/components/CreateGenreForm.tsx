import { useState } from "react"
import GenreFrom from "./GenreForm"


interface IProps {
    onSubmit: (data: any) => void
}

const CreateGenreForm = ({ onSubmit }: IProps) => {
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
        <GenreFrom onSubmit={handleSubmit} />
    </div>


}



export default CreateGenreForm