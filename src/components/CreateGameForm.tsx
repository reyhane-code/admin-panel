import { useState } from "react"
import { HttpRequest } from "../helpers/http-request-class.helper"
import GameForm from "./GameFrom"

interface IProps {
    onSubmit: (item: any) => void
}

const CreateGameForm = ({ onSubmit }: IProps) => {

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async (data: any) => {
        setIsLoading(true)
        onSubmit(data)
        setIsLoading(false)
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
        <GameForm onSubmit={handleSubmit} updating={false} />
    </div>


}



export default CreateGameForm